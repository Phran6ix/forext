import { Module } from "@nestjs/common";
import { RateService } from "./rate.service";
import { RateController } from "./rate.controller";
import { ExchangeApiModule } from "../services/exchange-api.module";
import { ExchangeApiService } from "../services/exchange-api.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [ExchangeApiModule, HttpModule],
  providers: [RateService, ExchangeApiService, ConfigService],
  controllers: [RateController,]
})
export class RateModule { }
