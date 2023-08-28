import { gql } from "@apollo/client";
import { PictureTag } from "../utils/themeUtils";

export default function DrivenTeamMembersCard(props) {
	const { name, title, image: rawImage } = props.attributes;
	const image = JSON.parse(rawImage);

	return (
		<div className="member-card">
			<PictureTag image={image} className="avatar" />
			<p className="name">{name}</p>
			<p
				className="title"
				dangerouslySetInnerHTML={{ __html: title }}
			></p>
		</div>
	);
}

DrivenTeamMembersCard.fragments = {
	entry: gql`
		fragment DrivenTeamMembersCardFragment on DrivenTeamMembersCard {
			attributes {
				name
				title
				image
			}
		}
	`,
	key: `DrivenTeamMembersCardFragment`,
};
