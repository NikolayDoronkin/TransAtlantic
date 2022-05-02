import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppUser } from "./app.user";

@Entity("user_role")
export class UserRole {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "r_name" })
	roleName: string;

	@Column()
	description: string;

	@OneToMany(() => AppUser, appUser => appUser.role)
	users: AppUser[];
}
