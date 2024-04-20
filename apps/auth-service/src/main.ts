import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { AuthModule } from './auth/auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule, {
    transport: Transport.GRPC,
    options: {
      package: "auth",
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
