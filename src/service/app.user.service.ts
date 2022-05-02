import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppUser } from "src/domain/model/user/app.user";
import { EntityNotFoundError, Repository } from "typeorm";
import * as BCrypt from "bcrypt";

@Injectable()
export class AppUserService {
	constructor(
		@InjectRepository(AppUser)
		private readonly appUserRepository: Repository<AppUser>
	) {
	}

	async getAll() {
		return await this.appUserRepository.find(
			{ relations: ["role", "customer", "status", "address"] });
	}

	async getById(id: number): Promise<AppUser> {
		return await this.appUserRepository.findOne(
			{
				where: { id },
				relations: ["role", "customer", "status", "address"]
			});
	}

	async create(user: AppUser): Promise<AppUser> {
		const createdUser = this.buildUser(user, new AppUser());

		createdUser.password = await BCrypt.hash(user.password, 5);
		createdUser.roleId = user.roleId;

		return this.appUserRepository.save(user);
	}

	async update(updatedUser: AppUser): Promise<AppUser> {
		const currentUser = this.getById(updatedUser.id).then(appUser => {
			if (appUser == null) {
				throw new EntityNotFoundError(AppUser, updatedUser.id);
			}
			return appUser;
		});

		const updateUser = this.buildUser(updatedUser, await currentUser);

		return this.appUserRepository.save(updateUser);
	}

	async getByEmail(email: string) {
		return await this.appUserRepository.findOne({ where: { email } });
	}

	private buildUser(source: AppUser, target: AppUser): AppUser {
		target.firstName = source.firstName;
		target.lastName = source.lastName;
		target.birthday = source.birthday;
		target.addressId = source.addressId;
		target.customerId = source.customerId;
		target.statusId = source.statusId;

		return target;
	}
}
