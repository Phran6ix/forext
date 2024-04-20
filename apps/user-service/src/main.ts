import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { UserModule } from './user/user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { url } from 'inspector';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,
    options: {
      url: "0.0.0.0:6001",
      package: "user",
      protoPath: join(__dirname, "../../../proto/user/user.proto")
    }
  })
  await app.listen()
  Logger.log(
    `🚀 Application is running on: http://localhost:`
  );
}

bootstrap();
