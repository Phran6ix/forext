/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "order";

export interface GetUserOrderPayload {
  userId: string;
}

export interface GetUserOrderResult {
  userId: string;
  orderId: string;
  dateInitialized: string;
  amount: string;
  currency: string;
}

export interface CreateUserOrderPayload {
  userId: string;
  asset: string;
  amount: string;
}

export interface CreateUserOrderResult {
  userId: string;
  orderProcessed: boolean;
  numberOfAsset: number;
  dateInitialized: string;
  orderId: string;
}

export const ORDER_PACKAGE_NAME = "order";

export interface OrderServiceClient {
  getUserOrder(request: GetUserOrderPayload): Observable<GetUserOrderResult>;

  createUserOrder(request: CreateUserOrderPayload): Observable<CreateUserOrderResult>;
}

export interface OrderServiceController {
  getUserOrder(
    request: GetUserOrderPayload,
  ): Promise<GetUserOrderResult> | Observable<GetUserOrderResult> | GetUserOrderResult;

  createUserOrder(
    request: CreateUserOrderPayload,
  ): Promise<CreateUserOrderResult> | Observable<CreateUserOrderResult> | CreateUserOrderResult;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getUserOrder", "createUserOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
