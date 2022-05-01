import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppUser } from "src/domain/user/app.user";
import { Repository } from "typeorm";
import * as BCrypt from "bcrypt";

@Injectable()
export class AppUserService {
  constructor(
    @InjectRepository(AppUser)
    private readonly appUserRepository: Repository<AppUser>,
  ) {}

  async getAll() {
    return await this.appUserRepository.find();
  }

  getById(id: string): string {
    return id;
  }

  async create(user: AppUser) {
    user.password = await BCrypt.hash(user.password, 5);

    return this.appUserRepository.save(user);
  }

  async getByEmail(email: string) {
    return await this.appUserRepository.findOne({ where: { email }});
  }
}
