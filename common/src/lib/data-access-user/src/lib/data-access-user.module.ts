import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserDataPoint } from './data-access-user.service';
import { User } from '@forext/shared/entity';
import {dbConnection} from '@forext/shared/utils'

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnection),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [],
  providers: [UserDataPoint],
  exports: [UserDataPoint],
})
export class DataAccessUserModule { }

