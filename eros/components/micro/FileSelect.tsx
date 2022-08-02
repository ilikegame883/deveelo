import { useRef, useState } from "react";
import { useUploadSingleMutation, MyAccountMinProfileDocument, MyNameAndPfpDocument } from "../../hooks/backend/generated/graphql";
import { checkFileSize } from "../../hooks/inputUtils";

import uploadStyles from "../../styles/micro/fileupload.module.css";

const refetchTypes = ["pfp", "banner"];

interface FileAreaInput {
	type: string;
	text?: string;
	maxSize: "2mb" | "5mb";
}

export const FileSelectArea = ({ type, text, maxSize }: FileAreaInput) => {
	const [newFile, setNewFile] = useState<File>();

	if (newFile) {
		console.log(newFile.size);
	}

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
	if (newFile) {
		text = newFile.name;
	}

	return (
		<button className={uploadStyles.fillOverlay} onClick={selectFile}>
			<input
				type="file"
				id={`${type}file`}
				style={{ display: "none" }}
				ref={fileInput}
				accept="image/png, image/jpeg, image/jfif, image/webp, image/avif"
				onChange={(e) => {
					const file = e.target.files[0];

					const pass = checkFileSize(file.size, maxSize);
					if (pass) {
						setNewFile(file);
					}
				}}
			/>
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
