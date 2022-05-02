import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Warehouse } from "../domain/model/warehouse/warehouse";

@Injectable()
export class WarehouseService {
	constructor(
		@InjectRepository(Warehouse)
		private readonly warehouseRepository: Repository<Warehouse>
	) {
	}

	async getByCustomerId(customerId: number): Promise<Warehouse[]> {
		return await this.warehouseRepository.find({ where: { customerId: customerId } });
	}
}
