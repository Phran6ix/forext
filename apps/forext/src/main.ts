import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { GateWayModule } from "./app.mmodule";
import { RpcException } from '@nestjs/microservices';
import { ExceptionHandler } from '@forext/shared/decorator';

async function bootstrap() {
  const app = await NestFactory.create(GateWayModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
