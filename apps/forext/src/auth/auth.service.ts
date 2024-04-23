import { AUTH_PACKAGE_NAME, AuthServiceController } from "@forext/proto";
import { CreateUserDTO, UserSignInDTO } from "@forext/shared/dto";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { AUTH_SERVICE_NAME, AuthServiceClient } from "proto/auth/auth";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient

  constructor(
    @Inject(AUTH_PACKAGE_NAME) private authClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.authService = this.authClient.getService<AuthServiceClient>("AuthService")
  }

  async UserSignUp(data: CreateUserDTO): Promise<unknown> {
    console.log("KKSJJJSKK")
    console.log("niv", this.authClient)
    console.log("niv", this.authService)

    const user = await firstValueFrom(this.authService.signUp(data))
    console.log("The user", user)
    return user
  }


  async UserSignIn(data: UserSignInDTO): Promise<unknown> {
    console.log("Here")
    const response = await firstValueFrom( this.authService.signIn(data) )
    return response
  }
}
