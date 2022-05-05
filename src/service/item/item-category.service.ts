import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createQueryBuilder, EntityNotFoundError, Repository } from "typeorm";
import { ItemCategory } from "../../domain/model/item/item.category";
import { ItemService } from "./item.service";
import { throws } from "assert";
import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";

@Injectable()
export class ItemCategoryService {
	constructor(
		@InjectRepository(ItemCategory)
		private readonly itemCategoryRepository: Repository<ItemCategory>,
		@Inject(forwardRef(() => ItemService))
		private readonly itemService: ItemService
	) {
	}

	async getAll(): Promise<ItemCategory[]> {
		const activeCategories = [];

		const categories = await createQueryBuilder(ItemCategory)
			.distinct(true)
			.innerJoin("item", "i", "i.category_id = \"ItemCategory\".id")
			.getMany();

		for (const source of Array.from(categories)) {
			const target = new ItemCategory();

			target.name = source.name;
			target.taxRate = source.taxRate;

			await this.itemService.getCountByCategoryId(source.id).then(count => {
				target.amount = count;
			});

			activeCategories.push(target)
		}

		return activeCategories;
	}

	async getById(id: number): Promise<ItemCategory> {
		return await this.itemCategoryRepository.findOne({
			where: {
				id: id
			}
		});
	}

	async updateByTaxRate(id: number, taxRate: number): Promise<ItemCategory> {
		return await this.itemCategoryRepository.findOne({
			where: {
				id: id
			}
		})
			.then(category => {
				category.taxRate = taxRate;
				return this.itemCategoryRepository.save(category);
			})
			.catch(() => {
				throw new EntityNotFoundError(ItemCategory, id);
			})
	}
}
