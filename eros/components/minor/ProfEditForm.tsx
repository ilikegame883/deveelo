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
			}}></form>
	);
};

export default ProfileEditForm;
