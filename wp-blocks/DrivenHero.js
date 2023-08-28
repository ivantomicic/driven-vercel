import { gql } from "@apollo/client";
import { PictureTag } from "../utils/themeUtils";
import { WordPressBlocksViewer } from "@faustwp/blocks";

export default function DrivenHero(props) {
	const { subtitle, title, image: rawImage } = props.attributes;
	const image = JSON.parse(rawImage);

	console.log("🍍", props.isDynamic);

	return (
		<div className="block-hero">
			<div className="container">
				<div className="content">
					<p className="hero-subtitle">{subtitle}</p>
					<p
						className="hero-title"
						dangerouslySetInnerHTML={{ __html: title }}
					></p>

					{/* check if props.isDyanmic and then add paragraph */}
					{props.isDynamic && (
						<p className="hero-title">
							This is a dynamic paragraph
						</p>
					)}

					<button onClick={() => alert("👻 3")}>
						Click This Button For Alert 3
					</button>
					<WordPressBlocksViewer blocks={props?.children ?? []} />
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
