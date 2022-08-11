import { SortUserType } from "../lib/userTypes";

//closer to index 0 should be placed higher
const ranking = ["online", "idle", "dnd", "offline"];

export const sortByStatus = (users: SortUserType[]) => {
	//if be is a lower index, move b up
	return users.sort((a, b) => (ranking.indexOf(a.status) > ranking.indexOf(b.status) ? 1 : -1));
};

export const sortById = (users: SortUserType[]) => {
	//smaller ids are favored: this does not mean anything though, ids are random
	return users.sort((a, b) => (parseInt(a._id) > parseInt(b._id) ? 1 : -1));
};

export const sortByStatusAndId = (users: SortUserType[]) => {
	//if the status is of a lower index, move it up (i.e. online moves above idle)
	//if the statuses are equal, then sort by user id
	//if the status is of a higher index, it is properly ranked below
	return users.sort((a, b) => (ranking.indexOf(a.status) > ranking.indexOf(b.status) ? 1 : a.status === b.status ? (parseInt(a._id) > parseInt(b._id) ? 1 : -1) : -1));
};
