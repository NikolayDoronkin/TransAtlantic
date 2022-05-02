import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "../car/car";
import { User } from "../user/user";
import { WaybillStatus } from "./waybill.status";
import { Application } from "../application/application";

@Entity("waybill")
export class Waybill {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "w_number" })
	number: number;

	@ManyToOne(() => Car)
	@JoinColumn({ name: "car_id" })
	car: Car;

	@ManyToOne(() => User)
	@JoinColumn({ name: "driver_id" })
	driver: User;

	@ManyToOne(() => User)
	@JoinColumn({ name: "creator_id" })
	creator: User;

	@Column({ type: "timestamptz", name: "create_time" })
	createTime: Date;

	@ManyToOne(() => User)
	@JoinColumn({ name: "last_editor_id" })
	lastEditor: User;

	@Column({ type: "timestamptz", name: "last_edit_time" })
	lastEditTime: Date;

	@ManyToOne(() => WaybillStatus)
	@JoinColumn({ name: "state_id" })
	status: WaybillStatus;

	@OneToMany(() => Application, application => application.waybill)
	applications: Application[];
}
