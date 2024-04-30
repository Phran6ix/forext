import { Order } from "@forext/shared/entity"
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository, Or } from "typeorm";

@Injectable()
export class OrderDataPoint {
  constructor(
    @InjectRepository(Order)
    private orderRepository: MongoRepository<Order>

  ) { }

  async CreateOrder(payload: Omit<Order, "orderId" | "orderProcessed" | "dateInitialized" | "_id" | "action">): Promise<Order> {
    const order = new Order()
    order.currency = payload.currency
    order.numberOfAsset = payload.numberOfAsset
    order.asset = payload.asset
    order.amount = payload.amount
    order.userId = payload.userId
    order.orderProcessed = false

    await this.orderRepository.save(order)
    return order
  }

  async GetOrders(filter: Partial<Order>): Promise<Order[]> {
    return this.orderRepository.find({
      where: { ...filter }
    })
  }

  async GetAnOrders(filter: { orderId: string }): Promise<Order | null> {
    return this.orderRepository.findOne(
      {
        where: {
          orderId: filter.orderId
        }
      })
  }
}
