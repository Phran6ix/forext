import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { AppModule } from './app/app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: "wallet",
      url: "0.0.0.0:6003",
      protoPath: join(__dirname, "../../../proto/wallet/wallet.proto")
    }
  })
  await app.listen()
  Logger.log(
    `🚀 Wallet Microservice Application is running`
  );
}

bootstrap();
