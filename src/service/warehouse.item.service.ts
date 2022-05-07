import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { WarehouseItem } from "../domain/model/warehouse/warehouse.item";
import { Item } from "../domain/model/item/item";

@Injectable()
export class WarehouseItemService {
	constructor(
		@InjectRepository(WarehouseItem)
		private readonly warehouseItemRepository: Repository<WarehouseItem>
	) {
	}

	countOccupiedUnits(warehouseId: number): Promise<number> {
		return this.warehouseItemRepository.createQueryBuilder("wi")
			.where("wi.warehouse.id = :warehouseId", { warehouseId })
			.innerJoin(Item, "item", "wi.item.id=item.id")
			.select("SUM(wi.amount * item.unitSize)", "units")
			.getRawOne();
	}
}
