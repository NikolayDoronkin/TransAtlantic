export class SecurityUtils {
	private static currentUserId: number;

	static getCurrentUserId() {
		return this.currentUserId
	}

	static setCurrentUserId(id: number) {
		this.currentUserId = id;
	}
}
