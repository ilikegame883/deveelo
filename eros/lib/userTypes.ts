//the user data publicly availiable through server routes, no sensitive data
export interface PublicUserType {
	account: {
		tag: string;
		username: string;
		createdAt: string;
		lastOnline: string;
		private: boolean;
	};
	status: "online" | "idle" | "dnd" | "offline";
}

export interface SearchUserType {
	account: {
		tag: string;
		username: string;
		createdAt: string;
		lastOnline: string;
		private: boolean;
	};
	profile: {
		pictureUrl: string;
		badges: string[];
	};
	status: "online" | "idle" | "dnd" | "offline";
}

export interface SearchUserIdType {
	_id: string;
	account: {
		tag: string;
		username: string;
		createdAt: string;
		lastOnline: string;
		private: boolean;
	};
	profile: {
		pictureUrl: string;
		badges: string[];
	};
	status: "online" | "idle" | "dnd" | "offline";
}

export interface SearchAccountType {
	tag: string;
	username: string;
	createdAt: string;
	lastOnline: string;
	private: boolean;
}

export interface SearchProfileType {
	pictureUrl: string;
	badges: string[];
}

export interface SearchStatusType {
	status: "online" | "idle" | "dnd" | "offline";
}
