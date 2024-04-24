import { Module } from '@nestjs/common';
import { DataAccessWalletModule } from './data-access-wallet/src';
import { DataAccessUserModule } from './data-access-user/src';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports:[DataAccessWalletModule, DataAccessUserModule]
})
export class CommonModule {}
