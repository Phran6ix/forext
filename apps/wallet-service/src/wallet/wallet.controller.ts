import { Controller } from "@nestjs/common"
import { WalletService } from "./wallet.service"
import { WALLET_PACKAGE_NAME, WALLET_SERVICE_NAME, WalletServiceControllerMethods } from "proto/wallet/wallet"
import { CreateWalletDTO, GetUserWalletDTO, UpdateWalletDTO } from "@forext/shared/dto"
import { GrpcMethod } from "@nestjs/microservices"
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js"

@Controller("wallet")
export class WalletController {
  constructor(
    private walletService: WalletService
  ) { }

  @GrpcMethod(WALLET_PACKAGE_NAME, "createWallet")
  async createWallet(data: CreateWalletDTO, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log("Wallet cre ca")
    return await this.walletService.createWallet(data)
  }

  @GrpcMethod(WALLET_SERVICE_NAME, "debitwalletBalance")
  async DebitWalletBalance(data: UpdateWalletDTO) {
    return await this.walletService.debitwalletBalance(data)
  }

  @GrpcMethod(WALLET_SERVICE_NAME, "creditWalletBalance")
  async CreditWalletBalance(data: UpdateWalletDTO) {
    return await this.walletService.creditWalletBalance(data)
  }

  @GrpcMethod(WALLET_SERVICE_NAME, "getUserWalletBalance")
  async GetUserWalletBalance(data: GetUserWalletDTO) {
    return await this.walletService.getUserWalletBalance(data)
  }
}
