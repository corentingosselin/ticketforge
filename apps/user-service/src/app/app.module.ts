import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserServiceCoreModule } from '@ticketforge/user-service/core';



@Module({
  imports: [
    UserServiceCoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
