import { Module } from "@nestjs/common";
import { OrderDataPoint } from "./data-access-order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbConnection } from "@forext/shared/utils";
import { OrderEntity } from "shared/src/lib/entity/order.entity";

@Module({
  providers: [OrderDataPoint],
  imports: [TypeOrmModule.forRoot(dbConnection), TypeOrmModule.forFeature([OrderEntity])]
})
export class OrderDataPointModule { }
