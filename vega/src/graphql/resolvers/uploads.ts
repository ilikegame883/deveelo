import fs from "fs";
import path from "path";

import Context from "../../context";

const contentDir = "../../../public/uploads/";
let uploadedPfps: string[];
let uploadedBanners: string[];

//on server start, fetch the names of the uploaded files
fs.readdir(contentDir + "pfps", (err, files) => {
	if (err) {
		//log any error that occurs
		console.log(`Error fetching all pfp file names from dir: ${contentDir} \n The error was: \n ${err}`);
	} else {
		uploadedPfps ??= files;
		console.log("🦄 Profile picture filenames fetched and saved");
	}
});

fs.readdir(contentDir + "banners", (err, files) => {
	if (err) {
		//log any error that occurs
		console.log(`Error fetching all banner file names from dir: ${contentDir} \n The error was: \n ${err}`);
	} else {
		uploadedBanners ??= files;
		console.log("🍧 Banner filenames fetched and saved");
	}
});

const uploadsResolvers = {
	Mutation: {
		singleUpload: async (_parent: any, { file, type }: { file: any; type: string }, { payload }: Context) => {
			let existingUploads: string[];
			let savePath: string;

			switch (type) {
				case "pfp":
					existingUploads = uploadedPfps;
					savePath = contentDir + "pfps";
					break;
				case "banner":
					existingUploads = uploadedBanners;
					savePath = contentDir + "banners";
					break;
				default:
					throw new Error("No valid type --banner, pfp, etc-- passed in as a prop with this upload");
			}

			const { createReadStream, filename, mimetype, encoding } = await file;

			//split the name at the . and take the file extention
			const name = filename as string;
			const extension = name.split(".")[1];
			//use the user id as the name
			const saveName = `${payload?.id}.${extension}`;

			await new Promise((res) =>
				createReadStream()
					.pipe(fs.createWriteStream(path.join(__dirname, savePath, saveName)))
					.on("close", res)
			);

			switch (type) {
				case "pfp":
					uploadedPfps.push(saveName);
					break;
				case "banner":
					uploadedBanners.push(saveName);
					break;
				default:
					throw new Error("Error when saving new file name to variable array storage of uploaded files");
			}

			return {
				filename: saveName,
				mimetype: mimetype,
				encoding: encoding,
			};
		},
	},
};

export default uploadsResolvers;
