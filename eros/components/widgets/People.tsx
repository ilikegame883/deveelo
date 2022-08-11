import widgetStyles from "../../styles/minor/widget.module.css";
import IconHeader from "./IconHeader";
import { useSampleUsersQuery } from "../../hooks/backend/generated/graphql";
import { SearchUserType } from "../../lib/userTypes";
import UserCard from "./UserCard";

const PeopleWidget = ({ count }: { count: number }) => {
	const { data, loading, error } = useSampleUsersQuery({
		variables: {
			amount: 4,
		},
		fetchPolicy: "no-cache",
	});

	if (loading && !data) {
		return <div />;
	}
	if (error) {
		return <div>Error occurred</div>;
	}

	const users = data.randomUsers as SearchUserType[];

	return (
		<div className={widgetStyles.peoplewidget}>
			<IconHeader type="widget" src="/resources/person.svg" color="purple" text="People" />
			<div className={widgetStyles.list}>
				{users.map(({ account, profile, status }) => (
					<UserCard account={account} profile={profile} status={status} />
				))}
			</div>
		</div>
	);
};

export default PeopleWidget;
