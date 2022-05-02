import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePermission } from "./role.permission";

@Entity("user_role")
export class UserRole {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "r_name" })
	name: string;

	@Column({ name: "description" })
	description: string;

	@OneToMany(() => RolePermission, rolePermission => rolePermission.role)
	rolePermissions: RolePermission[];
}
