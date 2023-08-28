import { useState } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

export default function DrivenTiers(props) {
	if (props.loading) {
		return <>Loading...</>;
	}

	const [isAnuall, setIsAnuall] = useState(false);
	const { moreLabel, moreTitle } = props?.props?.attributes;

	const { data } = useQuery(DrivenTiers.query);
	const tiers = data?.drivenTiersShared?.tiers?.tiers;

	return (
		<div className="block-tiers">
			<div className={`payment-switch ${isAnuall ? "anually" : ""}`}>
				<span className="label" data-period="monthly">
					Billed monthly
				</span>
				<button
					className="switch"
					onClick={() => setIsAnuall(!isAnuall)}
				>
					<span className="dot"></span>
				</button>
				<span className="label" data-period="anually">
					Billed anually
				</span>
			</div>

			<div className="cards">
				{tiers?.map((tier, index) => {
					return (
						<div className="plan" key={index}>
							<p className="label">{tier.title}</p>

							<div className="price">
								<div
									className={`amount ${
										isAnuall && "anually"
									}`}
								>
									{isAnuall
										? "$" + tier.pricePerMonthBilledAnually
										: "$" + tier.pricePerMonthBilledMonthly}
									<span>/month</span>
								</div>
							</div>

							<p className="includes">{tier.description}</p>

							{tier.tierFeatures.map((featureGroup, index) => {
								return (
									<div key={index}>
										<p className="list-title">
											<img
												src={
													featureGroup.icon.sourceUrl
												}
												alt=""
											/>
											{featureGroup.title}
										</p>

										<ul className="list">
											{featureGroup.features.map(
												(feature, index) => {
													{
														/* if feature.icon exists and its not "none" add data-icon="its value to li" */
													}
													return (
														<li
															key={index}
															data-icon={
																feature.icon !==
																"none"
																	? feature.icon
																	: ""
															}
														>
															{feature.feature}
														</li>
													);
												}
											)}
										</ul>
									</div>
								);
							})}

							{tier.button && (
								<Link
									href={tier.button.url}
									className="btn btn--secondary"
								>
									{tier.button.title}
								</Link>
							)}
						</div>
					);
				})}

				<div className="plan">
					<p className="label">{moreLabel}</p>
					<p
						className="not-enough-title"
						dangerouslySetInnerHTML={{ __html: moreTitle }}
					></p>
				</div>
			</div>
		</div>
	);
}

DrivenTiers.query = gql`
	query GetTiers {
		drivenTiersShared {
			tiers {
				tiers {
					title
					description
					tierFeatures {
						title
						icon {
							sourceUrl
						}
						features {
							feature
							icon
						}
					}
					button {
						target
						title
						url
					}
					pricePerMonthBilledMonthly
					pricePerMonthBilledAnually
				}
			}
		}
	}
`;

DrivenTiers.fragments = {
	entry: gql`
		fragment DrivenTiersFragment on DrivenTiers {
			attributes {
				moreLabel
				moreTitle
			}
		}
	`,
	key: `DrivenTiersFragment`,
};
