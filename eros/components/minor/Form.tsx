import { useState } from "react";
import Image from "next/image";

import formStyles from "../../styles/form.module.css";

const Form = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let showPassword = false;
	const [show, setShow] = useState(false);

	const toggleClass = () => {
		setShow(!show);
	};

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
					type="text"
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
					type={show ? "text" : "password"}
					name="password"
					placeholder=" "
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<label htmlFor="password" className={formStyles.label}>
					Enter password
				</label>

				<span className={show ? formStyles.togglePassword : formStyles.toggledPassword} onMouseDown={() => toggleClass()}>
					<Image src={show ? "/resources/eyeHide.svg" : "/resources/eye.svg"} width="22.5" height="22.5" />
				</span>
			</div>
			<button type="submit">Login</button>
		</form>
	);
};

export default Form;
