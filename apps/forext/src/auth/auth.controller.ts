import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { CreateUserDTO, UserSignInDTO } from "@forext/shared/dto"
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get("/health")
  AuthHealth() {
    return { message: "Authentication gateway up and running" }
  }

  @Post("/sign-up")
  async UserSignUp(@Body() body: CreateUserDTO) {
    const data = await this.authService.UserSignUp(body)
    return { message: "User created successfully", data }
  }

  @Post("/sign-in")
  async UserSign(@Body() body: UserSignInDTO) {
    const data = await this.authService.UserSignIn(body)
    return { message: "Sign In successful", data }
  }
}


