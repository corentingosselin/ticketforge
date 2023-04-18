import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import {
  EVENT_SERVICE,
  USER_SERVICE,
} from '@ticketforge/shared/api-interfaces';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';
import { TicketEntity } from './entities/ticket.entity';
import { TicketService } from './ticket.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail-service';

@Module({
  controllers: [],
  providers: [TicketService, MailService],
  exports: [TicketService],
  imports: [
    SharedMessageBrokerModule.registerClient({
      name: USER_SERVICE,
    }),
    SharedMessageBrokerModule.registerClient({
      name: EVENT_SERVICE,
    }),
    MikroOrmModule.forFeature([TicketEntity]),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('SMTP_HOST'),
            port: configService.get('SMTP_PORT'),
            secure: false, // can't use configservice with nodemail don't know why here: wrong version number:../deps/openssl/openssl/ssl/record/ssl3_record.c:355:
            ignoreTLS: true, // can't use configservice with nodemail don't know why here
          },
          defaults: {
            from: '"No Reply" <no-reply@ticketforge.com>',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class TicketServiceDataAccessModule {}
