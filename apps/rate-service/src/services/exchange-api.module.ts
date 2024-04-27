import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios"
import { ExchangeApiService } from "./exchange-api.service";
import { ConfigModule } from "@nestjs/config"
import config from "../config/config";
import { ScheduleModule } from "@nestjs/schedule"
import { ForexSeederService } from "./forex-seeder.service";
import { DataAccessForexModule, DataAccessForexService } from "common/src/lib/data-access-forex/src";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Forex } from "@forext/shared/entity";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [config]
    }),
    ScheduleModule.forRoot(),
    DataAccessForexModule,
    TypeOrmModule.forFeature([Forex])
  ],
  providers: [ExchangeApiService, ForexSeederService, DataAccessForexService]
})
export class ExchangeApiModule { }
