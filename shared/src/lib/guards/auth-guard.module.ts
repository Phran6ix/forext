import { ConfigModule } from "@nestjs/config";
import { config } from "../utils";
import { Module } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";

@Module({
  imports : [
    ConfigModule.forRoot({
    load: [config]
    })
  ],
  providers: [AuthGuard]
})

export class AuthGuardModule{}
