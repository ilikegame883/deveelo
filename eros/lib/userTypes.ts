//the user data publicly availiable through server routes, no sensitive data
export interface PublicUserType {
	_id: string;
	account: {
		tag: string;
		username: string;
		createdAt: string;
		lastOnline: string;
		private: boolean;
	};
	status: "online" | "idle" | "dnd" | "offline";
}
