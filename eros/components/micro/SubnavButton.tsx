import { useRouter } from "next/router";
import subnavStyles from "../../styles/minor/subnav.module.css";

interface SNB_Props {
	key: string;
	src: string;
	path: string;
	color: string; //when active
	width: string;
	height: string;
	padding: number;
}

const SubnavButton = ({ key, src, path, color, width, height, padding }: SNB_Props) => {
	const router = useRouter();
	console.log(router.pathname);

	const active = true;

	const iconStyle = () => ({
		width: width,
		height: height,
		padding: `${padding}em`,
	});

	return (
		<button style={{ background: active ? color : "#D7E0EF" }} className={subnavStyles.button} onClick={() => router.push(`${path}`)}>
			<img style={iconStyle()} src={src} />
		</button>
	);
};

export default SubnavButton;
