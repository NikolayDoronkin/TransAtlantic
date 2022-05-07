import {Injectable} from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import {WriteOffItem} from "../../domain/model/write.off/write.off.item";
import {WriteOffItemCreateRequest} from "../../domain/request/write-off/write-off-item-create.request";

@Injectable()
export class WriteOffItemCreateConverter extends AbstractConverter<WriteOffItemCreateRequest, WriteOffItem> {

	convert(source: WriteOffItemCreateRequest): WriteOffItem {
		const target = new WriteOffItem();

		target.reasonId = source.reasonId;
		target.amount = source.amount;
		target.upc = source.upc;

		return target;
	}
}
