import { Injectable } from "@nestjs/common";
import { ExchangeApiService } from "../services/exchange-api.service";

@Injectable()
export class RateService {
  constructor(
    private exchange: ExchangeApiService
  ) { }

  async GetUSDExchangeRates() {
    console.log("service")
    const exchange = await this.exchange.GetUSDExchangeRates()
    console.log("AD", exchange)
    return exchange
  }
}
