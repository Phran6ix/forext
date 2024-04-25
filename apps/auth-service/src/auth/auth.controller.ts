
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
    console.log("W")
    return await this.authService.SignUp(data)
    // return { nessage: "User created", data: response }
  }

  @GrpcMethod(AUTH_SERVICE_NAME, "signIn")
  async UserSignIn(data: UserSignInDTO, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log("W")
    const response = await this.authService.SignIn(data)
    return { nessage: "User sign in successfully", data: response }
  }
}
