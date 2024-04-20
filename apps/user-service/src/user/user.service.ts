import { CreateUserDTO } from "@forext/shared/dto";
import { Helper } from "@forext/shared/utils";
import { User } from "@forext/shared/entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GrpcMethod } from "@nestjs/microservices";
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { CreateUserPayload, GetUserByEmailPayload, GetUserByIdPayload } from "../interface/user.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  @GrpcMethod("UserService", "CreateUser")
  async CreateUser(data: CreateUserPayload, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<void> {
    const userExist = await this.userRepository.exists({
      where: [{
        email: data.email,
      }, { username: data.username }]
    })

    if (userExist) {
      throw new HttpException("User with credentials already exists", HttpStatus.CONFLICT)
    }

    console.log("TTHE")
    const hashedPassword = await Helper.HashString(data.password)
    const user = new User()
    user.username = data.username
    user.firstname = data.firstname
    user.lastname = data.lastname
    user.password = hashedPassword
    user.email = data.email

    this.userRepository.create(user)
    return

  }

  @GrpcMethod("UserService", "GetUserById")
  async GetUserById(data: GetUserByIdPayload, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        userId: data.userId
      }
    })
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }

    return user
  }

  @GrpcMethod("UserService", "GetUserByEmail")
  async GetUserByEmail(data: GetUserByEmailPayload, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email
      }
    })
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }

    return user

  }
}
