import { Module } from "@nestjs/common";
import { HealthModule } from "./health_check/health_check.module";
import { GatewayAuthModule } from "./auth/auth.module";
import { GatewayWalletModule } from "./wallet/wallet.module";
import { RateGatewayModule } from "./rate/rate.module"

@Module({
  imports: [HealthModule, GatewayAuthModule, GatewayWalletModule, RateGatewayModule]
})
export class GateWayModule { }
