import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.role";
import { Customer } from "../customer/customer";
import { Address } from "../address/address";
import { UserStatus } from "./user.status";

@Entity("app_user")
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "first_name" })
	firstName: string;

	@Column({ name: "last_name" })
	lastName: string;

	@Column({ name: "email" })
	email: string;

	@Column({ name: "password" })
	password: string;

	@ManyToOne(() => UserRole)
	@JoinColumn({ name: "role_id" })
	role: UserRole;

	@ManyToOne(() => Customer, customer => customer.users)
	@JoinColumn({ name: "customer_id" })
	customer: Customer;

	@ManyToOne(() => Address)
	@JoinColumn({ name: "address_id" })
	address: Address;

	@Column({ type: "date", name: "birthday" })
	birthday: string;

	@ManyToOne(() => UserStatus, status => status.users)
	@JoinColumn({ name: "status_id" })
	status: UserStatus;
}
