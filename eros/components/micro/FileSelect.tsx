import { useRef } from "react";

import uploadStyles from "../../styles/micro/fileupload.module.css";

export const FileSelectArea = () => {
	const fileInput = useRef<HTMLInputElement>();

	const selectFile = () => {
		if (fileInput && fileInput.current) {
			fileInput.current.click();
		}
	};

	return (
		<button className={uploadStyles.fillOverlay} onClick={selectFile}>
			<input type="file" id="pfpfile" style={{ display: "none" }} ref={fileInput} accept="image/png, image/jpeg, image/jfif, image/webp, image/avif" />
			<div className={uploadStyles.content}>
				<img src="resources/uploadAreaIcon.svg" style={{ width: "2.53em", height: "2.53em" }} />
			</div>
		</button>
	);
};
