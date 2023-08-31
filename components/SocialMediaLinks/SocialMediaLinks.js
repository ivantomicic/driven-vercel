import dynamic from "next/dynamic";
import Link from "next/link";

const SocialMediaIcon = ({ link }) => {
	const platforms = [
		"facebook",
		"instagram",
		"linkedin",
		"tiktok",
		"twitter",
		"youtube",
	];

	for (const platform of platforms) {
		if (link.includes(platform)) {
			const DynamicComponent = dynamic(() =>
				import(`../../assets/icons/social/${platform}.svg?inline`)
			);

			return (
				<Link href={link}>
					<DynamicComponent />
				</Link>
			);
		}
	}
};

export default function SocialMediaLinks({ links }) {
	return (
		<ul className="social-media">
			{links.map((link, index) => {
				return (
					<li key={index}>
						<SocialMediaIcon link={link.link} />
					</li>
				);
			})}
		</ul>
	);
}
