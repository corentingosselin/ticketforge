import { Options } from "@mikro-orm/core";
import { UserEntity } from "@ticketforge/user-service/data-access";

export default {
    type: "mysql" as const,
    host: process.env.MYSQL_HOST,
    port: Number.parseInt(process.env.USER_SERVICE_DB_PORT),
    dbName: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    entities: [UserEntity],
    migrations: {
      path: "apps/ticket-service/migrations",
    },
  } as Options;