import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {WriteOffReason} from "../domain/model/write.off/write.off.reason";

@Injectable()
export class WriteOffReasonService {
	constructor(
		@InjectRepository(WriteOffReason)
		private readonly writeOffReasonRepository: Repository<WriteOffReason>
	) {
	}

	async getById(reasonId: number): Promise<WriteOffReason> {
		return await this.writeOffReasonRepository
			.findOne({ where: { id: reasonId } });
	}
}
