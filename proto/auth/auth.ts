/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

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

export interface SignInPayload {
  username: string;
  password: string;
}

export interface SignInResult {
  token: string;
  user: ResultUser | undefined;
}

export interface tokenPayload {
  token: string;
}

export interface tokenResult {
  userId: string;
}

export interface ReturnEmpty {
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  signUp(request: CreateUserPayload): Observable<ResultUser>;

  signIn(request: SignInPayload): Observable<SignInResult>;

  validateUser(request: tokenPayload): Observable<tokenResult>;
}

export interface AuthServiceController {
  signUp(request: CreateUserPayload): Promise<ResultUser> | Observable<ResultUser> | ResultUser;

  signIn(request: SignInPayload): Promise<SignInResult> | Observable<SignInResult> | SignInResult;

  validateUser(request: tokenPayload): Promise<tokenResult> | Observable<tokenResult> | tokenResult;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signUp", "signIn", "validateUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
