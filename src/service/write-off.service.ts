import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {WriteOffAct} from "../domain/model/write.off/write.off.act";
import {WarehouseService} from "./warehouse.service";
import {ItemService} from "./item/item.service";
import {WriteOffItemService} from "./write-off.item.service";
import {WarehouseDispatcherService} from "./warehouse.dispatcher.service";
import {WriteOffReasonService} from "./write-off.reason.service";
import {SecurityUtils} from "../configuration/security.utils";
import {AppUserService} from "./app.user.service";
import {RolePermissionType} from "../domain/model/user/type/role-permission.type";
import {AppUser} from "../domain/model/user/app.user";
import {WarehouseItemService} from "./warehouse.item.service";
import {RuntimeException} from "@nestjs/core/errors/exceptions/runtime.exception";

@Injectable()
export class WriteOffService {

	constructor(
		@InjectRepository(WriteOffAct)
		private readonly writeOffActRepository: Repository<WriteOffAct>,
		private readonly warehouseDispatcherService: WarehouseDispatcherService,
		private readonly warehouseService: WarehouseService,
		private readonly itemService: ItemService,
		private readonly writeOffItemService: WriteOffItemService,
		private readonly writeOffReasonService: WriteOffReasonService,
		private readonly userService: AppUserService,
		private readonly warehouseItemService: WarehouseItemService,
	) {
	}

	async getAll(): Promise<WriteOffAct[]> {
		const writeOffActs = await this.findWriteOffActs(SecurityUtils.getCurrentUser());
		for (const act of writeOffActs) {
			const count = await this.writeOffItemService.countAmount(act.id);
			const items = await this.writeOffItemService.findByActId(act.id);
			let totalSum = 0;
			for (const item of items) {
				const price = await this.itemService.getPriceByItemId(item.itemId);
				totalSum += price*item.amount;
			}
			act.itemsCount = count;
			act.itemsTotalSum = totalSum;
		}

		return writeOffActs;
	}

	private async findWriteOffActs(appUser: AppUser): Promise<WriteOffAct[]> {
		if (this.userService.isValid(appUser, RolePermissionType.WRITE_OFF_READ_BY_WAREHOUSE)) {
			const warehouse = await this.warehouseDispatcherService
				.findWarehouseByDispatcherId(appUser.id);
			const dispatchers = await this.warehouseDispatcherService.findDispatchersByWarehouseId(warehouse.id);
			return await this.writeOffActRepository.find(
				{where: {reporterId: In(dispatchers.map(dispatcher => dispatcher.id))}}
			);
		} else if (this.userService.isValid(appUser, RolePermissionType.WRITE_OFF_READ_ALL)) {
			return this.writeOffActRepository.find();
		} else if (this.userService.isValid(appUser, RolePermissionType.WRITE_OFF_READ_BY_DRIVER)) {
			return this.writeOffActRepository.find({where: {reporterId: appUser.id}});
		}
	}

	async create(writeOffAct: WriteOffAct): Promise<number> {
		await this.userService.checkPermission(SecurityUtils.getCurrentUserId(), RolePermissionType.WRITE_OFF_WRITE);
		const writeOffItems = writeOffAct.items;
		writeOffAct.items = null;
		writeOffAct.reporterId = SecurityUtils.getCurrentUserId();
		writeOffAct.reporter = SecurityUtils.getCurrentUser();
		const writeOffActSaved = await this.writeOffActRepository.save(writeOffAct);

		for (const item of writeOffItems) {
			item.act = writeOffActSaved;
			item.actId = writeOffActSaved.id;
			const itemByUpc = await this.itemService.getItemByUpc(item.upc);
			const byItemId = await this.warehouseItemService.getByItemId(itemByUpc.id);
			if(item.amount > byItemId.amount) {
				throw new RuntimeException("Количество элементов, которые вы хотите списать, больше, чем на складе.");
			}
			byItemId.amount -= item.amount;
			await this.warehouseItemService.save(byItemId);
			item.itemId = itemByUpc.id;
			item.item = itemByUpc;
			item.reason = await this.writeOffReasonService.getById(item.reasonId);
		}

		await this.writeOffItemService.createItems(writeOffItems);
		return writeOffActSaved.id;
	}

	async countTotalPrice(writeOffAct: WriteOffAct): Promise<number> {
		let totalPrice = 0;
		for (const item of writeOffAct.items) {
			const itemByUpc = await this.itemService.getItemByUpc(item.upc);
			totalPrice += itemByUpc.price * item.amount;
		}
		return totalPrice;
	}
}
