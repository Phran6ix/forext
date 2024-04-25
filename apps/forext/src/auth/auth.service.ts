import { AUTH_PACKAGE_NAME, AuthServiceController, WalletServiceClient } from "@forext/proto";
import { CreateUserDTO, UserSignInDTO } from "@forext/shared/dto";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc, ClientProviderOptions } from "@nestjs/microservices";
import { AuthServiceClient } from "proto/auth/auth";
import { WALLET_PACKAGE_NAME } from "proto/wallet/wallet";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient
  private walletService: WalletServiceClient

  constructor(
    @Inject(AUTH_PACKAGE_NAME) private authClient: ClientGrpc,
    @Inject(WALLET_PACKAGE_NAME) private walletClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.authService = this.authClient.getService<AuthServiceClient>("AuthService")
    this.walletService = this.walletClient.getService<WalletServiceClient>("WalletService")
  }

  async UserSignUp(data: CreateUserDTO): Promise<unknown> {
    const user = await firstValueFrom(this.authService.signUp(data))
    await firstValueFrom(this.walletService.createWallet({ userId: user.userId }))
    console.log("The user from  gateway", user)
    return user
  }


  async UserSignIn(data: UserSignInDTO): Promise<unknown> {
    console.log("Here")
    const response = await firstValueFrom(this.authService.signIn(data))
    return response
  }
}
