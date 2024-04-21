import { Module } from '@nestjs/common';
import { } from "typeorm"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserDataPoint } from './data-access-user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "user"
    })
  ],
  controllers: [],
  providers: [UserDataPoint],
  exports: [UserDataPoint],
})
export class DataAccessUserModule { }
