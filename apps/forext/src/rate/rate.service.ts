import { RATE_PACKAGE_NAME, RATE_SERVICE_NAME, RateServiceClient } from "@forext/proto";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class RateGatewayService implements OnModuleInit {
  private rateService: RateServiceClient;
  constructor(
    @Inject(RATE_PACKAGE_NAME) private rateClient: ClientGrpc
  ) { }
  onModuleInit() {
    this.rateService = this.rateClient.getService<RateServiceClient>(RATE_SERVICE_NAME)
  }

  async GetUSDExchangeRates() {
    console.log("jere")
    const response = await firstValueFrom(this.rateService.getUsdRates({}))
    console.log("REsP", response)
    return response
  }
}
