import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

interface RpcError {
  status?: number;
  message?: string;
}

function isRpcError(error: any): error is RpcError {
  return error && (typeof error.status === 'number' && typeof error.message === 'string');
}

@Catch(RpcException)
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const error = exception.getError();
    let status = 500;
    let message = 'Internal server error';

    if (isRpcError(error))  {
      status = error.status || status;
      message = error.message || message;
    } else if (typeof error === 'string') {
      message = error;
    }

    if(status === 500) {
      Logger.error(exception.stack, RpcToHttpExceptionFilter.name);
    }
    
    return response.status(status).send({
      statusCode: status,
      message,
    });
  }
}