import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Warehouse } from "../warehouse/warehouse";
import { RetailerWarehouse } from "../retailer/retailer.warehouse";
import { ApplicationStatus } from "./application.status";
import { Waybill } from "../waybill/waybill";
import { ApplicationItem } from "./application.item";
import { AppUser } from "../user/app.user";

@Entity("application")
export class Application {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "a_number" })
	number: number;

	@ManyToOne(() => Warehouse, warehouse => warehouse.applications)
	@JoinColumn({ name: "src_warehouse_id" })
	srcWarehouse: Warehouse;

	@Column({name: "src_warehouse_id" })
	srcWarehouseId: number;

	@ManyToOne(() => RetailerWarehouse, warehouse => warehouse.applications)
	@JoinColumn({ name: "dest_warehouse_id" })
	destWarehouse: RetailerWarehouse;

	@ManyToOne(() => AppUser)
	@JoinColumn({ name: "creator_id" })
	creator: AppUser;

	@Column({ type: "date", name: "create_time" })
	createTime: string;

	@ManyToOne(() => AppUser)
	@JoinColumn({ name: "last_editor_id" })
	lastEditor: AppUser;

	@Column({ type: "date", name: "last_edit_time" })
	lastEditTime: string;

	@ManyToOne(() => ApplicationStatus, status => status.applications)
	@JoinColumn({ name: "status_id" })
	status: ApplicationStatus;

	@ManyToOne(() => Waybill, waybill => waybill.applications)
	@JoinColumn({ name: "waybill_id" })
	waybill: Waybill;

	@Column({ name: "waybill_seq_number" })
	waybillSeqNumber: number;

	@OneToMany(() => ApplicationItem, item => item.application)
	items: ApplicationItem[];
}
