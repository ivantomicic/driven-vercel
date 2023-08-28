import * as AllComponents from "../wp-blocks/index";

export default function GutenbergBlocks(props) {
	const { blocks } = props;

	return (
		<div>
			{blocks.map((block, index) => {
				const Component = AllComponents.default[block.__typename];
				if (Component) {
					return <Component key={index} props={block} />;
				}
				return null; // or some fallback component
			})}
		</div>
	);
}
