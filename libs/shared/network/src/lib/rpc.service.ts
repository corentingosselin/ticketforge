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
    payload?: unknown
  ): Promise<T> {
    // send 0 data if not payload, small trick to allow passing empty payload
    const result = lastValueFrom(this.client.send(command, payload || 0).pipe(
      catchError((error) => {
        return throwError(() => new RpcException(error));
      }))
    );
    return result;
  }
  
}
