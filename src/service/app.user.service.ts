import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AppUser} from "src/domain/model/user/app.user";
import {EntityNotFoundError, In, Repository} from "typeorm";
import * as BCrypt from "bcrypt";
import {UserStatusService} from "./user.status.service";
import {RoleService} from "./role.service";
import {MailService} from "./mail.service";
import {AddressService} from "./address.service";

@Injectable()
export class AppUserService {

	private readonly ACTIVE_STATUS = "active";
	private readonly DISABLED_STATUS = "disabled";
	private readonly PASSWORD_MAIL_SUBJECT = "Ваш пароль для входа";

	constructor(
		@InjectRepository(AppUser)
		private readonly appUserRepository: Repository<AppUser>,
		private readonly userStatusService: UserStatusService,
		private readonly roleService: RoleService,
		private readonly mailService: MailService,
		private readonly addressService: AddressService
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

	async getByCustomerIds(customerIds: number[]): Promise<AppUser[]> {
		return await this.appUserRepository.find(
			{
				where : {customerId: In(customerIds)},
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

	async disableUsers(customerIds: number[]) {
		await this.changeStatus(customerIds, this.DISABLED_STATUS);
	}

	async enableUsers(customerIds: number[]) {
		await this.changeStatus(customerIds, this.ACTIVE_STATUS);
	}

	private async changeStatus(userIds: number[], status: string) {
		const users = await this.appUserRepository.findByIds(userIds);
		//todo: проверка на: роль текущего пользователя - admin, у этого админа сustomer_id==users.customerId
		const userStatus = await this.userStatusService.findByName(status);
		users.forEach(user => user.status = userStatus);
		await this.updateAll(users);
	}

	async createUserManagement(user: AppUser): Promise<AppUser> {

		//todo: user.customer = customer;
		//todo: user.customerId = customer.id;
		this.addressService.create(user.address).then(
			address => user.address = address
		);
		this.roleService.findById(user.roleId).then(
			role => user.role = role
		);
		return await this.buildAnsSaveUser(user);
	}

	async buildAnsSaveUser(user: AppUser) {
		const userStatus = await this.userStatusService.findByName(this.ACTIVE_STATUS);
		user.status = userStatus;
		user.statusId = userStatus.id;
		user.password = this.generatePassword();
		const appUser = await this.create(user);

		await this.mailService.sendEmail(user.email, this.PASSWORD_MAIL_SUBJECT, this.buildMessage(user.password));
		return appUser;
	}

	private buildMessage(password: string): string {
		return "Ваш пароль для входа в систему: " + password + "\nНикому не сообщайте";
	}

	private generatePassword(): string {
		const crypto = require("crypto");
		return crypto.randomBytes(4).toString("hex");
	}
}
