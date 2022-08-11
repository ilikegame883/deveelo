import nameStyles from "../../styles/namegroup.module.css";

const Badge = ({ keys, outline }: { keys?: string[]; outline?: boolean }) => {
	let items: any = [];

	for (let i = 0; i < keys.length; i++) {
		if (keys[i] == "verified") {
			items.push(
				<div key="0" className={outline ? nameStyles.colorlesslargeBadge : nameStyles.v_largeBadge}>
					<div className={outline ? nameStyles.checkmarkout : nameStyles.checkmark} />
				</div>
			);
		} else if (keys[i] == "staff") {
			items.push(
				<div key="1" className={outline ? nameStyles.colorlesslargeBadge : nameStyles.s_largeBadge}>
					<div className={outline ? nameStyles.shieldout : nameStyles.shield} />
				</div>
			);
		}
	}

	return <>{items}</>;
};

export default Badge;
