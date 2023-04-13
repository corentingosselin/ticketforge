import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

interface RpcError {
  status?: number;
  message?: string;
}

function isRpcError(error: any): error is RpcError {
  return error && (typeof error.status === 'number' || typeof error.message === 'string');
}

@Catch(RpcException)
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const error = exception.getError();
    let status = 500;
    let message = 'Internal server error';

    if (isRpcError(error)) {
      status = error.status || status;
      message = error.message || message;
    } else if (typeof error === 'string') {
      message = error;
    }

    console.log('RpcToHttpExceptionFilter', status, message);
    return response.status(status).json({
      statusCode: status,
      message,
    });
  }
}