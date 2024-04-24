import { Response } from 'express'
import { Catch, RpcExceptionFilter, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionHandler implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): any {

    console.log("Eca")
    const error = exception.getError()

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    console.log("ERRP", error)
    return response.status(402).json({
      error
    })
// return throwError(() => exception.getError());
  }
}
