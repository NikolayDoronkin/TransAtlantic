import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "../car/car";
import { WaybillStatus } from "./waybill.status";
import { Application } from "../application/application";
import { AppUser } from "../user/app.user";

@Entity("waybill")
export class Waybill {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "w_number" })
	number: number;

	@ManyToOne(() => Car)
	@JoinColumn({ name: "car_id" })
	car: Car;

	@ManyToOne(() => AppUser)
	@JoinColumn({ name: "driver_id" })
	driver: AppUser;

	@ManyToOne(() => AppUser)
	@JoinColumn({ name: "creator_id" })
	creator: AppUser;

	@Column({ type: "timestamptz", name: "create_time" })
	createTime: Date;

	@ManyToOne(() => AppUser)
	@JoinColumn({ name: "last_editor_id" })
	lastEditor: AppUser;

	@Column({ type: "timestamptz", name: "last_edit_time" })
	lastEditTime: Date;

	@ManyToOne(() => WaybillStatus)
	@JoinColumn({ name: "state_id" })
	status: WaybillStatus;

	@OneToMany(() => Application, application => application.waybill)
	applications: Application[];
}
