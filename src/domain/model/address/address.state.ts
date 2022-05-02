import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AddressCity } from "./address.city";

@Entity("address_state")
export class AddressState {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "s_name" })
	name: string;

	@Column({ name: "s_code" })
	code: string;

	@OneToMany(() => AddressCity, city => city.state)
	cities: AddressCity[];
}
