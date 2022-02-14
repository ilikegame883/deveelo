export const searchUsers = async (str: string) => {
	if (!str) {
		return null;
	}

	try {
		const url = process.env.NODE_ENV === "production" ? "https://vega-deployment.herokuapp.com/search?name=" : "http://localhost:4000/search?name=";
		const searchUrl = url + str;
		const request = await fetch(searchUrl, { mode: "cors" });
		const users = request.json;
		return users;
	} catch (err) {
		console.error(err);
	}
};
