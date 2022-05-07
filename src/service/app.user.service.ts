import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppUser } from "src/domain/model/user/app.user";
import { EntityNotFoundError, In, Repository } from "typeorm";
import * as BCrypt from "bcrypt";
import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";
import { RolePermissionType } from "../domain/model/user/type/role-permission.type";

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
				where: {
					id: id
				},
				relations: [
					"role",
					"role.rolePermissions",
					"role.rolePermissions.permission",
					"customer",
					"status",
					"address"]
			});
	}

	async getByCustomerIds(customerIds: number[]): Promise<AppUser[]> {
		return await this.appUserRepository.find(
			{
				where: { customerId: In(customerIds) },
				relations: ["role", "customer", "status", "address"]
			});
	}

	async create(user: AppUser): Promise<AppUser> {
		const createdUser = this.buildUser(user, new AppUser());

		createdUser.email = user.email;
		createdUser.roleId = user.roleId;
		createdUser.password = await BCrypt.hash(user.password, await BCrypt.genSalt());

		return this.appUserRepository.save(createdUser);
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

	async updateAll(updatedUsers: AppUser[]): Promise<AppUser[]> {
		updatedUsers.forEach(updatedUser => {
			this.getById(updatedUser.id).then(appUser => {
				if (appUser == null) {
					throw new EntityNotFoundError(AppUser, updatedUser.id);
				}
			});
		});
		return this.appUserRepository.save(updatedUsers);
	}

	async getByEmail(email: string) {
		return await this.appUserRepository.findOne({
			where: {
				email
			},
			relations: [
				"status"
			]
		});
	}

	async checkPermission(userId: number, permission: RolePermissionType): Promise<void> {
		return this.getById(userId)
			.then(user => {
				const isValid = user.role.rolePermissions
					.some((rolePermission) => rolePermission.permission.name == RolePermissionType[permission]);

				if (!isValid) {
					return Promise.reject(new RuntimeException("Нет разрешения для выполнения данной функции."));
				}
			})
			.catch(() => {
				throw new EntityNotFoundError(AppUser, userId);
			});
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
