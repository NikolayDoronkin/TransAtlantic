import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../domain/model/user/user";
import { UserStatus } from "../domain/model/user/user.status";
import { UserRole } from "../domain/model/user/user.role";
import { UserPermission } from "../domain/model/user/user.permission";
import { RolePermission } from "../domain/model/user/role.permission";

@Module({
	imports: [
		TypeOrmModule.forFeature([User, UserStatus, UserRole, UserPermission, RolePermission])
	],
	controllers: [],
	providers: [],
	exports: []
})
export class UserModule {
}
