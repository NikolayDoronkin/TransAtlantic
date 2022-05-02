import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "./application";

@Entity("application_status")
export class ApplicationStatus {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "s_name" })
	name: string;

	@Column({ name: "description" })
	description: string;

	@OneToMany(() => Application, application => application.status)
	applications: Application[];
}
