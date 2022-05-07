import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Warehouse } from "./warehouse";
import {AppUser} from "../user/app.user";

@Entity("warehouse_dispatcher")
export class WarehouseDispatcher {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "warehouse_id" })
	warehouseId: number;

	@ManyToOne(() => Warehouse)
	@JoinColumn({ name: "warehouse_id" })
	warehouse: Warehouse;

	@Column({ name: "dispatcher_id" })
	dispatcherId: number;

	@ManyToOne(() => AppUser)
	@JoinColumn({ name: "dispatcher_id" })
	dispatcher: AppUser;
}
