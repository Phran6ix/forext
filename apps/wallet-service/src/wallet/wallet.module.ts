import { Wallet, User } from "@forext/shared/entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletService } from "./wallet.service";
import { WalletController } from "./wallet.controller";
import { DataAccessWalletModule, WalletDataPoint } from "common/src/lib/data-access-wallet/src";
import { UserDataPoint } from "@forext/data-access-user";
import {dbConnection} from '@forext/shared/utils'


@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnection),
    DataAccessWalletModule,
    TypeOrmModule.forFeature([User, Wallet]),
  ],
  providers: [WalletService, WalletDataPoint, UserDataPoint],
  controllers: [WalletController]
})
export class WalletModule { }
