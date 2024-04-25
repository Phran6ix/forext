import { Response } from "express"
import { HttpStatus, Res, UseFilters } from "@nestjs/common";
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { CreateUserDTO, UserSignInDTO } from "@forext/shared/dto"
import { AuthService } from "./auth.service";
import { ExceptionHandler } from "@forext/shared/decorator"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get("/health")
  AuthHealth() {
    return { message: "Authentication gateway up and running" }
  }

  // @UseFilters(new ExceptionHandler())
  @Post("/sign-up")
  async UserSignUp(@Body() body: CreateUserDTO, @Res() res: Response) {
    try {
      const data = await this.authService.UserSignUp(body)
      return res.status(201).json({ message: "User created successfully", data })
    } catch (error) {
      return res.status(400).json({ message: error.details })
    }
  }

  // @UseFilters(new ExceptionHandler())
  @Post("/sign-in")
  async UserSign(@Body() body: UserSignInDTO, @Res() res: Response) {
    try {
      const data = await this.authService.UserSignIn(body)
      return res.status(HttpStatus.OK).json({ message: "Sign In successful", data })
    } catch (error) {
      return res.status(400).json({ message: error.details })
    }
  }
}


