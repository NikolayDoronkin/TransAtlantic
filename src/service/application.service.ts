import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Application } from "../domain/model/application/application";
import { WarehouseService } from "./warehouse.service";

@Injectable()
export class ApplicationService {
	constructor(
		@InjectRepository(Application)
		private readonly applicationRepository: Repository<Application>,

		private readonly warehouseService: WarehouseService
	) {
	}

	async getById(id: number): Promise<Application[]> {
		const warehouseIds = Array.from(await this.warehouseService.getByCustomerId(id))
			.map(warehouse => warehouse.id);

		return this.applicationRepository.find({
			where: { srcWarehouseId: In(warehouseIds) },
			relations: [
				"srcWarehouse",
				"srcWarehouse.address",
				"srcWarehouse.address.city",
				"destWarehouse",
				"destWarehouse.address",
				"destWarehouse.retailer",
				"destWarehouse.address.city",
				"status",
				"lastEditor"]
		});
	}
}
