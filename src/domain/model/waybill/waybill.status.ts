import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("waybill_status")
export class WaybillStatus {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "s_name" })
	name: string;

	@Column({ name: "description" })
	description: string;
}
