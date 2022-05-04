import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "../exception/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
		const object = plainToClass(metadata.metatype, value);
		const errors = await validate(object);

		if (errors.length) {
			let message = errors.map(error => {
				return `${error.property} - ${Object.values(error.constraints).join(", ")}`;
			});

			throw new ValidationException(message);
		}
		return value;
	}
}
