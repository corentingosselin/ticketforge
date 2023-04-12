import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function handleRpcException<T>(): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) => {
    return source.pipe(
      catchError((error) => {
        return throwError(() => new RpcException(error.response));
      })
    );
  };
}