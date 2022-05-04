import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Item } from "../../domain/model/item/item";
import { CustomerService } from "../customer.service";
import { ItemCategoryService } from "./item-category.service";
import { WarehouseService } from "../warehouse.service";
import { CarService } from "../car.service";
import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";

@Injectable()
export class ItemService {
	constructor(
		@InjectRepository(Item)
		private readonly itemRepository: Repository<Item>,

		private readonly carService: CarService,
		private readonly customerService: CustomerService,
		private readonly warehouseService: WarehouseService,
		private readonly itemCategoryService: ItemCategoryService
	) {
	}

	async getByCustomerId(customerId: number): Promise<Item[]> {
		return await this.itemRepository.find({
			where: { customerId: customerId },
			relations: [
				"category"
			]
		});
	}

	async create(item: Item): Promise<Item> {
		return await this.itemRepository.save(await this.buildItem(item, new Item()));
	}

	async deleteByIds(ids: number[]): Promise<void> {
		const items = await this.itemRepository.find({
			where: {
				id: In(ids)
			},
			relations: [
				"customer"
			]
		});

		for (const item of Array.from(items)) {
			this.validateItems(item).then(message => {
				if (message == null) {
					this.itemRepository.remove(item);
				} else {
					throw new RuntimeException(message);
				}
			});
		}
	}

	private async buildItem(source: Item, target: Item): Promise<Item> {
		target.upc = source.upc;
		target.name = source.name;
		target.price = source.price;
		target.unitSize = source.unitSize;

		target.category = await this.itemCategoryService.getById(source.categoryId);
		target.customer = await this.customerService.getById(source.customerId);

		return target;
	}

	private async validateItems(item: Item): Promise<string> {
		let message = null;

		await this.carService.getByCustomerId(item.customer.id).then(cars => {
			if (cars.length != 0) {
				message = "Данный продукт находится в грузовике клиента.";
			}
		});
		await this.warehouseService.getByCustomerId(item.customer.id).then(warehouses => {
			if (warehouses.length != 0) {
				message = "Данный продукт находится на складе клиента.";
			}
		});

		return  message;
	}
}
