import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserSignUpDTO } from "./auth.validation";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post("/sign-up")
  @HttpCode(HttpStatus.CREATED)
  async UserSignUp(@Body() body: UserSignUpDTO) {
    const data = await this.authService.UserSignUp(body)
    return { message: "User has been created successfully", data }
  }
}
