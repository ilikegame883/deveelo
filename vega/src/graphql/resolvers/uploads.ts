import fs from "fs";
import path from "path";
import { validateFileExtensions } from "../../util/validators";
//import sharp from "sharp";

import Context from "../../context";
import { convertToWebpBanner, convertToWebpPfp } from "../../util/imageOpts";
import { UserInputError } from "apollo-server-express";

const contentDir = "public/uploads/";
let uploadedPfps: string[];
let uploadedBanners: string[];

//on server start, fetch the names of the uploaded files
fs.readdir(contentDir + "pfps/", (err, files) => {
	if (err) {
		//log any error that occurs
		console.log(`Error fetching all pfp file names from dir: ${contentDir} \n The error was: \n ${err}`);
	} else {
		uploadedPfps ??= files;

		console.log("🦄 Profile picture filenames fetched and saved");
	}
});

fs.readdir(contentDir + "banners/", (err, files) => {
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
			//variables which control the different behaviors of the types of uploads
			//let existingUploads: string[];
			let savePath: string;
			let imageOptimization: any;

			switch (type) {
				case "pfp":
					//existingUploads = uploadedPfps;
					imageOptimization = convertToWebpPfp;
					savePath = contentDir + "pfps";
					break;
				case "banner":
					//existingUploads = uploadedBanners;
					imageOptimization = convertToWebpBanner;
					savePath = contentDir + "banners";
					break;
				default:
					throw new Error("No valid type --banner, pfp, etc-- passed in as a prop with this upload");
			}

			const { createReadStream, filename, mimetype, encoding } = await file;

			//split the name at the . and take the file extention
			const name = filename as string;
			const extension = name.split(".")[1];

			//check if we recieved a supported image format, this is a secondary check
			//since the frontend only allows these in the file exporter, but if a direct req is sent?
			const { errors, valid } = validateFileExtensions(extension, ["png", "jpg", "jpeg", "webp", "jfif"]);
			if (!valid) {
				throw new UserInputError(errors.file);
			}

			//use the user id as the name
			const saveName = `boomie2.webp`; // `${payload?.id}.webp`;

			await new Promise((res) =>
				createReadStream()
					.pipe(imageOptimization)
					.pipe(fs.createWriteStream(path.join(savePath, saveName)))
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
