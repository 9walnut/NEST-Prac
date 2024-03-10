import { Body, Controller } from '@nestjs/common';
import { Userservice } from './user.service';

@Controller('user')
export class UserController {
  PASSWORD_SALT = 10;
  constructor(private readonly userService: Userservice) {}

  @Post()
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      input.password,
      this.PASSWORD_SALT,
    );

    const user = {
      ...input,
      password: hashedPassword,
    };
    return this.userService.create(user);
  }
}
