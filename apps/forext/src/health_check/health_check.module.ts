import { Module } from '@nestjs/common';


import { HealthController } from './health_check.controller';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [],
})
export class HealthModule {}
