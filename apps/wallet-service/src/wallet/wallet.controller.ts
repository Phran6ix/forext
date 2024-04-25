import { Controller } from "@nestjs/common"
import { WalletService } from "./wallet.service"
import { WALLET_SERVICE_NAME, WalletServiceControllerMethods } from "proto/wallet/wallet"
import { CreateWalletDTO, GetUserWalletDTO, UpdateWalletDTO } from "@forext/shared/dto"
import { GrpcMethod } from "@nestjs/microservices"
import { Metadata ,ServerUnaryCall } from "@grpc/grpc-js"

@Controller("wallet")
export class WalletController {
  constructor(
    private walletService: WalletService
  ) { }

  @GrpcMethod("WalletService", "createWallet")
  async createWallet(data: CreateWalletDTO, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log("Wallet cre ca")
    const response = await this.walletService.createWallet(data)

    return { message: "Wallet has been created", data: response }
  }

  @GrpcMethod(WALLET_SERVICE_NAME, "debitwalletBalance")
  async DebitWalletBalance(data: UpdateWalletDTO) {
    const response = await this.walletService.debitwalletBalance(data)
    return { message: "Walet has been debited", data: response }
  }

  @GrpcMethod(WALLET_SERVICE_NAME, "creditWalletBalance")
  async CreditWalletBalance(data: UpdateWalletDTO) {
    const response = await this.walletService.createWallet(data)
    return { message: "Wallet has been credited", data: response }
  }

  @GrpcMethod(WALLET_SERVICE_NAME, "getUserWalletBalance")
  async GetUserWalletBalance(data: GetUserWalletDTO) {
    const response = await this.walletService.getUserWalletBalance(data)
    return { message: "Wallet has been fetched", data: response }
  }
}
