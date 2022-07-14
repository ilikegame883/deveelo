import fs from "fs";

import { UserType } from "src/models/User";
import Context from "../../context";

const uploadedFiles = [];
//on server start, fetch the names of the uploaded files

const uploadsResolvers = {
	Mutation: {
		async singleUpload(_parent: any, { file, type }: { file: any; type: string }, { res, payload }: Context) {
			const { createReadStream, filename, mimetype, encoding } = await file;

			const stream = createReadStream();
		},
	},
};

export default uploadsResolvers;
