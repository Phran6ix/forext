
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserSignUpDTO } from "./auth.validation";
import { GrpcMethod } from "@nestjs/microservices";
import { AUTH_SERVICE_NAME } from "proto/auth/auth";
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { UserSignInDTO } from "@forext/shared/dto";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @GrpcMethod(AUTH_SERVICE_NAME, "signUp")
  async UserSignUp(data: UserSignUpDTO, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    return await this.authService.SignUp(data)
  }

  @GrpcMethod(AUTH_SERVICE_NAME, "signIn")
  async UserSignIn(data: UserSignInDTO, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    return await this.authService.SignIn(data)
  }
}
