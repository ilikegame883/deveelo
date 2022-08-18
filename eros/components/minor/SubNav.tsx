import subnavStyles from "../../styles/minor/subnav.module.css";
import IconButton from "../micro/IconButton";
import SubnavButton from "../micro/SubnavButton";

const SubNav = () => {
	return (
		<div className={subnavStyles.fadeWrapper}>
			<div className={subnavStyles.notch}>
				<div className={subnavStyles.buttonList}>
					<SubnavButton src="resources/home.svg" path="/" key="0" color="linear-gradient(135deg, #FFD74A 0%, #FFB129 100%)" width="4.219em" height="4.219em" padding={0.703} />
					{/* <IconButton src="resources/home.svg" width="4.219em" height="4.219em" paddingLR={0.703} paddingTB={0.703} /> */}
				</div>
			</div>
		</div>
	);
};

export default SubNav;
