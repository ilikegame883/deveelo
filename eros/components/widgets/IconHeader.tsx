import iconheaderStyles from "../../styles/micro/iconheader.module.css";

interface IconHeaderProps {
	type: "widget";
	src: string;
}

const IconHeader = ({ type, src }: IconHeaderProps) => {
	const textstyles = new Map<string, any>();
	textstyles.set("widget", iconheaderStyles.widget);

	return (
		<div className={iconheaderStyles.container}>
			<h5 className={textstyles.get(type)}></h5>
		</div>
	);
};

export default IconHeader;
