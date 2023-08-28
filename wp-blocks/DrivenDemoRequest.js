import { gql } from "@apollo/client";
import { PictureTag } from "../utils/themeUtils";

export default function DrivenDemoRequest(props) {
	const { subtitle, title, image: rawImage } = props.attributes;
	const image = JSON.parse(rawImage);

	return (
		<div className="block-demo-request">
			<div className="image">
				<PictureTag image={image} />
			</div>

			<div className="content">
				<div
					className="title"
					dangerouslySetInnerHTML={{ __html: title }}
				/>

				<p>{subtitle}</p>

				<form>
					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email address" />
					<button type="submit" className="btn">
						Request Demo
					</button>
				</form>
			</div>
		</div>
	);
}

DrivenDemoRequest.fragments = {
	entry: gql`
		fragment DrivenDemoRequestFragment on DrivenDemoRequest {
			attributes {
				title
				subtitle
				image
			}
		}
	`,
	key: `DrivenDemoRequestFragment`,
};
