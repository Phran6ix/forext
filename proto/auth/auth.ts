/* eslint-disable */

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

export const AUTH_PACKAGE_NAME = "auth";
