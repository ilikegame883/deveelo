import { useRouter } from "next/router";
import subnavStyles from "../../styles/minor/subnav.module.css";

interface SNB_Props {
	key: string;
	src: string;
	path: string;
	color: string; //when active
}

const SubnavButton = ({ key, src, path, color }: SNB_Props) => {
	const router = useRouter();

	//use color for this button if its click path matches the current (we are on its page)
	const active = router.pathname.substring(0, 4) === path.substring(0, 4);

	const iconStyle = () => ({
		width: "100%",
		height: "100%",
		// padding: `${padding}rem`,
	});

	return (
		<button style={{ background: active ? color : "#D7E0EF" }} className={subnavStyles.button} onClick={() => router.push(`${path}`)}>
			<img style={iconStyle()} src={src} />
		</button>
	);
};

export default SubnavButton;
