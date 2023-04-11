import { Options } from "@mikro-orm/core";
import { EventEntity } from "@ticketforge/event-service/data-access";

export default {
    type: "mysql" as const,
    host: process.env.MYSQL_HOST,
    port: Number.parseInt(process.env.EVENT_SERVICE_DB_PORT),
    dbName: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    entities: [EventEntity],
    migrations: {
      path: "apps/event-service/migrations",
    },
  } as Options;