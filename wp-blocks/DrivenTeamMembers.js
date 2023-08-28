import { gql } from "@apollo/client";
import { WordPressBlocksViewer } from "@faustwp/blocks";

export default function DrivenTeamMembers(props) {
	const { title } = props.attributes;

	return (
		<div className="team-group">
			{title && <p className="block-title">{title}</p>}

			<div className="member-cards">
				<WordPressBlocksViewer blocks={props?.children ?? []} />
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
