import Image from "next/image";

import sideStyles from "../styles/sideImage.module.css";

const images = [
	{
		source: "/banners/cityStreet.jpg",
		link: (
			<a className={sideStyles.credit} href="https://unsplash.com/@maxwbender?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">
				Photo by Max Bender on Unsplash
			</a>
		),
	},
	{
		source: "/banners/overlook.jpg",
		link: (
			<a className={sideStyles.credit} href="https://unsplash.com/@jeetdhanoa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">
				Photo by Jeet Dhanoa on Unsplash
			</a>
		),
	},
];

const SideImage = ({ route }: { route: string }) => {
	return (
		<div className={sideStyles.imageContainer}>
			{route === "/login" ? images[1].link : images[0].link}
			<Image className={sideStyles.picture} src={route === "/login" ? images[1].source : images[0].source} alt="city street" layout="fill" objectFit="cover" priority={true} />
		</div>
	);
};

export default SideImage;
