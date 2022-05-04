import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Customer} from "../domain/model/customer/customer";

@Injectable()
export class CustomerService {
	constructor(
		@InjectRepository(Customer)
		private readonly customerRepository: Repository<Customer>,
	) {
	}

	async findAll(): Promise<Customer[]> {
		return await this.customerRepository.find({relations : ["status"]});
	}

	async getById(id: number): Promise<Customer> {
		return await this.customerRepository.findOne({
			where: {
				id: id
			}
		})
	}

	async create(customer: Customer) {
		return this.customerRepository.save(customer);
	}
}
