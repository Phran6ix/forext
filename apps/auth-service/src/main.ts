import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AuthServiceModule } from './auth/auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@forext/proto';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule, {
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      url: process.env.APP_URL,
      protoPath: join(__dirname, "../../../proto/auth/auth.proto")
    }
  })

  await app.listen();
  Logger.log(
    `🚀 Authentication Application is running `
  );
}

bootstrap();
