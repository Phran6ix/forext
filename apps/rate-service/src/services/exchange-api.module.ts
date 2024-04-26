import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios"
import { ExchangeApiService } from "./exchange-api.service";
import { ConfigModule } from "@nestjs/config"
import config from "../config/config";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [config]
    })
  ],
  providers: [ExchangeApiService]
})
export class ExchangeApiModule { }
