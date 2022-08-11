import cardStyles from "../../styles/micro/widgetcards.module.css";

interface DetailProps {
	text: string;
	boldtext?: string;
}

const CardDetailText = ({ text, boldtext }: DetailProps) => {
	return (
		<p className={cardStyles.detail}>
			{text} {boldtext ? <span style={{ fontWeight: 700, marginLeft: ".25em" }}>{boldtext}</span> : null}
		</p>
	);
};

export default CardDetailText;
