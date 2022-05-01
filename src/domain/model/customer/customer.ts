import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {CustomerStatus} from "./customer.status";

@Entity('customer')
export class Customer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({name: "c_name"})
	name: string;

	@Column({name: "registration_date"})
	registrationDate: Date;

	@ManyToOne(() => CustomerStatus, customerStatus => customerStatus.customers)
	@JoinColumn({name: "status_id"})
	status: CustomerStatus;

	@Column({name: "status_id"})
	statusId: number;
}
