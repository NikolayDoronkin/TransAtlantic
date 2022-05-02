import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity("user_status")
export class UserStatus {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "s_name" })
	name: string;

	@Column({ name: "description" })
	description: string;

	@OneToMany(() => User, user => user.status)
	users: User[];
}
