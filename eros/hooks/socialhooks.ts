import { useFollowMutation } from "./backend/generated/graphql";

export const updateSidebar = (tag: string) => {
	const side = document.getElementById("sidebar");
	if (side) {
		const updateEvent = new CustomEvent("updateSidebar", { detail: tag });
		console.log("dispatched");

		side.dispatchEvent(updateEvent);
	}
};

export const followUser = async (id: string, target: string) => {
	const [followUser] = useFollowMutation();

	try {
		const response = await followUser({
			variables: {
				targetId: id,
			},
		});

		if (response && response.data) {
			if (response.data.follow.success === true) {
				updateSidebar(null);
			}
		}
	} catch (error) {
		console.log(error);
	}

	return;
};

export const unfollowUser = async (id: string) => {
	return;
};
