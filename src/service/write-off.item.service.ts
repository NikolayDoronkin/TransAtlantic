import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {WriteOffItem} from "../domain/model/write.off/write.off.item";

@Injectable()
export class WriteOffItemService {

	constructor(
		@InjectRepository(WriteOffItem)
		private readonly writeOffItemRepository: Repository<WriteOffItem>,
	) {
	}

	async findByActId(actId: number): Promise<WriteOffItem[]> {
		return this.writeOffItemRepository.find({where: {actId: actId}});
	}

	async countAmount(actId: number): Promise<number> {
		return this.writeOffItemRepository.createQueryBuilder("item")
			.select("SUM(item.amount)", "sum")
			.where("item.actId=:actId", {actId: actId})
			.getRawOne();
	}

	async createItems(writeOffItems: WriteOffItem[]): Promise<WriteOffItem[]> {
		return this.writeOffItemRepository.save(writeOffItems);
	}
}
