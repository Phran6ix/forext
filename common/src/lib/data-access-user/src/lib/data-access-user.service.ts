import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@forext/shared/entity"
import { MongoRepository, ObjectId } from "typeorm";

@Injectable()
export class UserDataPoint {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>
  ) { }

  async GetAUserById(userId: string): Promise<User | null> {
    // const _id = new ObjectId(userId)
    return this.userRepository.findOne({
      where: {
        userId
      }
    })
  }

  async GetAUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email
      }
    })
  }

  async UserExist(data: { email?: string, username?: string }): Promise<User | null> {
    console.log(data)
    return this.userRepository.findOne({
      where: {
        $or: [
          { email: data.email },
          { username: data.username }
        ]
      }
    })
  }

  async CreateUser(data: Omit<User, "_id" | "userId" | "createdAt" | "deletedAt">) {
    console.log("Datapoint")

    const user = new User()
    user.firstname = data.firstname
    user.lastname = data.lastname
    user.email = data.email
    user.username = data.username
    user.password = data.password

    await this.userRepository.save(user)

    return user
  }
}
