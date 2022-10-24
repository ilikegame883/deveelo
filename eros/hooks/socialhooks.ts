//refresh sidebar after profile editting to immediately show
//the new banner, pfp, or text-based account details w/o page reload
export const updateSidebar = (tag: string) => {
	const side = document.getElementById("sidebar");
	if (side) {
		const updateEvent = new CustomEvent("updateSidebar", { detail: tag });
		console.log("dispatched");

		side.dispatchEvent(updateEvent);
	}
};

//clear fields & switch to share after posting
export const updatePostArea = (newscreen: "afterpost" | "reset", imageName: string) => {
	const postarea = document.getElementById("postarea");
	if (postarea) {
		const updateEvent = new CustomEvent("updatePostArea", { detail: newscreen + "|" + imageName });
		console.log("dispatched");

		postarea.dispatchEvent(updateEvent);
	}
};
