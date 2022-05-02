import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerStatus } from "./customer.status";
import { Car } from "../car/car";
import { Retailer } from "../retailer/retailer";
import { Warehouse } from "../warehouse/warehouse";
import { User } from "../user/user";
import { ItemCategory } from "../item/item.category";
import { Item } from "../item/item";

@Entity("customer")
export class Customer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "c_name" })
	name: string;

	@Column({ name: "registration_date" })
	registrationDate: Date;

	@ManyToOne(() => CustomerStatus, customerStatus => customerStatus.customers)
	@JoinColumn({ name: "status_id" })
	status: CustomerStatus;

	@OneToMany(() => Car, car => car.customer)
	cars: Car[];

	@OneToMany(() => Retailer, retailer => retailer.customer)
	retailers: Retailer[];

	@OneToMany(() => Warehouse, warehouse => warehouse.customer)
	warehouses: Warehouse[];

	@OneToMany(() => User, user => user.customer)
	users: User[];

	@OneToMany(() => ItemCategory, category => category.customer)
	categories: ItemCategory[];

	@ManyToOne(() => Item, item => item.customer)
	items: Item[];
}
