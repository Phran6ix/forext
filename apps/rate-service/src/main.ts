/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from "path";
import { RateModule } from "./rate/rate.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RateModule, {
    transport: Transport.GRPC,
    options: {
      url: "0.0.0.0:6005",
      package: "rate",
      protoPath: join(__dirname, "../../../proto/rate/rate.proto")
    }
  });
  await app.listen();
  Logger.log(
    `🚀 Rate Application is running `
  );
}

bootstrap();
