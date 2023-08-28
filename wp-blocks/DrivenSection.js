import { gql } from "@apollo/client";
import GutenbergBlocks from "../utils/GutenbergBlocks";
// import { WordPressBlocksViewer } from "@faustwp/blocks";

export default function DrivenSection(props) {
	console.log(props);

	return (
		<div className="block-wrapper container">
			<GutenbergBlocks blocks={props?.props?.children} />
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
