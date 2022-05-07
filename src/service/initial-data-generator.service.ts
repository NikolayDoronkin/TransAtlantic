import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserPermission } from "../domain/model/user/user.permission";
import { In, Repository } from "typeorm";
import { RolePermissionType } from "../domain/model/user/type/role-permission.type";
import { SystemUserRoleType } from "../domain/model/user/type/system-user-role.type";
import { UserRole } from "../domain/model/user/user.role";
import { RolePermission } from "../domain/model/user/role.permission";
import { UserStatus } from "../domain/model/user/user.status";
import { UserStatusType } from "../domain/model/user/type/user-status.type";

@Injectable()
export class InitialDataGeneratorService implements OnModuleInit {
	constructor(
		@InjectRepository(UserPermission)
		private readonly userPermissionRepository: Repository<UserPermission>,

		@InjectRepository(UserRole)
		private readonly userRoleRepository: Repository<UserRole>,

		@InjectRepository(RolePermission)
		private readonly rolePermissionRepository: Repository<RolePermission>,

		@InjectRepository(UserStatus)
		private readonly UserStatusRepository: Repository<UserStatus>
	) {
	}

	async onModuleInit() {
		this.loadPermissions();
		this.loadRoles();
		await this.loadRolesPermissions();
		this.loadUserStatus();
	}

	loadPermissions(): void {
		Object.keys(RolePermissionType)
			.filter(item => isNaN(Number(item)))
			.forEach(permissionType => {
				this.userPermissionRepository.findOne({ where: { name: permissionType } })
					.then(userPermission => {
						if (userPermission == undefined) {
							this.userPermissionRepository.save(new UserPermission(permissionType));
						}
					});
			});
	}

	loadRoles(): void {
		Object.values(SystemUserRoleType)
			.forEach(roleType => {
				this.userRoleRepository.findOne({ where: { roleName: roleType.name } })
					.then(userRole => {
						if (userRole == undefined) {
							this.userRoleRepository.save(new UserRole(roleType.name));
						}
					});
			});
	}

	async loadRolesPermissions() {
		for (const role of Object.values(SystemUserRoleType)) {
			const roleName = role.name;
			const permissionNames = role.permissions.map(index => RolePermissionType[index]);

			const permissions = await this.userPermissionRepository.find({
				where: {
					name: In(permissionNames)
				}
			});

			for (const permission of permissions) {
				const rolePermission = new RolePermission();

				rolePermission.role = await this.userRoleRepository.findOne({
					where: {
						roleName: roleName
					}
				});
				rolePermission.permission = permission;

				const existedRolePermission = this.rolePermissionRepository.findOne({
					where: {
						role: rolePermission.role,
						permission: rolePermission.permission
					}
				});

				if (existedRolePermission == undefined) {
					await this.rolePermissionRepository.save(rolePermission);
				}
			}
		}
	}

	private loadUserStatus() {
		Object.keys(UserStatusType)
			.filter(item => isNaN(Number(item)))
			.forEach(status => {
				this.UserStatusRepository.findOne({ where: { statusName: status } })
					.then(userStatus => {
						if (userStatus == undefined) {
							this.UserStatusRepository.save(new UserStatus(status));
						}
					})
			})
	}
}
