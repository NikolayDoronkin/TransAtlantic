import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerStatus } from "./customer.status";
import { AppUser } from "../user/app.user";
import { Car } from "../car/car";
import { Retailer } from "../retailer/retailer";
import { Warehouse } from "../warehouse/warehouse";
import { ItemCategory } from "../item/item.category";

@Entity("customer")
export class Customer {
	@PrimaryGeneratedColumn({type: 'bigint'})
	id: number;

	@Column({ name: "c_name" })
	name: string;

	@Column({ name: "registration_date" })
	registrationDate: Date;

	@ManyToOne(() => CustomerStatus, customerStatus => customerStatus.customers)
	@JoinColumn({ name: "status_id" })
	status: CustomerStatus;

	@Column({ name: "status_id" })
	statusId: number;

	@OneToMany(() => AppUser, appUser => appUser.customer)
	users: AppUser[];

	@OneToMany(() => Car, car => car.customer)
	cars: Car[];

	@OneToMany(() => Retailer, retailer => retailer.customer)
	retailers: Retailer[];

	@OneToMany(() => Warehouse, warehouse => warehouse.customer)
	warehouses: Warehouse[];

	@OneToMany(() => ItemCategory, category => category.customer)
	categories: ItemCategory[];

	/*@ManyToOne(() => Item, item => item.customer)
	items: Item[];*/
}
