import iconheaderStyles from "../../styles/micro/iconheader.module.css";

interface IconHeaderProps {
	type: "widget";
	src: string;
}

const purple = {};

const IconHeader = ({ type, src }: IconHeaderProps) => {
	const textstyles = new Map<string, any>();
	textstyles.set("widget", iconheaderStyles.widget);

	return (
		<div className={iconheaderStyles.container}>
			<img
				style={{ background: "linear-gradient(120.25deg, #7594FF 11.25%, #685CEF 88.64%)", boxShadow: "0px 0.375em 0.938em rgba(104, 92, 239, 0.3)" }}
				className={iconheaderStyles.icon}
				src={src}
			/>
			<h5 className={textstyles.get(type)}></h5>
		</div>
	);
};

export default IconHeader;
