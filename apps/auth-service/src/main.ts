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
      url: "0.0.0.0:6002",
      protoPath: join(__dirname, "../../../proto/auth/auth.proto")
    }
  })

  const globalPrefix = 'api';
  const port = process.env.PORT || 3000;
  await app.listen();
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
