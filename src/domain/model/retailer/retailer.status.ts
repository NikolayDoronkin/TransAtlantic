import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Retailer } from "./retailer";

@Entity("retailer_status")
export class RetailerStatus {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "s_name" })
	name: string;

	@Column({ name: "description" })
	description: string;

	@OneToMany(() => Retailer, retailer => retailer.status)
	retailers: Retailer[];
}
