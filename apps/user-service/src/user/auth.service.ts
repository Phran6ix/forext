import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDTO } from "@forext/shared/dto"
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { User } from '@forext/shared/entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async UserSignUp(payload: CreateUserDTO): Promise<{ user: User }> {
    const userExist = await this.userRepository.exists({
      where: { email: payload.email }
    })

    if (userExist) {
      throw new HttpException("User with Email already exists", HttpStatus.CONFLICT)
    }

    const newUser = new User()
    newUser.email = payload.email
    newUser.firstname = payload.firstname
    newUser.lastname = payload.lastname
    newUser.password = payload.password
    newUser.username = payload.username

    this.userRepository.create(newUser)
    return { user: newUser }
  }

}
