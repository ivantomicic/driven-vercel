import * as AllComponents from "../wp-blocks/index";
import { useRef, useEffect } from "react";

const DangerouslyRenderHtml = ({ html }) => {
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.innerHTML = html;
		}
	}, [html]);

	return <div ref={ref} />;
};

export default function GutenbergBlocks(props) {
	const { blocks } = props;

	return (
		<>
			{blocks.map((block, index) => {
				const Component = AllComponents.default[block.__typename];
				if (Component) {
					return <Component key={index} props={block} />;
				} else {
					return (
						<DangerouslyRenderHtml
							key={index}
							html={block.renderedHtml}
						/>
					);
				}
			})}
		</>
	);
}
