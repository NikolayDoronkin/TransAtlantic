import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "./application";
import { Item } from "../item/item";

@Entity("application_item")
export class ApplicationItem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Application, application => application.items)
	@JoinColumn({ name: "application_id" })
	application: Application;

	@ManyToOne(() => Item)
	@JoinColumn({ name: "item_id" })
	item: Item;

	@Column({ name: "amount" })
	amount: number;

	@Column({ name: "total_price" })
	totalPrice: number;

	@Column({ name: "placed_count" })
	placedCount: number;
}
