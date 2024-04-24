import { HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO, UserSignInDTO } from "@forext/shared/dto"
import { IUserService } from "@forext/shared/types"
import { RpcException } from "@nestjs/microservices";
import { WalletServiceController } from "@forext/proto"
import { firstValueFrom } from "rxjs";
import { UserDataPoint } from '@forext/data-access-user'
import { AUTH_SERVICE_NAME } from "proto/auth/auth";
import Helper from "../utils/helper";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userDataPoint: UserDataPoint,
    private jwtService: JwtService
  ) { }


  async SignUp(data: CreateUserDTO): Promise<unknown> {
    console.log("KKSL")
    // 1: User account is to be created
    // 2: User wallet is to be created
    const userExist = await this.userDataPoint.UserExist({ email: data.email, username: data.username })
    console.log("Exist,", userExist)
    if (userExist) {
      throw new RpcException(new HttpException("User already exist", HttpStatus.CONFLICT))
    }

    data.password = await Helper.hashPassword(data.password)
    const user = await this.userDataPoint.CreateUser(data)

    return user
  }

  async SignIn(data: UserSignInDTO): Promise<unknown> {
    console.log("SIgn in is called")
    const user = await this.userDataPoint.GetAUserByEmail(data.username)
    if (!user) {
      throw new RpcException(new NotFoundException("User with this username does not exist"))
    }
    const verifiedPassword = Helper.verifyString(data.password, user.password)
    if (!verifiedPassword) {
      throw new RpcException(new UnauthorizedException("Invalid password"))
    }

    const token = this.jwtService.sign({ id: user.userId })
    //return token
    return { token, user }
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
