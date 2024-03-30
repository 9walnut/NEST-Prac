import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // 제네릭 타입을 사용하기 위해 @Inject~~~ 사용
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // 인스턴스를 만드는 이유
    // DB에 저장하기 전에 엔터티에서 검사하기 위함
    const user = this.repo.create({ email, password });

    // 실제 데이터베이스에 저장
    // 바로 객체를 사용하면 Hook를 사용할 수 없음
    return this.repo.save(user);
  }

  // id로 한명의 사용자 찾기
  // 없다면 null 반환
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  // 이메일과 일치하는 모든 사용자 찾기
  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  // User 클래스의 일부 혹은 없는 등 유연한 타입 제공
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.repo.remove(user);
  }
}
