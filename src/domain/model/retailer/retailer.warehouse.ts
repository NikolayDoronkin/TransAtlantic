import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Retailer } from "./retailer";
import { Address } from "../address/address";
import { Application } from "../application/application";

@Entity("retailer_warehouse")
export class RetailerWarehouse {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "w_name" })
	name: string;

	@OneToOne(() => Address)
	@JoinColumn({ name: "address_id" })
	address: Address;

	@ManyToOne(() => Retailer, retailer => retailer.warehouses)
	@JoinColumn({ name: "retailer_id" })
	retailer: Retailer;

	@OneToMany(() => Application, application => application.dest_warehouse)
	applications: Application[];
}
