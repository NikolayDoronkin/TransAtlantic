import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemCategory } from "../../domain/model/item/item.category";

@Injectable()
export class ItemCategoryService {
	constructor(
		@InjectRepository(ItemCategory)
		private readonly itemCategoryRepository: Repository<ItemCategory>
	) {
	}

	async getById(id: number): Promise<ItemCategory> {
		return await this.itemCategoryRepository.findOne({
			where: {
				id: id
			},
		})
	}
}
