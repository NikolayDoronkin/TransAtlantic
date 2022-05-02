import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressCity } from "./address.city";

@Entity("address")
export class Address {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => AddressCity, addressCity => addressCity.addresses)
	@JoinColumn({ name: "city_id" })
	city: AddressCity;

	@Column({ name: "address_line_1" })
	addressLine1: string;

	@Column({ name: "address_line_2" })
	addressLine2: string;
}
