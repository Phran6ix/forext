import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { CreateWalletPayload, CreditWalletBalancePayload, DebitWalletBalancePayload, GetUserWalletBalancePayload, ReturnEmpty, WalletServiceController } from "../../../../proto/wallet/wallet"
import { Observable } from "rxjs";
import { WalletDataPoint } from "@forext/data-access-wallet"

@Injectable()
export class WalletService implements WalletServiceController {
  constructor(
    private walletDataPoint: WalletDataPoint
  ) { }

  async createWallet(request: CreateWalletPayload): Promise<ReturnEmpty> {
    await this.walletDataPoint.CreateANewWallet(request.userId)
    return {}
  }

  async debitwalletBalance(request: DebitWalletBalancePayload): Promise<ReturnEmpty | Observable<ReturnEmpty>> {
    const userWallet = await this.walletDataPoint.GetUserWallet(request.userId)

    if (!userWallet) {
      throw new RpcException(new NotFoundException("User wallet not found"))
    }

    const currentWalletBalance = parseInt(userWallet.amount)

    if (currentWalletBalance <= +userWallet.amount) {
      throw new RpcException(new HttpException("Insufficient funds", HttpStatus.BAD_REQUEST))
    }

    const updatedWalletBalance = currentWalletBalance - parseInt(request.amount)

    // Create order and transaction entry
    await this.walletDataPoint.UpdateAWalletData(userWallet.walletId, { amount: `${updatedWalletBalance}` })
    return {}
  }

  async creditWalletBalance(request: CreditWalletBalancePayload): Promise<ReturnEmpty | Observable<ReturnEmpty>> {
    const userWallet = await this.walletDataPoint.GetUserWallet(request.userId)

    if (!userWallet) {
      throw new RpcException(new NotFoundException("User wallet not found")
      )
    }

    const currentWalletBalance = parseInt(userWallet.amount)
    const updatedWalletBalance = currentWalletBalance + parseInt(request.amount)

    // Create order and transaction entry
    await this.walletDataPoint.UpdateAWalletData(userWallet.walletId, { amount: `${updatedWalletBalance}` })
    return {}
  }

  async getUserWalletBalance(request: GetUserWalletBalancePayload): Promise<ReturnEmpty | Promise<ReturnEmpty> | Observable<ReturnEmpty>> {
    const userWallet = await this.walletDataPoint.GetUserWallet(request.userId)

    console.log(userWallet)
    return {}
  }
}
