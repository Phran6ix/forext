import { Controller, Get } from '@nestjs/common';


@Controller()
export class HealthController {
  constructor() {}

  @Get("/health")
  getData() {
    return {message: "API Gateway is up and running"}
  }
}
