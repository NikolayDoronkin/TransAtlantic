import {ApiProperty} from "@nestjs/swagger";

export class WriteOffItemCreateRequest {
	@ApiProperty({description: 'шрих код', example: "12356"})
	upc: bigint;
	@ApiProperty({description: 'айди причины списания', example: "1"})
	reasonId: number;
	@ApiProperty({description: 'количество элементов', example: "1"})
	amount: number;
}