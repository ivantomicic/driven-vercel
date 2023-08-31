import { getWordPressProps, WordPressTemplate } from "@faustwp/core";

export default function Page(props) {
	return <WordPressTemplate {...props} />;
}

export async function getStaticProps(ctx) {
	const props = await getWordPressProps({ ctx });

	return {
		props,
		revalidate: 60, // Re-generate the page every 60 seconds
	};
}
