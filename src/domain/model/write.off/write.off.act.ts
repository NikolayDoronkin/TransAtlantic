import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user";
import { WriteOffItem } from "./write.off.item";

@Entity("write_off_act")
export class WriteOffAct {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "date", name: "act_date" })
	actDate: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: "reporter_id" })
	reporter: User;

	@OneToMany(() => WriteOffItem, item => item.act)
	items: WriteOffItem[];
}
