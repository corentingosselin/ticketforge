import { Options } from "@mikro-orm/core";
import { TicketEntity } from "@ticketforge/ticket-service/data-access";

export default {
    type: "mysql" as const,
    host: process.env.MYSQL_HOST,
    port: Number.parseInt(process.env.TICKET_SERVICE_DB_PORT),
    dbName: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    entities: [TicketEntity],
    migrations: {
      path: "apps/ticket-service/migrations",
    },
  } as Options;