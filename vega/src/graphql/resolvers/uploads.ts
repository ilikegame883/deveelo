import { UserType } from "src/models/User";
import Context from "../../context";

const uploadsResolvers = {
	Mutation: {
		async singleUpload(_parent: any, { file }: { file: any }, { res, payload }: Context) {
			const { createReadStream, filename, mimetype, encoding } = await file;

			const stream = createReadStream();
		},
	},
};

export default uploadsResolvers;
