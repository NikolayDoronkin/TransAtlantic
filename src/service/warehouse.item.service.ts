import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {WarehouseItem} from "../domain/model/warehouse/warehouse.item";
import {Item} from "../domain/model/item/item";

@Injectable()
export class WarehouseItemService {
	constructor(
		@InjectRepository(WarehouseItem)
		private readonly warehouseItemRepository: Repository<WarehouseItem>
	) {
	}

	async getByItemId(itemId: number): Promise<WarehouseItem> {
		return await this.warehouseItemRepository
			.findOne({ where: { itemId: itemId } });
	}

	async save(item: WarehouseItem): Promise<WarehouseItem> {
		return this.warehouseItemRepository.save(item);
	}

	countOccupiedUnits(warehouseId: number): Promise<number> {
		return this.warehouseItemRepository.createQueryBuilder("wi")
			.where("wi.warehouse.id = :warehouseId", { warehouseId })
			.innerJoin(Item, "item", "wi.item.id=item.id")
			.select("SUM(wi.amount * item.unitSize)", "units")
			.getRawOne();
	}
}
