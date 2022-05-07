import {Injectable} from "@nestjs/common";
import { AbstractConverter } from "../abstract.converter";
import {WriteOffAct} from "../../domain/model/write.off/write.off.act";
import {WriteOffActCreateRequest} from "../../domain/request/write-off/write-off-act-create.request";
import {WriteOffItemCreateConverter} from "./write-off-item-create.converter";

@Injectable()
export class WriteOffActCreateRequestConverter extends AbstractConverter<WriteOffActCreateRequest, WriteOffAct> {

	constructor(
		private readonly writeOffItemCreateConverter: WriteOffItemCreateConverter,
	) {
		super();
	}

	convert(source: WriteOffActCreateRequest): WriteOffAct {
		const target = new WriteOffAct();
		target.actDate = new Date();
		target.items = this.writeOffItemCreateConverter.convertArray(source.writeOffItems);
		return target;
	}
}
