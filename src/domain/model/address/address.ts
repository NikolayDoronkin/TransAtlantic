import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AddressCity } from "./address.city";
import { AppUser } from "../user/app.user";

@Entity("address")
export class Address {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => AddressCity, addressCity => addressCity.addresses)
	@JoinColumn({ name: "city_id" })
	city: AddressCity;

	@Column({ name: "city_id" })
	cityId: number;

	@Column({ name: "address_line_1" })
	addressLine1: string;

	@Column({ name: "address_line_2" })
	addressLine2: string;

	@OneToMany(() => AppUser, appUser => appUser.address)
	users: Address[];
}
