import { Injectable } from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import {WriteOffAct} from "../../domain/model/write.off/write.off.act";
import {WriteOffResponse} from "../../domain/response/write-off.response";

@Injectable()
export class WriteOffActResponseConverter extends AbstractConverter<WriteOffAct, WriteOffResponse> {
	convert(source: WriteOffAct): WriteOffResponse {
		const target = new WriteOffResponse();

		target.id = source.id;
		target.dateTime = source.actDate.toString();
		target.totalAmount = source.itemsTotalSum;
		target.totalSum = source.itemsTotalSum;
		return target;
	}
}
