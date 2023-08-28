import { gql } from "@apollo/client";
import { getBackgroundImageStyles } from "../utils/themeUtils";

export default function DrivenHeroInner(props) {
	const title = props.attributes.title;
	const image = JSON.parse(props.attributes.image);

	return (
		<>
			<div
				className="block-hero-inner"
				style={getBackgroundImageStyles(image)}
			>
				<p
					className="title container"
					dangerouslySetInnerHTML={{ __html: title }}
				></p>
			</div>
			<div className="block-separator"></div>
		</>
	);
}

DrivenHeroInner.fragments = {
	entry: gql`
		fragment DrivenHeroInnerFragment on DrivenHeroInner {
			attributes {
				title
				image
			}
		}
	`,
	key: `DrivenHeroInnerFragment`,
};
