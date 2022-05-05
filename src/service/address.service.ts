import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Address} from "../domain/model/address/address";

@Injectable()
export class AddressService {
	constructor(
		@InjectRepository(Address)
		private readonly addressRepository: Repository<Address>,
	) {
	}

	async create(address: Address) : Promise<Address> {
		return this.addressRepository.create(address);
	}
}
