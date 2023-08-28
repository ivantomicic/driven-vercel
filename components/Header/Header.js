import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.svg";

export default function Header(props) {
	const { mainNavigation: nav } = props?.props?.themeSettings;

	return (
		<header className="site-navigation">
			<nav className="container">
				<Link href="/">
					<Image priority src={logo} alt="Driven.World" />
				</Link>

				<ul className="nav">
					{nav?.map((item, index) => {
						const link = item.link;
						let btnClass = "btn btn--small";
						if (index === 0) btnClass += " btn--tertiary";
						if (index === 1) btnClass += " btn--primary";

						return (
							<li key={index}>
								<Link href={link.url} className={btnClass}>
									{link.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
}

Header.fragments = {
	entry: gql`
		fragment HeaderFragment on DrivenThemeSettings {
			themeSettings {
				mainNavigation {
					link {
						title
						url
						target
					}
				}
			}
		}
	`,
};
