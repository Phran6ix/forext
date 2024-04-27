import { Injectable } from "@nestjs/common";
import { Forex } from "@forext/shared/entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, MongoRepository } from "typeorm";
@Injectable()
export class DataAccessForexService {
  constructor(
    @InjectRepository(Forex)
    private forexRepository: MongoRepository<Forex>
  ) { }

  async InsertMultipleForexAsset(payload: Partial<Forex>[]) {
    await this.forexRepository.deleteMany({})
    await this.forexRepository.insertMany(payload)
  }

  async GetAllForexAsset() {
    return this.forexRepository.find()
  }
}
