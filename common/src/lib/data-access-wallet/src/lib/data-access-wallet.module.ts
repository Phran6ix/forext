import { Module } from '@nestjs/common';
import { WalletDataPoint } from './data-access-wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Wallet } from '@forext/shared/entity';
import { dbConnection } from '@forext/shared/utils'

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnection),
    TypeOrmModule.forFeature([Wallet, User])
  ],
  controllers: [],
  providers: [WalletDataPoint],
  exports: [WalletDataPoint],
})
export class DataAccessWalletModule { }
