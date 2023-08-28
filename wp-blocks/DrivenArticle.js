import { gql } from "@apollo/client";
import { WordPressBlocksViewer } from "@faustwp/blocks";

export default function DrivenArticle(props) {
	return (
		<div className="block-wrapper container">
			<WordPressBlocksViewer blocks={props?.children ?? []} />
		</div>
	);
}

DrivenArticle.fragments = {
	entry: gql`
		fragment DrivenArticleFragment on DrivenArticle {
			apiVersion
		}
	`,
	key: `DrivenArticleFragment`,
};
