import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@forext/shared/entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule { }
