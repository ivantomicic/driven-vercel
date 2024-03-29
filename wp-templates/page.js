import { gql } from "@apollo/client";
import parse from "html-react-parser";
import Head from "next/head";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { flatListToHierarchical } from "@faustwp/core";
import getFragmentDataFromBlocks from "../utils/getFragmentDataFromBlocks";
import blocks from "../wp-blocks";
import { Header, Footer, Loader } from "../components";
import GutenbergBlocks from "../utils/GutenbergBlocks";

export default function Component(props) {
	// Loading state for previews
	if (props.loading) {
		return <Loader />;
	}

	const themeSettings = props.data.drivenThemeSettings;

	const { editorBlocks, seo } = props?.data?.page;

	return (
		<>
			<Head>{parse(seo.fullHead)}</Head>
			<Header props={themeSettings} />
			<GutenbergBlocks blocks={flatListToHierarchical(editorBlocks)} />
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
			seo {
				metaDesc
				fullHead
				title
			}
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

export const revalidate = 10;
