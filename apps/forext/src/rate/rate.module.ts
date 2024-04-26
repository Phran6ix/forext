import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import rateOption from "../option/rate.option";
import { RateGatewayController } from "./rate.controller";
import { RateGatewayService } from "./rate.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { config } from "@forext/shared/utils";

@Module({
  imports: [
    ClientsModule.register([rateOption]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET")
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      load: [config]
    })

  ],
  controllers: [RateGatewayController],
  providers: [RateGatewayService, ConfigService]
})
export class RateGatewayModule { }
