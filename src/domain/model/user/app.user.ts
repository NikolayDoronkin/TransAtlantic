import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.role";
import { Customer } from "../customer/customer";
import { UserStatus } from "./user.status";
import { Address } from "../address/address";

@Entity("app_user")
export class AppUser {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "first_name" })
	firstName: string;

	@Column({ name: "last_name" })
	lastName: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	birthday: Date;

	@ManyToOne(() => UserRole, userRole => userRole.users)
	@JoinColumn({ name: "role_id" })
	role: UserRole;

	@Column({ name: "role_id" })
	roleId: number;

	@ManyToOne(() => Customer, customer => customer.users)
	@JoinColumn({ name: "customer_id" })
	customer: Customer;

	@Column({ name: "customer_id" })
	customerId: number;

	@ManyToOne(() => UserStatus, userStatus => userStatus.users)
	@JoinColumn({ name: "status_id" })
	status: UserStatus;

	@Column({ name: "status_id" })
	statusId: number;

	@ManyToOne(() => Address, address => address.users)
	@JoinColumn({ name: "address_id" })
	address: Address;

	@Column({ name: "address_id" })
	addressId: number;
}
