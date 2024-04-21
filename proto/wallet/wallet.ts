/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "wallet";

export interface CreateWalletPayload {
  userId: string;
}

export interface GetUserWalletBalancePayload {
  userId: string;
}

export interface DebitWalletBalancePayload {
  userId: string;
  amount: string;
  currency: string;
}

export interface CreditWalletBalancePayload {
  userId: string;
  amount: string;
  currency: string;
}

export interface ReturnEmpty {
}

export const WALLET_PACKAGE_NAME = "wallet";

export interface WalletServiceClient {
  createWallet(request: CreateWalletPayload): Observable<ReturnEmpty>;

  debitwallerBalance(request: DebitWalletBalancePayload): Observable<ReturnEmpty>;

  creditWalletBalance(request: CreditWalletBalancePayload): Observable<ReturnEmpty>;

  getUserWalletBalance(request: GetUserWalletBalancePayload): Observable<ReturnEmpty>;
}

export interface WalletServiceController {
  createWallet(request: CreateWalletPayload): Promise<ReturnEmpty> | Observable<ReturnEmpty> | ReturnEmpty;

  debitwallerBalance(request: DebitWalletBalancePayload): Promise<ReturnEmpty> | Observable<ReturnEmpty> | ReturnEmpty;

  creditWalletBalance(
    request: CreditWalletBalancePayload,
  ): Promise<ReturnEmpty> | Observable<ReturnEmpty> | ReturnEmpty;

  getUserWalletBalance(
    request: GetUserWalletBalancePayload,
  ): Promise<ReturnEmpty> | Observable<ReturnEmpty> | ReturnEmpty;
}

export function WalletServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createWallet", "debitwallerBalance", "creditWalletBalance", "getUserWalletBalance"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("WalletService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("WalletService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const WALLET_SERVICE_NAME = "WalletService";
