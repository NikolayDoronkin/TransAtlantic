import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressState } from "../domain/model/address/address.state";
import { AddressCity } from "../domain/model/address/address.city";
import { Address } from "../domain/model/address/address";
import {AddressService} from "../service/address.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([AddressState, AddressCity, Address])
	],
	controllers: [],
	providers: [AddressService],
	exports: [AddressService]
})
export class AddressModule {
}
