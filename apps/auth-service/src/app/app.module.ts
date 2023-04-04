import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthServiceCoreModule } from '@ticketforge/auth-service/core';

@Module({
  imports: [
    AuthServiceCoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
