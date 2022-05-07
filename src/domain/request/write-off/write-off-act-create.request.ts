import {ApiProperty} from "@nestjs/swagger";
import {WriteOffItemCreateRequest} from "./write-off-item-create.request";
import {IsArray, Validate} from "class-validator";

export class WriteOffActCreateRequest {
	@IsArray()
	@ApiProperty({
		description: 'элементы списания',
		type: [WriteOffItemCreateRequest]
	})
	writeOffItems: WriteOffItemCreateRequest[];
}