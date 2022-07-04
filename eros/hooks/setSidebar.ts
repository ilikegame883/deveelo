export const setSideBarByTag = (tag: string): void => {
	window.localStorage.setItem("side_prof", tag);

	//This is used to keep track of the modifications to the display follower count
	//Serves as a way to know the last modification, will be used by sidebar
	//will store last 2 actions: lastfmod = +|batu~-|batu which is ["+", "-"] (- is most recent)
	window.localStorage.setItem("lastfmod", "");
	window.localStorage.setItem("fmod", "");
};

export interface FmodFetch {
	notset: boolean;
	direction: string;
	tag: string;
}

export interface Fmod {
	set: boolean;
	value: number;
	tag: string;
}
