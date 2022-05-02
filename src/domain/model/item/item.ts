import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ItemCategory } from "./item.category";
import { Customer } from "../customer/customer";

@Entity("item")
export class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "i_name" })
	name: string;

	@Column({ name: "upc" })
	upc: number;

	@Column({ name: "price" })
	price: number;

	@ManyToOne(() => ItemCategory)
	@JoinColumn({ name: "category_id" })
	category: ItemCategory;

	@Column({ name: "unit_size" })
	unitSize: number;

	@ManyToOne(() => Customer, customer => customer.items)
	@JoinColumn({ name: "customer_id" })
	customer: Customer;
}
