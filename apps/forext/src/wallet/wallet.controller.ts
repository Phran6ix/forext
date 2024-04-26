import { Patch, Controller, Get, Req, UseGuards, Body, UseFilters, Res } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { AuthGuard } from '@forext/shared/guards'
import { Request, Response } from "express"
import { UpdateWalletDTO } from "@forext/shared/dto";
import { ExceptionHandler } from "@forext/shared/decorator";

@Controller("wallet")
export class WalletController {
  constructor(
    private walletService: WalletService
  ) { }

  @Get("/my-wallet")
  @UseGuards(AuthGuard)
  @UseFilters(new ExceptionHandler())
  async GetUserWallet(@Req() req: Request, @Res() res: Response) {
    try {
      const response = await this.walletService.GetUserWallet(req.user)
      return res.status(200).json({ message: " User wallet has been fetched successfully", data: response })
    } catch (err) {
      return res.status(400).json({ message: err.details, })
    }
  }

  @Patch("/debit-wallet")
  @UseGuards(AuthGuard)
  @UseFilters(new ExceptionHandler())
  async UserDebitWallet(@Req() req: Request, @Body() body: UpdateWalletDTO, @Res() res: Response) {
    try {

      const data = await this.walletService.DebitUserWallet({ userId: req.user, ...body })
      return res.status(200).json({ message: "Wallet has been debited successfully", data })
    } catch (error) {
      console.log(error.statusCode, error)
      return res.status(400).json({ message: error.details })
    }
  }

  @Patch("/credit-wallet")
  @UseGuards(AuthGuard)
  @UseFilters(new ExceptionHandler())
  async UserCreditWallet(@Req() req: Request, @Body() body: UpdateWalletDTO, @Res() res: Response) {
    try {

      const data = await this.walletService.CreditUserWallet({ userId: req.user, ...body })
      return res.status(200).json({ message: "Wallet has been credited successfully", data })
    } catch (error) {
      console.log(error.status, error.code)
      res.status(400).json({ message: error.details })
    }
  }
}
