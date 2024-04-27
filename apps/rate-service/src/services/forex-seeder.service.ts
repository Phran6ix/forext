import { Injectable } from "@nestjs/common";
import { ExchangeApiService } from "./exchange-api.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DataAccessForexService } from "@forext/data-access-forex"
import { Forex } from "@forext/shared/entity";

@Injectable()
export class ForexSeederService {
  constructor(
    private exchangeService: ExchangeApiService,
    private forexDataAccess: DataAccessForexService
  ) {
    console.log("Sbmso")
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  // @Cron(CronExpression.EVERY_10_SECONDS)
  async seedForex() {
    const { conversionRate } = await this.exchangeService.GetUSDExchangeRates()
    let assets = []
    for (let [asset, price] of Object.entries(conversionRate)) {
      const insertAsset: Partial<Forex> = {
        name: asset,
        price,
        priceFetchedAt: new Date()
      }
      assets.push(insertAsset)
    }
    await this.forexDataAccess.InsertMultipleForexAsset(assets)
  }
}
