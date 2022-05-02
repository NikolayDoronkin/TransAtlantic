import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer";
import { RetailerStatus } from "./retailer.status";
import { RetailerWarehouse } from "./retailer.warehouse";

@Entity("retailer")
export class Retailer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "r_name" })
	name: string;

	@Column({ name: "description" })
	description: string;

	@ManyToOne(() => Customer, customer => customer.retailers)
	@JoinColumn({ name: "customer_id" })
	customer: Customer;

	@ManyToOne(() => RetailerStatus, status => status.retailers)
	@JoinColumn({ name: "status_id" })
	status: RetailerStatus;

	@OneToMany(() => RetailerWarehouse, warehouse => warehouse.retailer)
	warehouses: RetailerWarehouse[];
}
