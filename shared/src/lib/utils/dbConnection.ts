import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Forex, Order, User, Wallet } from "../entity"

const dbConnection: TypeOrmModuleOptions = {
  type: "mongodb",
  host: "forext_mongo",
  port: 27017,
  database: "forext",
  entities: [User, Wallet, Forex, Order],
  synchronize: true
}

export default dbConnection
