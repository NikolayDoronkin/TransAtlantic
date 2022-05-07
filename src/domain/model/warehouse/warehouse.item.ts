import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Warehouse } from "./warehouse";
import { Item } from "../item/item";

@Entity("warehouse_item")
export class WarehouseItem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Warehouse, warehouse => warehouse.items)
	@JoinColumn({ name: "warehouse_id" })
	warehouse: Warehouse;

	@ManyToOne(() => Item)
	@JoinColumn({ name: "item_id" })
	item: Item;

	@Column({ name: "item_id" })
	itemId: number;

	@Column({ name: "amount" })
	amount: number;
}
