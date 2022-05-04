import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "../domain/model/car/car";
import { Repository } from "typeorm";

@Injectable()
export class CarService {
	constructor(
		@InjectRepository(Car)
		private readonly carRepository: Repository<Car>,
	) {
	}

	async getByCustomerId(customerId: number): Promise<Car[]> {
		return await this.carRepository.find({ where: { customerId: customerId } });
	}
}
