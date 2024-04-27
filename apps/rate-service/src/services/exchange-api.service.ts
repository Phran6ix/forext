import axios from "axios";
import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GetUSDRatesResult } from "proto/rate/rate";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ExchangeApiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) { }

  private readonly API_KEY = this.configService.get<string>("EXCHANGE_RATE_API_KEY")
  private readonly URL = this.configService.get<string>("BASE_URL")

  public async GetUSDExchangeRates(): Promise<GetUSDRatesResult> {
    try {
      const response = await axios.get(
        `${this.URL}/${this.API_KEY}/latest/USD`, {
        headers: {
        }
      }
      )

      if (response.status == 200) {
        return {
          status: response.status,
          baseCode: response.data.base_code,
          timeLastUpdated: response.data.time_last_update_utc,
          timeNextUpdate: response.data.time_next_update_utc,
          conversionRate: response.data.conversion_rates
        }
      } else {
        throw new RpcException(new HttpException("An Error occured", HttpStatus.BAD_REQUEST))
      }

    } catch (error) {
      console.error("EE", error)
      throw error
    }
  }
}
