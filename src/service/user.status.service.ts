import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserStatus} from "../domain/model/user/user.status";

@Injectable()
export class UserStatusService {
	constructor(
		@InjectRepository(UserStatus)
		private readonly statusRepository: Repository<UserStatus>,
	) {
	}

	async findByName(statusName: string) : Promise<UserStatus> {
		return await this.statusRepository.findOne({ where: { statusName: statusName } });
	}
}