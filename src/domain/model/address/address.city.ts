import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AddressState } from "./address.state";
import { Address } from "./address";

@Entity("address_city")
export class AddressCity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "c_name" })
	name: string;

	@ManyToOne(() => AddressState, addressState => addressState.cities)
	@JoinColumn({ name: "state_id" })
	state: AddressState;

	@OneToMany(() => Address, address => address.city)
	addresses: Address[];
}
