import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "../address/address";
import { Customer } from "../customer/customer";
import { WarehouseItem } from "./warehouse.item";
import { Application } from "../application/application";

@Entity("warehouse")
export class Warehouse {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "w_name" })
	name: string;

	@OneToOne(() => Address)
	@JoinColumn({ name: "address_id" })
	address: Address;

	@Column({ name: "total_capacity" })
	totalCapacity: string;

	@ManyToOne(() => Customer, customer => customer.warehouses)
	@JoinColumn({ name: "customer_id" })
	customer: Customer;

	@OneToMany(() => Application, application => application.src_warehouse)
	applications: Application[];

	@OneToMany(() => WarehouseItem, item => item.warehouse)
	items: WarehouseItem[];
}
