import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WriteOffItem } from "./write.off.item";
import { AppUser } from "../user/app.user";

@Entity("write_off_act")
export class WriteOffAct {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "date", name: "act_date" })
	actDate: string;

	@ManyToOne(() => AppUser)
	@JoinColumn({ name: "reporter_id" })
	reporter: AppUser;

	@OneToMany(() => WriteOffItem, item => item.act)
	items: WriteOffItem[];
}
