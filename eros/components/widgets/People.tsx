import widgetStyles from "../../styles/minor/widget.module.css";
import IconHeader from "./IconHeader";
import { useSampleUsersQuery } from "../../hooks/backend/generated/graphql";
import { SearchUserIdType } from "../../lib/userTypes";
import UserCard from "./UserCard";

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

	return (
		<div className={widgetStyles.peoplewidget}>
			<IconHeader type="widget" src="/resources/person.svg" color="purple" text="People" />
			<div className={widgetStyles.list}>
				{users.map((user) => (
					<UserCard key={users.indexOf(user).toString()} id={user._id} account={user.account} profile={user.profile} status={user.status} />
				))}
			</div>
		</div>
	);
};

export default PeopleWidget;
