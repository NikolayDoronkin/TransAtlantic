import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "../domain/model/item/item";
import { ItemCategory } from "../domain/model/item/item.category";
import { Customer } from "../domain/model/customer/customer";
import { ItemController } from "../controller/item.controller";
import { ItemService } from "../service/item.service";
import { ItemConverter } from "../converter/item/item.converter";

@Module({
	imports: [
		TypeOrmModule.forFeature([Item, ItemCategory, Customer])
	],
	controllers: [ItemController],
	providers: [ItemService, ItemConverter],
	exports: []
})
export class ItemModule {
}
