import { Wallet } from "@forext/shared/entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Type } from "class-transformer";
import { WalletService } from "./wallet.service";
import { ClientsModule } from "@nestjs/microservices";
// import { UserDataPoint } from "@forext/data-access-user";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "forext",
      synchronize: true
    }),
    TypeOrmModule.forFeature([Wallet]),
  ],
  providers: [WalletService]
})
export class WalletModule { }
