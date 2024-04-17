import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@forext/shared/entity";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: "SECRET_PLACEHOLDER",
      signOptions: { expiresIn: "15m" }
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]

})
export class UserModule { }
