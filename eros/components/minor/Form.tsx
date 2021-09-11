import { useState } from "react";

import formStyles from "../../styles/form.module.css";

const Form = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<form
			className={formStyles.largeContainer}
			onSubmit={(e) => {
				e.preventDefault();
				console.log("form submitted");
				console.log(email, password);
			}}>
			<div className={formStyles.field}>
				<input
					className={formStyles.input}
					value={email}
					type="emailorname"
					name="emailorname"
					placeholder=" "
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<label htmlFor="emailorname" className={formStyles.label}>
					Enter email or username
				</label>
			</div>

			<div className={formStyles.field}>
				<input
					className={formStyles.input}
					value={password}
					type="password"
					name="password"
					placeholder=" "
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<label htmlFor="password" className={formStyles.label}>
					Enter password
				</label>
			</div>
			<button type="submit">Login</button>
		</form>
	);
};

export default Form;
