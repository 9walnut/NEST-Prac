import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Next,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // 응답을 받기 전 무언가를 하고 싶을 때
    // console.log('Im runnign before the handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // 응답이 나가기 전 무언가를 하고 싶을 때
        // console.log('Im runnign before response is sent out', data);
        return plainToClass(UserDto, data, {
          // expose 된 정보들만 포함
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
