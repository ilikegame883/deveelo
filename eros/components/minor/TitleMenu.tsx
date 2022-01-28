import bindTitlebar from "../../hooks/bindTitlebar";
import getAppVersion from "../../hooks/getVersion";
import isLuna from "../../hooks/isLuna";
import navStyles from "../../styles/nav.module.css";

const TitleMenu = () => {
	if (isLuna()) {
		bindTitlebar();
	}

	return (
		<div className={navStyles.menubar}>
			<p className={navStyles.menuTitle}>v{getAppVersion()}</p>
		</div>
	);
};

export default TitleMenu;
