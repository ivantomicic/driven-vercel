import { gql } from "@apollo/client";
import { WordPressBlocksViewer } from "@faustwp/blocks";

export default function DrivenSection(props) {
	return (
		<div className="block-wrapper container">
			<WordPressBlocksViewer blocks={props?.children ?? []} />
		</div>
	);
}

DrivenSection.fragments = {
	entry: gql`
		fragment DrivenSectionFragment on DrivenSection {
			attributes {
				blockAnchor
			}
		}
	`,
	key: `DrivenSectionFragment`,
};
