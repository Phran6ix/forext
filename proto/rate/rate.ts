/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "rate";

export interface GetUSDRatesPayload {
}

export interface ConversationRate {
  USD: number;
  AED: number;
  AFN: number;
  ALL: number;
  AMD: number;
  ANG: number;
  ADA: number;
  ARS: number;
  AUD: number;
  AWG: number;
  AZN: number;
  BAM: number;
  BBD: number;
  BDT: number;
  BGN: number;
  BHD: number;
  BIF: number;
  BMD: number;
  BND: number;
  BOB: number;
  BRL: number;
  BSD: number;
  BTN: number;
  BWP: number;
  BYN: number;
  BZD: number;
  CAD: number;
  CDF: number;
  CHF: number;
  CLP: number;
  CNY: number;
  COP: number;
  CRC: number;
  CUP: number;
  CVE: number;
  DJF: number;
  DKK: number;
  DOP: number;
  DZD: number;
  EGP: number;
  ERN: number;
  ETB: number;
  EUR: number;
  FJD: number;
  FKP: number;
  FOK: number;
  GBP: number;
  GEL: number;
  GGP: number;
  GHS: number;
  GIP: number;
  GMD: number;
  GNF: number;
  GTQ: number;
  GYD: number;
  HKD: number;
  HNL: number;
  HRK: number;
  HTG: number;
  HUF: number;
  IDR: number;
  ILS: number;
  IMP: number;
  INR: number;
  IQD: number;
  IRR: number;
  ISK: number;
  JEP: number;
  JMD: number;
  JOD: number;
  JPY: number;
  KES: number;
  KGS: number;
  KHR: number;
  KID: number;
  KMF: number;
  KRW: number;
  KWD: number;
  KYD: number;
  KZT: number;
  LAK: number;
  LBP: number;
  LKR: number;
  LRD: number;
  LSL: number;
  LYD: number;
  MAD: number;
  MDL: number;
  MGA: number;
  MKD: number;
  MMK: number;
  MNT: number;
  MOP: number;
  MRU: number;
  MUR: number;
  MVR: number;
  MWK: number;
  MXN: number;
  MYR: number;
  MZN: number;
  NAD: number;
  NGN: number;
  NIO: number;
  NOK: number;
  NPR: number;
  NZD: number;
  OMR: number;
  PAB: number;
  PEN: number;
  PGK: number;
  PHP: number;
  PKR: number;
  PLN: number;
  PYG: number;
  QAR: number;
  RON: number;
  RSD: number;
  RUB: number;
  RWF: number;
  SAR: number;
  SBD: number;
  SCR: number;
  SDG: number;
  SEK: number;
  SGD: number;
  SHP: number;
  SLE: number;
  SLL: number;
  SOS: number;
  SRD: number;
  SSP: number;
  STN: number;
  SYP: number;
  SZL: number;
  THB: number;
  TJS: number;
  TMT: number;
  TND: number;
  TOP: number;
  TRY: number;
  TTD: number;
  TVD: number;
  TWD: number;
  TZS: number;
  UAH: number;
  UGX: number;
  UYU: number;
  UZS: number;
  VES: number;
  VND: number;
  VUV: number;
  WST: number;
  XAF: number;
  XCD: number;
  XDR: number;
  XOF: number;
  XPF: number;
  YER: number;
  ZAR: number;
  ZMW: number;
  ZWL: number;
}

export interface GetUSDRatesResult {
  status: number;
  baseCode: string;
  timeLastUpdated: string;
  timeNextUpdate: string;
  conversionRate: ConversationRate | undefined;
}

export const RATE_PACKAGE_NAME = "rate";

export interface RateServiceClient {
  getUsdRates(request: GetUSDRatesPayload): Observable<GetUSDRatesResult>;
}

export interface RateServiceController {
  getUsdRates(
    request: GetUSDRatesPayload,
  ): Promise<GetUSDRatesResult> | Observable<GetUSDRatesResult> | GetUSDRatesResult;
}

export function RateServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getUsdRates"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RateService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RateService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const RATE_SERVICE_NAME = "RateService";
