import { Controller } from "@nestjs/common"
import { WalletService } from "./wallet.service"
import { WalletServiceControllerMethods } from "proto/wallet/wallet"
import { CreateWalletDTO, GetUserWalletDTO, UpdateWalletDTO } from "@forext/shared/dto"

@Controller()
@WalletServiceControllerMethods()
export class WalletController {
  constructor(
    private walletService: WalletService
  ) { }

  async CreateWallet(data: CreateWalletDTO) {
    console.log("Wallet cre ca")
    const response = await this.walletService.createWallet(data)

    return { message: "Wallet has been created", data: response }
  }

  async DebitWalletBalance(data: UpdateWalletDTO) {
    const response = await this.walletService.debitwalletBalance(data)
    return { message: "Walet has been debited", data: response }
  }

  async CreditWalletBalance(data: UpdateWalletDTO) {
    const response = await this.walletService.createWallet(data)
    return { message: "Wallet has been credited", data: response }
  }

  async GetUserWalletBalance(data: GetUserWalletDTO) {
    const response = await this.walletService.getUserWalletBalance(data)
    return { message: "Wallet has been fetched", data: response }
  }
}
