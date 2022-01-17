const { app, BrowserWindow } = require("electron");
require("update-electron-app")();

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1500,
		height: 800,
		frame: false,
		show: true,
	});
	win.loadURL("http://localhost:3000");
	win.removeMenu();
	global.mainWindow = win;
};

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
