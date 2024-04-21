import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
  imports: [
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
    ])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
