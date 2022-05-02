import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppUser } from "./app.user";

@Entity("user_status")
export class UserStatus {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "s_name" })
	statusName: string;

	@Column()
	description: string;

	@OneToMany(() => AppUser, appUser => appUser.status)
	users: AppUser[];
}
