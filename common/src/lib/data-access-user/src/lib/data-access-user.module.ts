import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserDataPoint } from './data-access-user.service';
import { User } from '@forext/shared/entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "forext",
      entities: [User],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [],
  providers: [UserDataPoint],
  exports: [UserDataPoint],
})
export class DataAccessUserModule { }

