import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("write_off_reason")
export class WriteOffReason {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "r_name" })
	name: string;

	@Column({ name: "description" })
	description: string;
}
