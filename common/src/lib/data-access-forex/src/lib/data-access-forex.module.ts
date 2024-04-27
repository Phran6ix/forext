import { Module } from "@nestjs/common";
import { DataAccessForexService } from "./data-access-forex.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbConnection } from "@forext/shared/utils";
import { Forex } from "@forext/shared/entity";

@Module({
  imports:[
    TypeOrmModule.forRoot(dbConnection),
    TypeOrmModule.forFeature([Forex])
  ],
  providers: [DataAccessForexService]
})
export class DataAccessForexModule{}
