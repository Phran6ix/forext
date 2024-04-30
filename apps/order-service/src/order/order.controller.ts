import { Controller } from "@nestjs/common"
import { CreateUserOrderPayload, OrderServiceControllerMethods, GetUserOrderPayload } from "@forext/proto";
import { OrderService } from "./order.service";

@Controller()
@OrderServiceControllerMethods()
export class OrderController {
  constructor(
    private orderService: OrderService
  ) { }

  async createUserOrder(data: CreateUserOrderPayload) {
    const { userId, ...payload } = data
    return await this.orderService.CreateUserOrder(userId, payload)
  }

  async getUserOrder(data: GetUserOrderPayload) {
    const { userId } = data
    return await this.orderService.GetUserOrders(userId)
  }
}
