import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDTO, UserSignInDTO } from "@forext/shared/dto"
import { User } from '@forext/shared/entity'
import { Helper } from "@forext/shared/utils"
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { IUserService } from "@forext/shared/types"
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
@Injectable()
export class AuthService implements OnModuleInit {
  private userService: IUserService

  constructor(@Inject("USER_PACKAGE") private userClient: ClientGrpc) { }

  onModuleInit() {
    this.userService = this.userClient.getService("UserService")
  }

  async UserSignUp(data: CreateUserDTO): Promise<unknown> {

    return this.userService.CreateUser({ ...data })
  }
}
// export class AuthService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//     private jwtService: JwtService,
//     private configService: ConfigService
//   ) { }
//
//   async UserSignUp(payload: CreateUserDTO): Promise<{ user: User }> {
//     const userExist = await this.userRepository.exists({
//       where: { email: payload.email }
//     })
//
//     if (userExist) {
//       throw new HttpException("User with Email already exists", HttpStatus.CONFLICT)
//     }
//
//     const newUser = new User()
//     newUser.email = payload.email
//     newUser.firstname = payload.firstname
//     newUser.lastname = payload.lastname
//     let password = await Helper.HashString(payload.password)
//     newUser.password = password
//     newUser.username = payload.username
//
//     this.userRepository.create(newUser)
//     return { user: newUser }
//   }
//
//   async UserSignIn(payload: UserSignInDTO): Promise<{ user: User, token: string }> {
//     const user = await this.userRepository.findOne({
//       where: {
//         username: payload.username
//       }
//     })
//
//     if (!user) {
//       throw new HttpException("Account with username not found", HttpStatus.NOT_FOUND)
//     }
//
//     const isPasswordCorrect = await Helper.CompareHashedStrings(payload.password, user.password)
//     if (!isPasswordCorrect) {
//       throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST)
//     }
//     console.log("JWT", this.configService.get("JWT_SERVICE"))
//     const token = this.jwtService.sign({ id: user.userId })
//
//     return { user, token }
//   }
//
// }
