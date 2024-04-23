import { Module } from "@nestjs/common";
import { HealthModule } from "./health_check/health_check.module";
import { GatewayAuthModule } from "./auth/auth.module";

@Module({
  imports: [HealthModule, GatewayAuthModule]
})
export class GateWayModule { }
