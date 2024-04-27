/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { OrderModule } from './order/order.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrderModule, {
    transport: Transport.GRPC,
    options: {
      url: "0.0.0.0:6006",
      protoPath: join(__dirname, "../../../proto/order/order.proto"),
      package: "order"
    }
  });
  await app.listen()
  Logger.log(
    `🚀 Order Application is running`
  );
}

bootstrap();
