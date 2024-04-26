import { Module } from "@nestjs/common";
import walletOption from "../option/wallet.option";
import { ClientsModule } from "@nestjs/microservices";
import { WalletService } from "./wallet.service";
import { WalletController } from "./wallet.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { config } from '@forext/shared/utils'

@Module({
  providers: [WalletService],
  imports: [
    ClientsModule.register([walletOption]),
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
  controllers: [WalletController]
})
export class GatewayWalletModule { }
