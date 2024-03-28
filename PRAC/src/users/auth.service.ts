import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrpyt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrpyt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // 이메일 사용 중인지 검증
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // 해시 사용
    // 솔트 만들기
    const salt = randomBytes(8).toString('hex');

    // 해시로 만들기
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 해시 + 솔트
    const result = salt + '.' + hash.toString('hex');

    // 사용자 생성
    const user = await this.usersService.create(email, result);

    // 사용자 반환
    return user;
  }

  signin() {}
}
