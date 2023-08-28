import { gql } from "@apollo/client";
import { useRef } from "react"; // Import useRef
import Lottie from "lottie-react";
import groovyWalkAnimation from "../lottie.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";

export default function DrivenFeaturesSlider(props) {
	const slides = JSON.parse(props?.props?.attributes.slides);
	const swiperRef = useRef(null);

	const updateElementTextWithAnimation = (element, newText) => {
		element.classList.add("animate-out");
		setTimeout(() => {
			element.innerText = newText;
			element.classList.remove("animate-out");
		}, 700);
	};

	const handleSlideChange = () => {
		const { swiper } = swiperRef.current;
		const { activeIndex } = swiper;

		console.log(slides[activeIndex].lottie);

		const title = slides[activeIndex].title;
		const titleContainer = document.querySelector(".slide-title");
		updateElementTextWithAnimation(titleContainer, title);

		const subtitle = slides[activeIndex].subtitle;
		const subtitleContainer = document.querySelector(".slide-subtitle");
		updateElementTextWithAnimation(subtitleContainer, subtitle);
	};

	return (
		<div className="block-features-slider">
			<div className="bg-l"></div>
			<div className="bg-r"></div>

			<div className="container">
				<div className="graphic" id="features-slider-player">
					<Lottie animationData={groovyWalkAnimation} />
				</div>

				<div className="content">
					<div className="slide-title">{slides[0].title}</div>
					<div className="slide-subtitle">{slides[0].subtitle}</div>

					<div className="feature-list-wrap">
						<Swiper
							modules={[Pagination, A11y]}
							ref={swiperRef}
							speed={750}
							slidesPerView={1}
							onSlideChange={handleSlideChange}
							pagination={{
								el: ".features-pager",
								clickable: true,
							}}
						>
							{slides.map((slide, index) => {
								return (
									<SwiperSlide key={index}>
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
							<div className="features-pager"></div>
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
