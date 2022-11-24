import { useState } from "react";
import styles from "../../styles/micro/labelbutton.module.css";

interface LikeProps {
	count: number;
	cardType: "post" | "blog";
	startActive: boolean;
}

export const Like = ({ count, cardType, startActive }: LikeProps) => {
	const [likes, setLikes] = useState(count);
	const [active, setActive] = useState(startActive);

	return (
		<div className={styles.buttonWrapper}>
			<p className={styles.label}>{likes}</p>
		</div>
	);
};
