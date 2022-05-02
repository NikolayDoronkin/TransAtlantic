import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Warehouse } from "../warehouse/warehouse";
import { RetailerWarehouse } from "../retailer/retailer.warehouse";
import { User } from "../user/user";
import { ApplicationStatus } from "./application.status";
import { Waybill } from "../waybill/waybill";
import { ApplicationItem } from "./application.item";

@Entity("application")
export class Application {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "a_name" })
	number: number;

	@ManyToOne(() => Warehouse, warehouse => warehouse.applications)
	@JoinColumn({ name: "src_warehouse_id" })
	src_warehouse: Warehouse;

	@ManyToOne(() => RetailerWarehouse, warehouse => warehouse.applications)
	@JoinColumn({ name: "dest_warehouse_id" })
	dest_warehouse: RetailerWarehouse;

	@ManyToOne(() => User)
	@JoinColumn({ name: "creator_id" })
	creator: User;

	@Column({ type: "date", name: "create_time" })
	createTime: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: "last_editor_id" })
	last_editor: User;

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
