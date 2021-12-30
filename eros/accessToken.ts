let accessToken = "";

export const setAccessToken = (s: string) => {
	accessToken = s;
	console.log(`Access token set to ${s}`);
};

export const getAccessToken = () => {
	return accessToken;
};
