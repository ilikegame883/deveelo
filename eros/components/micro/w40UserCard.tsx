import { SearchUserType } from "../../lib/userTypes";
import w40styles from "../../styles/micro/w40.module.css";
import IconButton from "./IconButton";
import NameGroup from "./NameGroup";
import ProfilePicture from "./ProfilePicture";

const W40UserCard = ({ ids }: { ids: string[] }) => {
	/* todo 
    -  make findbyid query
    -  call query from here
    -  use returned user to generate card
    -  finish .map & test
    */
	return (
		<div className={w40styles.cardwrapper}>
			<div className="fitfill">
				<div className="rows"></div>
				<div className="fillfillcenterright">
					<IconButton src="/resources/followbell.svg" width="2.625rem" height="2.625rem" paddingLR={0.375} paddingTB={0.375} />
				</div>
			</div>
		</div>
	);
};

export default W40UserCard;
