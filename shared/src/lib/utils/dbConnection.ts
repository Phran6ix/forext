import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { User, Wallet } from "../entity"

const dbConnection: TypeOrmModuleOptions = {
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "forext",
  entities: [User, Wallet],
  synchronize: true
}

export default dbConnection
