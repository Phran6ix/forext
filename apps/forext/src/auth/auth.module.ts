import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller";
import { ClientsModule } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import authOption from "./auth.option";
import { UserDataPoint } from "@forext/data-access-user"
import { User } from "@forext/shared/entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ClientsModule.register([
      authOption
    ]),

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
  controllers: [AuthController],
  providers: [AuthService, UserDataPoint]
})
export class GatewayAuthModule { }
