import { Module } from '@nestjs/common';
import { ApiGatewayFeatureModule } from '@ticketforge/api-gateway/feature';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    ApiGatewayFeatureModule
  ],
})
export class ApiGatewayCoreModule {}
