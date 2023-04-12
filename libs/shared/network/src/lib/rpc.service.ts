import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

@Injectable()
export class RpcService {
  private client: ClientProxy;

  constructor(client: ClientProxy) {
    this.client = client;
  }

  sendWithRpcExceptionHandler<T>(
    command: string,
    payload: unknown
  ): Promise<T> {
    const result = lastValueFrom(this.client.send(command, payload).pipe(
      catchError((error) => {
        return throwError(() => new RpcException(error));
      }))
    );
    return result;
  }
}
