import sideStyles from "../styles/sideImage.module.css";

const SideImage = ({ source }: { source: string }) => {
	return (
		<div className={sideStyles.imageContainer}>
			<p>testing 123</p>
		</div>
	);
};

export default SideImage;
