import subnavStyles from "../../styles/minor/subnav.module.css";
import IconButton from "../micro/IconButton";
import SubnavButton from "../micro/SubnavButton";

const SubNav = () => {
	return (
		<div className={subnavStyles.fadeWrapper}>
			<div className={subnavStyles.notch}>
				<div className={subnavStyles.buttonList}>
					<SubnavButton src="/resources/home.svg" path="/" key="0" color="linear-gradient(135deg, #FFD74A 0%, #FFB129 100%)" />
					<SubnavButton src="/resources/blog.svg" path="/devlogs" key="1" color="linear-gradient(135deg, #FFD74A 0%, #FFB129 100%)" />
					<SubnavButton src="/resources/groups.svg" path="/groups" key="2" color="linear-gradient(135deg, #FFD74A 0%, #FFB129 100%)" />
					<SubnavButton src="/resources/betas.svg" path="/betas" key="3" color="linear-gradient(135deg, #FFD74A 0%, #FFB129 100%)" />
				</div>
			</div>
		</div>
	);
};

export default SubNav;
