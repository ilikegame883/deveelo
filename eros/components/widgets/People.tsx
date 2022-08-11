import widgetStyles from "../../styles/minor/widget.module.css";
import IconHeader from "./IconHeader";

const PeopleWidget = ({ count }: { count: number }) => {
	return (
		<div className={widgetStyles.peoplewidget}>
			<IconHeader type="widget" src="/resources/person.svg" color="purple" />
		</div>
	);
};

export default PeopleWidget;
