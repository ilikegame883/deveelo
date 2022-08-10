import { useRouter } from "next/router";
import formStyles from "../styles/form.module.css";
import headerStyles from "../styles/headers.module.css";

import Form from "../components/minor/Form";
import { getAccessToken } from "../accessToken";
import Meta from "../components/micro/Meta";

const register = () => {
	const accessToken = getAccessToken();
	const router = useRouter();

	if (accessToken && accessToken !== "") {
		router.push("/");
	}

	return (
		<>
			<Meta title="Sign Up | Deveelo" />
			<div className={formStyles.formPositoner}>
				<div className={formStyles.largeContainerOffset}>
					<p className={headerStyles.aboveHeader}>Hello,</p>
					<h1 className={headerStyles.headerLarge}>Welcome to Deveelo</h1>
					<Form type="register" />
				</div>
			</div>
		</>
	);
};

export default register;
