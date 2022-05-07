import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WriteOffAct } from "./write.off.act";
import { Item } from "../item/item";
import { WriteOffReason } from "./write.off.reason";

@Entity("write_off_item")
export class WriteOffItem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => WriteOffAct, act => act.items)
	@JoinColumn({ name: "act_id" })
	act: WriteOffAct;

	@Column({ name: "act_id" })
	actId: number;

	@ManyToOne(() => Item)
	@JoinColumn({ name: "item_id" })
	item: Item;

	@Column({ name: "item_id" })
	itemId: number;

	@Column({ name: "amount" })
	amount: number;

	@ManyToOne(() => WriteOffReason)
	@JoinColumn({ name: "reason_id" })
	reason: WriteOffReason;

	@Column({ name: "reason_id" })
	reasonId: number;

	upc: bigint;
}
