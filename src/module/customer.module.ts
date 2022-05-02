import { Module } from "@nestjs/common";
import { CustomerController } from "../controller/customer.controller";
import { CustomerService } from "../service/customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "../domain/model/customer/customer";
import { CustomerStatus } from "../domain/model/customer/customer.status";

@Module({
	imports: [
		TypeOrmModule.forFeature([Customer, CustomerStatus])
	],
	controllers: [CustomerController],
	providers: [CustomerService],
	exports: []
})
export class CustomerModule {
}
