import { useState } from "react";

import formStyles from "../../styles/form.module.css";
import TextButton from "../micro/TextButton";

interface UserFormPresets {
	name: string;
	tag: string;
	description: string;
}

const ProfileEditForm = ({ name, tag, description }: UserFormPresets) => {
	//user input captures
	const [newName, setNewName] = useState(name);
	const [newTag, setNewTag] = useState(tag);
	const [newDescription, setNewDescription] = useState(description);

	return (
		<form
			className={formStyles.pFormContainer}
			onSubmit={async (e) => {
				e.preventDefault();
			}}>
			<div className={formStyles.field}>
				<input
					className={formStyles.input}
					value={newName}
					type="text"
					name="editname"
					placeholder=" "
					onChange={(e) => {
						setNewName(e.target.value);
					}}
				/>
				<label htmlFor="editname" className={formStyles.label}>
					Username
				</label>
				{/* <p className={formStyles.error}>{emailErr}</p> */}
			</div>
		</form>
	);
};

export default ProfileEditForm;
