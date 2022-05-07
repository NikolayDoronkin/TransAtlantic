import { AppUser } from "../domain/model/user/app.user";

export class SecurityUtils {
	private static currentUser: AppUser;

	static getCurrentUserId() {
		return this.currentUser.id;
	}

	static setCurrentUser(user: AppUser) {
		this.currentUser = user;
	}
}
