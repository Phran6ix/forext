import { HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO, UserSignInDTO } from "@forext/shared/dto"
import { RpcException } from "@nestjs/microservices";
import { UserDataPoint } from '@forext/data-access-user'
import Helper from "../utils/helper";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private userDataPoint: UserDataPoint,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }


  async SignUp(data: CreateUserDTO): Promise<unknown> {
    const userExist = await this.userDataPoint.UserExist({ email: data.email, username: data.username })
    if (userExist) {
      throw new RpcException(new HttpException("User already exist", HttpStatus.CONFLICT))
    }
    data.password = await Helper.hashPassword(data.password)
    const user = await this.userDataPoint.CreateUser(data)
    return user
  }

  async SignIn(data: UserSignInDTO): Promise<unknown> {
    const user = await this.userDataPoint.GetAUserByUsername(data.username)
    if (!user) {
      throw new RpcException(new NotFoundException("User with this username does not exist"))
    }
    const verifiedPassword = await Helper.verifyString(data.password, user.password)
    if (!verifiedPassword) {
      throw new RpcException(new UnauthorizedException("Invalid password"))
    }

    const token = this.jwtService.sign({ id: user.userId })
    return { token, user }
  }

  async ValidateUserToken(data: { token: string }): Promise<unknown> {
    const token = data.token
    const payload = this.jwtService.verify(token, { secret: this.configService.get<string>("JWT_SECRET") })

    if (!payload) {
      throw new RpcException(new HttpException("Invalid or expired token", 401))
    }

    return payload
  }
}
