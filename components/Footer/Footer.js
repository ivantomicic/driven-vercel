import { gql } from "@apollo/client";
import Link from "next/link";
import { SocialMediaLinks } from "../../components";

function NavigationList({ items }) {
	return (
		<ul>
			{items.map((item, index) => {
				const link = item.link;
				return (
					<Link href={link.url} key={index}>
						{link.title}
					</Link>
				);
			})}
		</ul>
	);
}

export default function Footer(props) {
	const {
		newsletterTitle,
		newsletterSubtitle,
		newsletterConsent,
		socialMediaTitle,
		socialMediaNavigation,
		footerNavigation,
		legalNavigation,
	} = props?.props.themeSettings;

	return (
		<>
			<div className="block-separator"></div>

			<footer className="site-footer">
				<div className="container">
					<div className="columns">
						<div className="column">
							<p className="column-title">{newsletterTitle}</p>
							<p className="column-description">
								{newsletterSubtitle}
							</p>

							<form
								className="newsletter-form"
								data-gsheet="Newsletter"
								data-success="You Are In!"
							>
								<fieldset>
									<input
										type="email"
										name="email"
										placeholder="Your email address"
										required
									/>
									<button type="submit" className="btn">
										Sign Up
									</button>
								</fieldset>

								<input
									type="checkbox"
									name="consent"
									id="consent"
									required
								/>
								<label
									htmlFor="consent"
									dangerouslySetInnerHTML={{
										__html: newsletterConsent,
									}}
								/>
							</form>
						</div>

						<div className="column">
							<p className="column-title">{socialMediaTitle}</p>
							<SocialMediaLinks links={socialMediaNavigation} />
						</div>
					</div>

					<div className="copyright">
						<p>
							&copy; {new Date().getFullYear()} Driven AG. All
							rights reserved.
						</p>

						<div className="menus">
							<NavigationList items={footerNavigation} />
							<NavigationList items={legalNavigation} />
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}

Footer.fragments = {
	entry: gql`
		fragment FooterFragment on DrivenThemeSettings {
			themeSettings {
				newsletterTitle
				newsletterSubtitle
				newsletterConsent
				socialMediaTitle
				socialMediaNavigation {
					link
				}
				footerNavigation {
					link {
						target
						title
						url
					}
				}
				legalNavigation {
					link {
						target
						title
						url
					}
				}
			}
		}
	`,
};
