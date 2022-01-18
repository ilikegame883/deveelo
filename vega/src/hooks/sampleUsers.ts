import User, { UserType } from "../models/User";

export const getRandomUser = async (onlyId: boolean): Promise<string | UserType> => {
	//eventually check for pro subscription
	const sampled: any = await User.aggregate([{ $match: { "profile.description": { $ne: "I'm new to Deveelo!" } } }, { $sample: { size: 1 } }]);
	const user: UserType = sampled;

	if (onlyId) {
		return user._id;
	} else {
		return user;
	}
};
