import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entitiy";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
  constructor{
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  }{}

  async create(input: CreateUserInput): Promise<User>{
    const { name, password, email, age } = input;
    const user = await this.userRepository.findOne({ email });
    if (user){

    }
  }
}