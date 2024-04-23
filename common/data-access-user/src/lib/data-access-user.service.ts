import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@forext/shared/entity"
import { Repository } from "typeorm";

@Injectable()
export class UserDataPoint {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async GetAUserById(userId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        userId
      }
    })
  }

  async GetAUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        email
      }
    })
  }

  async CreateUser(data: Omit<User, "userId" | "createdAt" | "deletedAt">) {
    console.log("Datapoint")

    const user = new User()
    user.firstname = data.firstname
    user.lastname = data.lastname
    user.email = data.email
    user.username = data.username
    user.password = data.password
    console.log(user)
    this.userRepository.save(user)
    return user
  }
}
