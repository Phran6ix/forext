import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { UserDataPoint } from "@forext/data-access-user";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@forext/shared/entity";
import config from "../config/config"
import { ConfigModule, ConfigService } from "@nestjs/config";
import { USER_PACKAGE_NAME } from "@forext/proto";
import { WALLET_PACKAGE_NAME } from "proto/wallet/wallet";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "forext",
      entities: [User],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: "USER_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, "../../../proto/user/user.proto")
        }
      }, {
        name: "WALLET_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: WALLET_PACKAGE_NAME,
          protoPath: join(__dirname, "../../../proto/wallet/wallet.proto")
        }
      }
    ]),
    ConfigModule.forRoot({
      load: [config]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET")
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, UserDataPoint],
  controllers: [AuthController]
})
export class AuthServiceModule { }
