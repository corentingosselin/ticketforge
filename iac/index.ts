// Copyright 2016-2019, Pulumi Corporation.  All rights reserved.

import * as gcp from "@pulumi/gcp";
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";

const name = "webd-cluster";

const config = new pulumi.Config();
export const masterVersion = config.get("masterVersion") ||
	gcp.container.getEngineVersions().then(it => it.latestMasterVersion);

// Create a GKE cluster
const cluster = new gcp.container.Cluster(name, {
	// We can't create a cluster with no node pool defined, but we want to only use
	// separately managed node pools. So we create the smallest possible default
	// node pool and immediately delete it.
	initialNodeCount: 1,
	removeDefaultNodePool: true,

	minMasterVersion: masterVersion,
});

const nodePool = new gcp.container.NodePool(`primary-node-pool`, {
	cluster: cluster.name,
	initialNodeCount: 2,
	location: cluster.location,
	nodeConfig: {
		preemptible: true,
		machineType: "e2-standard-4",
		diskSizeGb: 50,
		oauthScopes: [
			"https://www.googleapis.com/auth/compute",
			"https://www.googleapis.com/auth/devstorage.read_only",
			"https://www.googleapis.com/auth/logging.write",
			"https://www.googleapis.com/auth/monitoring",
		],
	},
	version: masterVersion,
	management: {
			autoRepair: true,
			autoUpgrade: true
	},
}, {
	dependsOn: [cluster],
});

// Export the Cluster name
export const clusterName = cluster.name;

// Manufacture a GKE-style kubeconfig. Note that this is slightly "different"
// because of the way GKE requires gcloud to be in the picture for cluster
// authentication (rather than using the client cert/key directly).
export const kubeconfig = pulumi.
	all([ cluster.name, cluster.endpoint, cluster.masterAuth ]).
	apply(([ name, endpoint, masterAuth ]) => {
		const context = `${gcp.config.project}_${gcp.config.zone}_${name}`;
		return `apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${masterAuth.clusterCaCertificate}
    server: https://${endpoint}
  name: ${context}
contexts:
- context:
    cluster: ${context}
    user: ${context}
  name: ${context}
current-context: ${context}
kind: Config
preferences: {}
users:
- name: ${context}
user:
  exec:
    apiVersion: client.authentication.k8s.io/v1beta1
    command: gke-gcloud-auth-plugin
    installHint: Install gke-gcloud-auth-plugin for use with kubectl by following
      https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
    provideClusterInfo: true
`;
	});

// Create a Kubernetes provider instance that uses our cluster from above.
const clusterProvider = new k8s.Provider(name, {
	kubeconfig: kubeconfig,
}, {
	dependsOn: [nodePool],
});

const docker_gar = new gcp.artifactregistry.Repository("4WEBD-repo", {
	description: "example docker repository",
	format: "DOCKER",
	location: gcp.config.region,
	repositoryId: "webd-384707",
});

const rabbitmq_disk = new gcp.compute.Disk("rabbitmq-disk", {
	size: 25,
	type: "pd-ssd",
	zone: gcp.config.zone,
});
const rabbitmq_snapdisk = new gcp.compute.Snapshot("rabbitmq-snapdisk", {
	sourceDisk: rabbitmq_disk.name,
	zone: gcp.config.zone,
});
const rabbitmq_regiondisk = new gcp.compute.RegionDisk("rabbitmq-regiondisk", {
	snapshot: rabbitmq_snapdisk.id,
	type: "pd-ssd",
	region: gcp.config.region,
	physicalBlockSizeBytes: 4096,
	replicaZones: [
		"europe-west2-a",
		"europe-west2-b",
	],
});

const mysql_disk = new gcp.compute.Disk("mysql-disk", {
	size: 25,
	type: "pd-ssd",
	zone: gcp.config.zone,
});
const mysql_snapdisk = new gcp.compute.Snapshot("mysql-snapdisk", {
	sourceDisk: mysql_disk.name,
	zone: gcp.config.zone,
});
const mysql_regiondisk = new gcp.compute.RegionDisk("mysql-regiondisk", {
	snapshot: mysql_snapdisk.id,
	type: "pd-ssd",
	region: gcp.config.region,
	physicalBlockSizeBytes: 4096,
	replicaZones: [
		"europe-west2-a",
		"europe-west2-b",
	],
});
