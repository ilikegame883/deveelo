import nameStyles from "../../styles/namegroup.module.css";

const Badge = ({ keys }: { keys?: string[] }) => {
	let items: any = [];

	for (let i = 0; i < keys.length; i++) {
		if (keys[i] == "verified") {
			items.push(
				<div className={nameStyles.v_largeBadge}>
					<div className={nameStyles.checkmark} />
				</div>
			);
		} else if (keys[i] == "staff") {
			items.push(
				<div className={nameStyles.s_largeBadge}>
					<div className={nameStyles.shield} />
				</div>
			);
		}
	}

	return <>{items}</>;
};

export default Badge;
