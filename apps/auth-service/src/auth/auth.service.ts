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
}
