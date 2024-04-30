import { Module } from "@nestjs/common"
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RATE_PACKAGE_NAME } from "@forext/proto";
import { join } from "path";
import { OrderDataPoint, OrderDataPointModule } from "common/src/lib/data-access-order/src";
import { DataAccessWalletModule, WalletDataPoint } from "common/src/lib/data-access-wallet/src";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "shared/src/lib/entity/order.entity";
import { Wallet } from "@forext/shared/entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, Wallet]),
    ClientsModule.register([

      {
        name: RATE_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: "0.0.0.0:6005",
          protoPath: join(__dirname, "../../../proto/rate/rate.proto"),
          package: RATE_PACKAGE_NAME
        }
      },
    ]),
    OrderDataPointModule,
    DataAccessWalletModule,
  ],

  providers: [OrderService, WalletDataPoint, OrderDataPoint],
  controllers: [OrderController]
})
export class OrderModule { }
