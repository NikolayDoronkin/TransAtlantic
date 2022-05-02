import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "../domain/model/item/item";

@Injectable()
export class ItemService {
	constructor(
		@InjectRepository(Item)
		private readonly itemRepository: Repository<Item>
	) {
	}

	getByCustomerId(customerId: number) {
		return this.itemRepository.find({
			where: { customerId: customerId },
			relations: [
				"category"
			]
		});
	}
}
