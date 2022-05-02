import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.role";
import { UserPermission } from "./user.permission";

@Entity("role_permission")
export class RolePermission {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => UserRole, userRole => userRole.rolePermissions)
	@JoinColumn({ name: "role_id" })
	role: UserRole;

	@ManyToOne(() => UserPermission, userPermission => userPermission.rolePermissions)
	@JoinColumn({ name: "permission_id" })
	permission: UserPermission;
}
