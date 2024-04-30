import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME, OrderServiceClient } from "@forext/proto";
import { CreateOrderDTO } from "@forext/shared/dto";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class OrderService implements OnModuleInit {
  private orderService: OrderServiceClient
  constructor(
    @Inject(ORDER_PACKAGE_NAME) private orderClient: ClientGrpc
  ) { }
  onModuleInit() {
    this.orderService = this.orderClient.getService<OrderServiceClient>(ORDER_SERVICE_NAME)
  }

  async CreateUserOrder(userId: string, payload: CreateOrderDTO): Promise<unknown> {
    const order = await firstValueFrom(this.orderService.createUserOrder({ userId, ...payload }))
    return { order }
  }

  async GetUserOrders(userId: string): Promise<{ orders: unknown }> {
    const orders = await firstValueFrom(this.orderService.getUserOrder({ userId }))
    return { orders }
  }
}
