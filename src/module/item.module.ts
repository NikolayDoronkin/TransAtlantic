import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "../domain/model/item/item";
import { ItemCategory } from "../domain/model/item/item.category";

@Module({
	imports: [
		TypeOrmModule.forFeature([Item, ItemCategory])
	],
	controllers: [],
	providers: [],
	exports: []
})
export class ItemModule {
}
