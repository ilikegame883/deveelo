import sharp from "sharp";

//good default quality is 75
export const convertToWebpPfp = sharp()
	.resize({
		width: 400,
		height: 400,
		fit: "cover",
	})
	.webp({ quality: 75 });
