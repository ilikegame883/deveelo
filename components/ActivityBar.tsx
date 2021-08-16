import activityStyles from "../styles/activitybar.module.css";

interface activityBarParams {
	topSpacing: boolean;
	widgetKeys?: string;
}

const ActivityBar = ({ topSpacing, widgetKeys }: activityBarParams) => {
	return <div className={topSpacing ? activityStyles.activityBar : activityStyles.activityBarNoSpace}></div>;
};

export default ActivityBar;
