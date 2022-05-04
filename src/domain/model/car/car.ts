import { Address } from "../address/address";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer";

@Entity("car")
export class Car {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "c_number" })
	number: string;

	@ManyToOne(() => Address)
	@JoinColumn({ name: "last_address_id" })
	lastAddress: Address;

	@Column({ name: "total_capacity" })
	totalCapacity: number;

	@ManyToOne(() => Customer, customer => customer.cars)
	@JoinColumn({ name: "customer_id" })
	customer: Customer;

	@Column({ name: "customer_id" })
	customerId: number;
}
