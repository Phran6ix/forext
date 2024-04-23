import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { UserDataPoint } from "@forext/data-access-user";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@forext/shared/entity";

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
          package: "user",
          protoPath: join(__dirname, "../../../proto/user/user.proto")
        }
      }, {
        name: "WALLET_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: "wallet",
          protoPath: join(__dirname, "../../../proto/wallet/wallet.proto")
        }
      }
    ]),
  ],
  providers: [AuthService, UserDataPoint],
  controllers: [AuthController]
})
export class AuthServiceModule { }
