import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@forext/shared/entity";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: "SECRET_PLACEHOLDER",
      signOptions: { expiresIn: "15m" }
    }),
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "fx-mrk-user"
    }),
  ],
  providers: [UserService],
  controllers: []

})
export class UserModule { }
