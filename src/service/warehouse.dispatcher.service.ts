import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Warehouse} from "../domain/model/warehouse/warehouse";
import {WarehouseDispatcher} from "../domain/model/warehouse/warehouse.dispatcher";
import {AppUser} from "../domain/model/user/app.user";

@Injectable()
export class WarehouseDispatcherService {

	constructor(
		@InjectRepository(WarehouseDispatcher)
		private readonly warehouseDispatcherRepository: Repository<WarehouseDispatcher>,
	) {
	}

	async findWarehouseByDispatcherId(dispatcherId: number): Promise<Warehouse> {
		const warehouseDispatcher = await this.warehouseDispatcherRepository
			.findOne({ relations: ["warehouse"], where: {dispatcherId: dispatcherId}});
		return warehouseDispatcher.warehouse;
	}

	async findDispatchersByWarehouseId(warehouseId: number): Promise<AppUser[]> {
		const warehouseDispatchers = await this.warehouseDispatcherRepository
			.find({ relations: ["dispatcher"], where: {warehouseId: warehouseId}});
		return warehouseDispatchers.map(value => value.dispatcher);
	}
}
