import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserRole} from "../domain/model/user/user.role";

@Injectable()
export class RoleService {
	constructor(
		@InjectRepository(UserRole)
		private readonly userRoleRepository: Repository<UserRole>,
	) {
	}

	async findByName(roleName: string) : Promise<UserRole> {
		return await this.userRoleRepository.findOne({ where: { roleName: roleName } });
	}
}
