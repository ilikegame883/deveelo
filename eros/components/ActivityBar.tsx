import activityStyles from "../styles/activitybar.module.css";
import PeopleWidget from "./widgets/People";

interface activityBarParams {
	widgetKeys?: string[];
	hardEdge?: boolean;
}

const ActivityBar = ({ widgetKeys, hardEdge }: activityBarParams) => {
	//map the input keys to the widget component
	const widgets = new Map<string, any>();
	widgets.set("people", <PeopleWidget count={4} />);
	// const load = (key: string) => {
	// 	// shorten teh syntax needed to check if the widget is included in the "to load" list
	// 	return widgetKeys.includes(key);
	// }

	return <div className={hardEdge ? activityStyles.activityBar_full : activityStyles.activityBar}>{widgetKeys.map((key) => widgets.get(key))}</div>;
};

export default ActivityBar;
