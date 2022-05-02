import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePermission } from "./role.permission";

@Entity("user_permission")
export class UserPermission {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "p_name" })
	name: string;

	@OneToMany(() => RolePermission, rolePermission => rolePermission.permission)
	rolePermissions: RolePermission[];
}
