import { gql } from "@apollo/client";
import GutenbergBlocks from "../utils/GutenbergBlocks";

export default function DrivenArticle(props) {
	return (
		<div className="block-wrapper container">
			<GutenbergBlocks blocks={props?.props?.children} />
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
