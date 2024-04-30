import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ClientsModule } from "@nestjs/microservices";
import orderOption from "../option/order.option"
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { config } from "@forext/shared/utils";

@Module({
  imports: [
    ClientsModule.register([
      orderOption
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET")
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      load: [config]
    })
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class GateWayOrderModule {}
