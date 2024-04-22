import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 在进入控制器之前执行的代码
    return next.handle().pipe(
      map((data) => {
        // 在控制器返回值之后执行的代码
        return {
          data,
          code: 0,
          message: 'success',
        };
      }),
    );
  }
}
