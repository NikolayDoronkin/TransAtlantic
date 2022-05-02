import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer";

@Entity("item_category")
export class ItemCategory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "c_name" })
	name: string;

	@Column({ name: "tax_rate" })
	taxRate: number;

	@ManyToOne(() => Customer, customer => customer.categories)
	@JoinColumn({ name: "customer_id" })
	customer: Customer;
}
