import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { SecurityUtils } from "../security.utils";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'SECRET'
		});
	}

	async validate(payload: any) {
		SecurityUtils.setCurrentUserId(payload.id)

		return {
			id: payload.id,
			email: payload.email,
			password: payload.password
		}
	}
}
