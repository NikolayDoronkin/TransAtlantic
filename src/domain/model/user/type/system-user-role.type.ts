import { RolePermissionType } from "./role-permission.type";

export class SystemUserRoleType {
	static readonly SYSTEM_ADMIN = {
		name: "Системный администратор",
		permissions: [
			RolePermissionType.CUSTOMERS_WRITE,
			RolePermissionType.CUSTOMERS_READ
		]
	};
	static readonly ADMIN = {
		name: "Администратор",
		permissions: [
			RolePermissionType.ACCOUNT_READ,
			RolePermissionType.ACCOUNT_WRITE,
			RolePermissionType.EMPLOYEES_READ,
			RolePermissionType.EMPLOYEES_WRITE,
			RolePermissionType.WAREHOUSES_WRITE,
			RolePermissionType.WAREHOUSES_READ,
			RolePermissionType.CARS_WRITE,
			RolePermissionType.CARS_READ
		]
	};
	static readonly DISPATCHER = {
		name: "Диспетчер",
		permissions: [
			RolePermissionType.ACCOUNT_READ,
			RolePermissionType.ACCOUNT_WRITE,
			RolePermissionType.ITEMS_WRITE,
			RolePermissionType.ITEMS_READ,
			RolePermissionType.WAREHOUSE_ITEMS_WRITE,
			RolePermissionType.WAREHOUSE_ITEMS_READ,
			RolePermissionType.ALL_APPLICATIONS_READ,
			RolePermissionType.DISPATCHING_APPLICATIONS_READ,
			RolePermissionType.ALL_APPLICATIONS_WRITE,
			RolePermissionType.WRITE_OFF_READ_BY_WAREHOUSE,
			RolePermissionType.WRITE_OFF_WRITE,
			RolePermissionType.WAREHOUSES_READ,
			RolePermissionType.STATE_TAXES_READ
		]
	};
	static readonly LOGISTICS_SPECIALIST = {
		name: "Логистический специалист",
		permissions: [
			RolePermissionType.DISPATCHING_APPLICATIONS_READ,
			RolePermissionType.DISPATCHING_APPLICATIONS_WRITE,
			RolePermissionType.ACCOUNT_READ,
			RolePermissionType.ACCOUNT_WRITE,
			RolePermissionType.ALL_WAYBILLS_READ,
			RolePermissionType.ALL_WAYBILLS_WRITE,
			RolePermissionType.WAREHOUSES_READ,
			RolePermissionType.CARS_READ,
			RolePermissionType.EMPLOYEES_READ
		]
	};
	static readonly DRIVER = {
		name: "Водитель",
		permissions: [
			RolePermissionType.ACCOUNT_READ,
			RolePermissionType.ACCOUNT_WRITE,
			RolePermissionType.WRITE_OFF_READ_BY_DRIVER,
			RolePermissionType.WRITE_OFF_WRITE
		]
	};
	static readonly DIRECTOR = {
		name: "Директор",
		permissions: [
			RolePermissionType.ACCOUNT_READ,
			RolePermissionType.ACCOUNT_WRITE,
			RolePermissionType.WRITE_OFF_READ_ALL,
			RolePermissionType.CATEGORIES_WRITE,
			RolePermissionType.CATEGORIES_READ
		]
	};
}
