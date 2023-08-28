import { gql } from "@apollo/client";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import flatListToHierarchical from "../utils/flatListToHierarchical";
import getFragmentDataFromBlocks from "../utils/getFragmentDataFromBlocks";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import blocks from "../wp-blocks";
import { Header, Footer } from "../components";

export default function Component(props) {
	// Loading state for previews
	if (props.loading) {
		return <>Loading...</>;
	}

	const themeSettings = props.data.drivenThemeSettings;

	const { editorBlocks } = props?.data?.page;
	const blocks = flatListToHierarchical(editorBlocks);

	return (
		<>
			<Header props={themeSettings} />
			<button onClick={() => alert("👻 2")}>
				Click This Button For Alert 2
			</button>
			<WordPressBlocksViewer blocks={blocks} />
			<Footer props={themeSettings} />
		</>
	);
}

Component.variables = ({ databaseId }, ctx) => {
	return {
		databaseId,
		asPreview: ctx?.asPreview,
	};
};

Component.query = gql`
	${BlogInfoFragment}
	${Header.fragments.entry}
	${Footer.fragments.entry}

	# Get all block fragments and add them to the query
	${getFragmentDataFromBlocks(blocks).entries}

	query GetPageData($databaseId: ID!, $asPreview: Boolean = false) {
		page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			editorBlocks {
				id: clientId
				parentId: parentClientId
				renderedHtml
				# Get all block fragment keys and call them in the query
				${getFragmentDataFromBlocks(blocks).keys}
			}
		}
		generalSettings {
			...BlogInfoFragment
		}
		drivenThemeSettings {
			...HeaderFragment
			...FooterFragment
		}
	}
`;
