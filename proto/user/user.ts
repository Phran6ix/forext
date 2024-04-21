/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface GetUserByIdPayload {
  userId: string;
}

export interface GetUserByEmailPayload {
  email: string;
}

export interface ResultUser {
  userId: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface CreateUserPayload {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  createUser(request: CreateUserPayload): Observable<ResultUser>;

  getUserById(request: GetUserByIdPayload): Observable<ResultUser>;

  getUserByEmail(request: GetUserByEmailPayload): Observable<ResultUser>;
}

export interface UserServiceController {
  createUser(request: CreateUserPayload): Promise<ResultUser> | Observable<ResultUser> | ResultUser;

  getUserById(request: GetUserByIdPayload): Promise<ResultUser> | Observable<ResultUser> | ResultUser;

  getUserByEmail(request: GetUserByEmailPayload): Promise<ResultUser> | Observable<ResultUser> | ResultUser;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "getUserById", "getUserByEmail"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
