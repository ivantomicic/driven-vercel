import { gql } from "@apollo/client";
import GutenbergBlocks from "../utils/GutenbergBlocks";

export default function DrivenTeamMembers(props) {
	const { title } = props?.props?.attributes;

	return (
		<div className="team-group">
			{title && <p className="block-title">{title}</p>}

			<div className="member-cards">
				<GutenbergBlocks blocks={props?.props?.children} />
			</div>
		</div>
	);
}

DrivenTeamMembers.fragments = {
	entry: gql`
		fragment DrivenTeamMembersFragment on DrivenTeamMembers {
			attributes {
				title
			}
		}
	`,
	key: `DrivenTeamMembersFragment`,
};
