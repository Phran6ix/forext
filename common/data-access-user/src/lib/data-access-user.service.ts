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

  async GetAUserByEmail(email:string):Promise <User | null> {
    return await this.userRepository.findOne({
      where: {
        email
      }
    })
  }
}
