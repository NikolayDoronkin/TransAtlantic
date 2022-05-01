import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("app_user")
export class AppUser {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "first_name" })
	firstName: string;

	@Column({ name: "last_name" })
	lastName: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	birthday: Date;
}
