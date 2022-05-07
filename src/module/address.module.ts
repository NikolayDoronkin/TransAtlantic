import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressState } from "../domain/model/address/address.state";
import { AddressCity } from "../domain/model/address/address.city";
import { Address } from "../domain/model/address/address";
import { AddressConverter } from "../converter/address.converter";
import { CreateAddressConverter } from "../converter/create.address.converter";

@Module({
	imports: [
		TypeOrmModule.forFeature([AddressState, AddressCity, Address])
	],
	controllers: [],
	providers: [AddressConverter, CreateAddressConverter],
	exports: []
})
export class AddressModule {
}
