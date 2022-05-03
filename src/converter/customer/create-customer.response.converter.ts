import {AppUser} from "../../domain/model/user/app.user";
import {Injectable} from "@nestjs/common";
import {AbstractConverter} from "../abstract.converter";
import {CreateCustomerResponse} from "../../domain/response/create-customer.response";

@Injectable()
export class CreateCustomerResponseConverter extends AbstractConverter<Promise<AppUser>, Promise<CreateCustomerResponse>> {

	async convert(source: Promise<AppUser>): Promise<CreateCustomerResponse> {
		const target = new CreateCustomerResponse();
		target.customerId = await source.then(appUser => appUser.customerId);
		target.userId = await source.then(appUser => appUser.id);
		return target;
	}
}
