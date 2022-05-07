import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { SecurityUtils } from "../security.utils";
import { AppUserService } from "../../service/app.user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly appUserService: AppUserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'SECRET'
		});
	}

	async validate(payload: any) {
		SecurityUtils.setCurrentUser(await this.appUserService.getById(payload.id));

		return {
			id: payload.id,
			email: payload.email,
			password: payload.password
		}
	}
}
