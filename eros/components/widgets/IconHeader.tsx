import iconheaderStyles from "../../styles/micro/iconheader.module.css";

interface IconHeaderProps {
	type: "widget";
	src: string;
}

const purple = { background: "linear-gradient(120.25deg, #7594FF 11.25%, #685CEF 88.64%)", boxShadow: "0px 0.375em 0.938em rgba(104, 92, 239, 0.3)" };

const IconHeader = ({ type, src }: IconHeaderProps) => {
	// map type to header text styling
	const textStyles = new Map<string, any>();
	textStyles.set("widget", iconheaderStyles.widget);

	return (
		<div className={iconheaderStyles.container}>
			<img style={} className={iconheaderStyles.icon} src={src} />
			<h5 className={textStyles.get(type)}></h5>
		</div>
	);
};

export default IconHeader;
