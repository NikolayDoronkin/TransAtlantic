import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CustomerStatus} from "../domain/model/customer/customer.status";

@Injectable()
export class CustomerStatusService {
	constructor(
		@InjectRepository(CustomerStatus)
		private readonly statusRepository: Repository<CustomerStatus>,
	) {
	}

	async findByName(statusName: string) : Promise<CustomerStatus> {
		return await this.statusRepository.findOne({ where: { name: statusName } });
	}
}