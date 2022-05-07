import { AppUser } from "../domain/model/user/app.user";

export class SecurityUtils {
	private static currentUser: AppUser;

	static getCurrentUserId() {
		return this.currentUser.id;
	}

	static getCurrentUser() {
		return this.currentUser;
	}

	static setCurrentUser(user: AppUser) {
		this.currentUser = user;
	}
}
