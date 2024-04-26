import { Module } from '@nestjs/common';
import { AuthGuardModule } from './guards/auth-guard.module';

@Module({
  imports: [AuthGuardModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class SharedModule {}
