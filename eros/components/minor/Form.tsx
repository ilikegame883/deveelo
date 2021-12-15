import { useState } from "react";
import Image from "next/image";
import router from "next/router";

import formStyles from "../../styles/form.module.css";
import { useLoginMutation, useRegisterMutation } from "../../hooks/backend/generated/graphql";

const Form = ({ type }: { type: string }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login] = useLoginMutation();
	const [register] = useRegisterMutation();
	const [show, setShow] = useState(false);

	const toggleClass = () => {
		setShow(!show);
	};

	return (
		<form
			className={formStyles.largeContainer}
			onSubmit={async (e) => {
				e.preventDefault();
				let response: any;

				if (type === "register") {
					response = await register({
						variables: {
							registerEmail: email,
							registerPassword: password,
						},
					});
				} else {
					response = await login({
						variables: {
							loginInput: email,
							loginPassword: password,
						},
					});
				}

				console.log(email + ", " + password);

				console.log(response);
				if (type === "register" || type === "login") {
					//router.push("/");
				}
			}}>
			<div className={formStyles.field}>
				<input
					className={formStyles.input}
					value={email}
					type={type == "register" ? "email" : "text"}
					name={type == "register" ? "email" : "emailorname"}
					placeholder=" "
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<label htmlFor="emailorname" className={formStyles.label}>
					{type == "register" ? "Enter email" : "Enter email or username"}
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
			<button type="submit">{type == "register" ? "Register" : "Login"}</button>
		</form>
	);
};

export default Form;
