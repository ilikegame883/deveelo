import { useRef } from "react";
import { useUploadSingleMutation, MyAccountMinProfileDocument, MyNameAndPfpDocument } from "../../hooks/backend/generated/graphql";

import uploadStyles from "../../styles/micro/fileupload.module.css";

const refetchTypes = ["pfp", "banner"];

export const FileSelectArea = ({ type, text }: { type: string; text?: string }) => {
	//limit refetch to pfp and banner queries
	const refetch = refetchTypes.includes(type);
	const options = {
		refetchQueries: [{ query: MyAccountMinProfileDocument }, { query: MyNameAndPfpDocument }],
	};
	//after changing the pictures, we will refetch the queries which use them
	const [uploadSingle] = useUploadSingleMutation(refetch ? options : null);

	//route click on overlay to invisible file upload button
	const fileInput = useRef<HTMLInputElement>();

	const selectFile = () => {
		if (fileInput && fileInput.current) {
			fileInput.current.click();
		}
	};

	const showText: boolean = text !== undefined;

	return (
		<button className={uploadStyles.fillOverlay} onClick={selectFile}>
			<input type="file" id={`${type}file`} style={{ display: "none" }} ref={fileInput} accept="image/png, image/jpeg, image/jfif, image/webp, image/avif" />
			<div className={uploadStyles.content}>
				{/* handles compensating for the uncentered icon + sign pushes it left) */}
				<div className={uploadStyles.imageOffsetWrapper}>
					<img src="resources/uploadAreaIcon.svg" style={{ width: "2.53rem", height: "2.53rem" }} />
				</div>
				{showText ? <p className={uploadStyles.subtitle}>{text}</p> : null}
			</div>
		</button>
	);
};
