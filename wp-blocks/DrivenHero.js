import { gql } from "@apollo/client";
import { PictureTag } from "../utils/themeUtils";
import GutenbergBlocks from "../utils/GutenbergBlocks";

export default function DrivenHero(props) {
	const { subtitle, title, image: rawImage } = props?.props?.attributes;
	const image = JSON.parse(rawImage);

	return (
		<div className="block-hero">
			<div className="container">
				<div className="content">
					<p className="hero-subtitle">{subtitle}</p>
					<p
						className="hero-title"
						dangerouslySetInnerHTML={{ __html: title }}
					></p>
					<GutenbergBlocks blocks={props?.props?.children} />
				</div>

				<div className="image">
					<PictureTag image={image} />
				</div>
			</div>
		</div>
	);
}

DrivenHero.fragments = {
	entry: gql`
		fragment DrivenHeroFragment on DrivenHero {
			attributes {
				subtitle
				title
				image
			}
		}
	`,
	key: `DrivenHeroFragment`,
};
