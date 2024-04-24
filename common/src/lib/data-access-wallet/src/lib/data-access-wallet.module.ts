import { Module } from '@nestjs/common';
import { WalletDataPoint } from './data-access-wallet.service';

@Module({
  controllers: [],
  providers: [WalletDataPoint],
  exports: [WalletDataPoint],
})
export class DataAccessWalletModule { }
