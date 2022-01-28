import bindTitlebar from "../../hooks/bindTitlebar";
import getVersion from "../../hooks/getVersion";
import isLuna from "../../hooks/isLuna";
import navStyles from "../../styles/nav.module.css";

const TitleMenu = () => {
	if (isLuna()) {
		bindTitlebar();
	}

	return (
		<div className={navStyles.menubar}>
			<p className={navStyles.menuTitle}>v{getVersion()}</p>
		</div>
	);
};

export default TitleMenu;
