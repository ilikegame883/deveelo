import widgetStyles from "../../styles/minor/widget.module.css";
import IconHeader from "./IconHeader";
import UserCard from "./UserCard";
import { useSampleUsersQuery } from "../../hooks/backend/generated/graphql";
import { SearchUserIdType } from "../../lib/userTypes";
import { sortByStatus } from "../../hooks/sortUsers";

const PeopleWidget = ({ key, count }: { key: string; count: number }) => {
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

	const users = data.randomUsers as SearchUserIdType[];

	const sortedUsers = sortByStatus(users);

	return (
		<div className={widgetStyles.peoplewidget}>
			<IconHeader type="widget" src="/resources/person.svg" color="purple" text="People" />
			<div className={widgetStyles.list}>
				{sortedUsers.map((user) => (
					<UserCard key={users.indexOf(user).toString()} id={user._id} account={user.account} profile={user.profile} status={user.status} />
				))}
			</div>
		</div>
	);
};

export default PeopleWidget;
