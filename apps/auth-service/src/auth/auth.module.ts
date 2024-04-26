import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { UserDataPoint } from "@forext/data-access-user";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User, Wallet } from "@forext/shared/entity";
import config from "../config/config"
import { ConfigModule, ConfigService } from "@nestjs/config";
import { USER_PACKAGE_NAME } from "@forext/proto";
import { WALLET_PACKAGE_NAME } from "proto/wallet/wallet";
import { JwtModule } from "@nestjs/jwt";
import { dbConnection } from "@forext/shared/utils"

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnection),
    TypeOrmModule.forFeature([User, Wallet]),
    ClientsModule.register([
      {
        name: "USER_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, "../../../proto/user/user.proto"),
          url: "0.0.0.0:6001"
        }
      }, {
        name: "WALLET_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: WALLET_PACKAGE_NAME,
          protoPath: join(__dirname, "../../../proto/wallet/wallet.proto"),
          url: "0.0.0.0:6003"
        }
      }
    ]),
    ConfigModule.forRoot({
      load: [config]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        expiresIn: "15m"
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, UserDataPoint],
  controllers: [AuthController]
})
export class AuthServiceModule { }
