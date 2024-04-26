import { AuthGuard } from "@forext/shared/guards";
import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { Response } from "express"
import { RateGatewayService } from "./rate.service";

@Controller("rate")
export class RateGatewayController {
  constructor(
    private rateService: RateGatewayService
  ) { }

  @Get("/usd-rates")
  @UseGuards(AuthGuard)
  async GetUSDRates(@Res() res: Response) {
    try {
      console.log("In")
      const data = await this.rateService.GetUSDExchangeRates()
      return res.status(200).json({ message: "USD exchange rates fetched successfully", data })
    } catch (error) {
      return res.status(400).json({ message: error.detail })
    }
  }
}
