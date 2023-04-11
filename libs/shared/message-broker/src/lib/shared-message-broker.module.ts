import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageBrokerService } from './message-broker.service';


interface MessageBrokerOptions {
  name: string;
}

@Module({
  controllers: [],
  providers: [MessageBrokerService],
  exports: [MessageBrokerService],
})
export class SharedMessageBrokerModule {

  static registerClient({ name }: MessageBrokerOptions): DynamicModule {
    return {
      module: SharedMessageBrokerModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('MESSAGE_BROKER_URI')],
                queue: configService.get<string>(`MESSAGE_BROKER_${name}_QUEUE`),
                durable: true,
                
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }

}
