import { WalletServiceClient } from "@forext/proto";
import { UpdateWalletDTO } from "@forext/shared/dto";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { WALLET_PACKAGE_NAME, WALLET_SERVICE_NAME } from "proto/wallet/wallet";
import { firstValueFrom } from "rxjs";

@Injectable()
export class WalletService implements OnModuleInit {
  private walletSevice: WalletServiceClient
  constructor(@Inject(WALLET_PACKAGE_NAME) private walletClient: ClientGrpc) { }

  onModuleInit() {
    this.walletSevice = this.walletClient.getService<WalletServiceClient>(WALLET_SERVICE_NAME)
  }

  async GetUserWallet(userId: string): Promise<unknown> {
    return await firstValueFrom(this.walletSevice.getUserWalletBalance({ userId }))
  }

  async DebitUserWallet(data: UpdateWalletDTO): Promise<void> {
    await firstValueFrom(this.walletSevice.debitwalletBalance(data))
  }
  async CreditUserWallet(data: UpdateWalletDTO): Promise<void> {
    await firstValueFrom(this.walletSevice.creditWalletBalance(data))
  }
}
