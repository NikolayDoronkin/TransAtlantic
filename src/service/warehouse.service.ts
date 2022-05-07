import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Warehouse } from "../domain/model/warehouse/warehouse";
import { WarehouseConverter } from "../converter/warehouse/warehouse.converter";
import { WarehouseResponse } from "../domain/response/warehouse.response";
import { WarehouseItemService } from "./warehouse.item.service";
import { CreateWarehouseConverter } from "../converter/warehouse/create.warehouse.converter";
import { Address } from "../domain/model/address/address";
import { WarehouseItem } from "../domain/model/warehouse/warehouse.item";
import { Application } from "../domain/model/application/application";

@Injectable()
export class WarehouseService {
	constructor(
		@InjectRepository(Warehouse)
		private readonly warehouseRepository: Repository<Warehouse>,
		@InjectRepository(WarehouseItem)
		private readonly warehouseItemRepository: Repository<WarehouseItem>,
		@InjectRepository(Address)
		private readonly addressRepository: Repository<Address>,
		@InjectRepository(Application)
		private readonly applicationRepository: Repository<Application>,
		private readonly warehouseConverter: WarehouseConverter,
		private readonly createWarehouseConverter: CreateWarehouseConverter,
		private readonly warehouseItemService: WarehouseItemService
	) {
	}

	async getByCustomerId(customerId: number): Promise<WarehouseResponse[]> {
		let warehouses = await this.warehouseRepository.find({ where: { customerId: customerId } });
		let warehouseResponses = this.warehouseConverter.convertArray(warehouses);
		for (const w of warehouseResponses) {
			await this.warehouseItemService.countOccupiedUnits(w.id).then(unitsObj => {
				w.availableCapacity = Number(unitsObj["units"]);
			});
		}
		return warehouseResponses;
	}

	getByCustomerIdAndWarehouseId(customerId: number, warehouseId: number): Promise<Warehouse> {
		return this.warehouseRepository.findOne({
			where: {
				id: warehouseId,
				customerId: customerId
			}
		});
	}

	async create(warehouse: Warehouse): Promise<Warehouse> {
		await this.addressRepository.save(warehouse.address).then(a => {
			warehouse.addressId = Number(a.id);
		});
		return this.warehouseRepository.save(warehouse);
	}

	deleteEmptyByCustomerIdAndWarehouseIdIn(customerId: number, warehouseIds: number[]) {
		let warehousesWithItemsIds;
		this.warehouseItemRepository.createQueryBuilder("wi")
			.select("wi.warehouse.id", "ids")
			.where("wi.warehouse.id IN (:warehouseIds)", { warehouseIds })
			.getRawMany()
			.then(idsObj => {
				console.log(idsObj);
				warehousesWithItemsIds = idsObj["ids"];
			});

		let warehousesWithApplicationsIds;
		this.applicationRepository.createQueryBuilder("a")
			.select("a.srcWarehouse.id")
			.where("a.status <> 'FINISHED_PROCESSING'") //todo replace status with appropriate constant
			.andWhere("a.srcWarehouse.id IN (:warehouseIds)", { warehouseIds })
			.getRawMany()
			.then(ids => warehousesWithApplicationsIds = ids);

		let warehousesToDeleteIds;
		this.warehouseRepository.createQueryBuilder("w")
			.select("w.id")
			.innerJoin(WarehouseItem, "wi", "wi.warehouse.id = w.id")
			.where("w.customerId = :customerId", { customerId })
			.andWhereInIds(warehouseIds)
			.andWhere("w.id NOT IN (:withItems)", { warehousesWithItemsIds })
			.andWhere("w.id NOT IN (:withApplications)", { warehousesWithApplicationsIds })
			.getRawMany()
			.then(ids => warehousesToDeleteIds = ids);

		let warehouseAddressesIds;
		this.addressRepository.createQueryBuilder("a")
			.select("a.id")
			.innerJoin(Warehouse, "w", "w.address.id = a.id")
			.where("w.id IN (:warehouseIds)", { warehousesToDeleteIds })
			.getRawMany()
			.then(ids => warehouseAddressesIds = ids);

		this.warehouseRepository.createQueryBuilder()
			.whereInIds(warehousesToDeleteIds)
			.delete();

		this.addressRepository.createQueryBuilder()
			.whereInIds(warehouseAddressesIds)
			.delete();
	}
}
