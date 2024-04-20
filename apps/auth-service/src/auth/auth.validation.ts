
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserSignUpDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  firstname: string

  @IsNotEmpty()
  lastname: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  username: string
}
