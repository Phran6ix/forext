import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller";
import { ClientsModule } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import authOptions from "../option/auth.option";
import walletOption from "../option/wallet.option";
import { UserDataPoint } from "@forext/data-access-user"
import { User, Wallet } from "@forext/shared/entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbConnection } from "@forext/shared/utils";
@Module({
  imports: [
    ClientsModule.register([
      authOptions,
      walletOption
    ]),

    TypeOrmModule.forRoot(dbConnection),
    TypeOrmModule.forFeature([User, Wallet])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserDataPoint]
})
export class GatewayAuthModule { }
