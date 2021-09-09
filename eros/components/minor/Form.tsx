import formStyles from "../../styles/form.module.css";

const Form = () => {
	return (
		<form className={formStyles.largeContainer}>
			<div className={formStyles.field}>
				<input className={formStyles.input} type="emailorname" name="emailorname" placeholder=" " />
				<label htmlFor="emailorname" className={formStyles.label}>
					Enter email or username
				</label>
			</div>

			<div className={formStyles.field}>
				<input className={formStyles.input} type="password" name="password" placeholder=" " />
				<label htmlFor="password" className={formStyles.label}>
					Enter password
				</label>
			</div>
		</form>
	);
};

export default Form;
