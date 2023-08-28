import { gql } from "@apollo/client";

export default function DrivenSectionHeading(props) {
	const { title, titleHide, subtitle, subtitleHide } = props.attributes;

	return (
		<div className="block-heading">
			{!titleHide && title && (
				<div
					className="block-title"
					dangerouslySetInnerHTML={{ __html: title }}
				/>
			)}
			{!subtitleHide && subtitle && (
				<div
					className="block-subtitle"
					dangerouslySetInnerHTML={{ __html: title }}
				/>
			)}
		</div>
	);
}

DrivenSectionHeading.fragments = {
	entry: gql`
		fragment DrivenSectionHeadingFragment on DrivenSectionHeading {
			attributes {
				title
				titleHide
				subtitle
				subtitleHide
			}
		}
	`,
	key: `DrivenSectionHeadingFragment`,
};
