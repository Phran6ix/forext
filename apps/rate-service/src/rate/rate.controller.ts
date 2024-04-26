import { Controller } from "@nestjs/common";
import { RateServiceControllerMethods} from "@forext/proto"
import { RateService } from "./rate.service";

@Controller()
@RateServiceControllerMethods()
export class RateController {
  constructor(
    private rateService: RateService
  ){}
  async getUsdRates() {
    console.log("called")
    const res =  await this.rateService.GetUSDExchangeRates()
    console.log("res", res)
    return res
  }
}
