import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/domain/user";
import { Repository } from "typeorm";
import * as BCrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    return await this.userRepository.find();
  }

  getById(id: string): string {
    return id;
  }

  async create(user: User) {
    user.password = await BCrypt.hash(user.password, 5);

    return this.userRepository.save(user);
  }

  async getByLogin(login: string) {
    return await this.userRepository.findOne({ where: { login }});
  }
}
