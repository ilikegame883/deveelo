import subnavStyles from "../../styles/minor/subnav.module.css";
import IconButton from "../micro/IconButton";

const SubNav = () => {
	return (
		<div className={subnavStyles.fadeWrapper}>
			<div className={subnavStyles.notch}>
				<div className={subnavStyles.buttonList}>
					<IconButton src="resources/home.svg" width="4.219em" height="4.219em" paddingLR={0.703} paddingTB={0.703} />
				</div>
			</div>
		</div>
	);
};

export default SubNav;
