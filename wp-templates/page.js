import { gql } from "@apollo/client";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Header, Footer } from "../components";

export default function Component(props) {
	// Loading state for previews
	if (props.loading) {
		return <>Loading...</>;
	}

	const themeSettings = props.data.drivenThemeSettings;

	return (
		<>
			<Header props={themeSettings} />
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

	query GetPageData($databaseId: ID!, $asPreview: Boolean = false) {
		page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			content
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
