import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import getVersion from "../../hooks/getVersion";
import isLuna from "../../hooks/isLuna";
import navStyles from "../../styles/nav.module.css";

const TitleMenu = () => {
	if (isLuna()) {
		document.getElementById("titlebar-minimize")?.addEventListener("click", () => appWindow.minimize());
		document.getElementById("titlebar-maximize")?.addEventListener("click", async () => {
			let max = await appWindow.isMaximized();
			max ? appWindow.unmaximize() : appWindow.maximize();
		});
		document.getElementById("titlebar-close")?.addEventListener("click", () => appWindow.close());
	}

	return (
		<div className={navStyles.menubar}>
			<p className={navStyles.menuTitle}>v{getVersion()}</p>
		</div>
	);
};

export default TitleMenu;
