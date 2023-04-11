#!/bin/bash

# This script is used to run the flyway migrations in docker containers.
# sudo apt install netcat


env_file="$1"

# read content of env file
while IFS='=' read -r key value; do
  export "$key"="$value"
done < "$env_file"

# get user-service db port from env file



wait_for_service() {
  host="$1"
  port="$2"

  while ! nc -z "$host" "$port"; do
    echo "Waiting for $host:$port to become available..."
    sleep 1
  done
}

wait_for_service localhost $USER_SERVICE_DB_PORT
docker-compose --env-file "$env_file" -f docker/docker-compose.flyway.yml run --rm flyway_user-service-db

wait_for_service localhost $EVENT_SERVICE_DB_PORT
docker-compose --env-file "$env_file" -f docker/docker-compose.flyway.yml run --rm flyway_event-service-db

wait_for_service localhost $TICKET_SERVICE_DB_PORT
docker-compose --env-file "$env_file" -f docker/docker-compose.flyway.yml run --rm flyway_ticket-service-db