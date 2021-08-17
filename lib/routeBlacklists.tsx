export const OnSidebarBlacklist = (route: string): boolean => {
	const blacklist = ["/login", "/register"];

	return !blacklist.includes(route);
};

export const OnActivityBlacklist = (route: string): boolean => {
	const blacklist = ["/login", "/register"];

	return !blacklist.includes(route);
};

export const OnNavBlacklist = (route: string): boolean => {
	const blacklist = ["/login", "/register"];

	return !blacklist.includes(route);
};
