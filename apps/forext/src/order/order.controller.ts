import { CreateOrderDTO } from "@forext/shared/dto";
import { AuthGuard } from "@forext/shared/guards";
import { Res, Get, Body, Controller, Req, Post, UseGuards } from "@nestjs/common";
import { Request, Response } from 'express'
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
  constructor(
    private orderService: OrderService
  ) { }

  @UseGuards(AuthGuard)
  @Post("/create-order")
  async CreateUserOrder(@Body() body: CreateOrderDTO, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.orderService.CreateUserOrder(req.user, body)
      return res.status(200).json( { message: "Order has been created successfully", data }      )
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" })
    }
  }

  @UseGuards(AuthGuard)
  @Get("/get-user-orders")
  async GetUserOrders(@Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.orderService.GetUserOrders(req.user)
      return res.status(200).json( { message: "Orders has been processed successfully", data } )
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" })
    }
  }
}
