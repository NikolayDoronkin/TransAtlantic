import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "../domain/model/item/item";
import { ItemCategory } from "../domain/model/item/item.category";
import { Customer } from "../domain/model/customer/customer";
import { ItemController } from "../controller/item.controller";
import { ItemService } from "../service/item/item.service";
import { ItemConverter } from "../converter/item/item.converter";
import { Car } from "../domain/model/car/car";
import { Warehouse } from "../domain/model/warehouse/warehouse";
import { CreateItemConverter } from "../converter/item/create-item.converter";
import { CarService } from "../service/car.service";
import { CustomerService } from "../service/customer.service";
import { WarehouseService } from "../service/warehouse.service";
import { ItemCategoryService } from "../service/item/item-category.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Item, ItemCategory, Customer, Car, Warehouse])
	],
	controllers: [ItemController],
	providers: [ItemService, ItemConverter, CreateItemConverter,
		CarService, CustomerService, WarehouseService, ItemCategoryService],
	exports: [CarService]
})
export class ItemModule {
}
