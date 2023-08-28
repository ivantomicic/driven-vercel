import { gql } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function DrivenFeaturesSlider(props) {
	const slides = JSON.parse(props?.props?.attributes.slides);

	const slide = slides[0];

	return (
		<div className="block-features-slider">
			<div className="bg-l"></div>
			<div className="bg-r"></div>

			<div className="container">
				<div className="graphic" id="features-slider-player"></div>

				<div className="content">
					<div className="slide-title">{slide.title}</div>
					<div className="slide-subtitle">{slide.subtitle}</div>

					<div className="feature-list-wrap">
						<Swiper
							slidesPerView={1}
							onSlideChange={() => console.log("slide change")}
						>
							{slides.map((slide, index) => {
								return (
									<SwiperSlide>
										<ul className="list" key={index}>
											{slide.features.map(
												(feature, index) => (
													<li
														dangerouslySetInnerHTML={{
															__html: feature,
														}}
														key={index}
													></li>
												)
											)}
										</ul>
									</SwiperSlide>
								);
							})}
						</Swiper>

						<div className="features-nav">
							<div className="features-pager">
								{slides.map((slide, index) => {
									return (
										<span
											className="pager-item"
											key={index}
										></span>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

DrivenFeaturesSlider.fragments = {
	entry: gql`
		fragment DrivenFeaturesSliderFragment on DrivenFeaturesSlider {
			attributes {
				slides
			}
		}
	`,
	key: `DrivenFeaturesSliderFragment`,
};
