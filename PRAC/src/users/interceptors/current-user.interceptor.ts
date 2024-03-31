import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';

import { UsersService } from '../users.service';

// 의존성 주입 관련 내용 처리, Session 정보 취득
// 사용자 아이디 조회, request에 저장
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);

      request.CurrentUser = user;
    }

    return handler.handle();
  }
}
