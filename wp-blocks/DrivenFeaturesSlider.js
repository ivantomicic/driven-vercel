import { gql } from "@apollo/client";
import { useRef } from "react"; // Import useRef
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

export default function DrivenFeaturesSlider(props) {
	const slides = JSON.parse(props?.props?.attributes.slides);
	const swiperRef = useRef(null);

	const handleSlideChange = () => {
		const swiper = swiperRef.current.swiper;
		const activeIndex = swiper.activeIndex;
		const currentSlide = swiper.slides[activeIndex];
		const title = currentSlide.getAttribute("data-title");
		const subtitle = currentSlide.getAttribute("data-subtitle");

		const titleContainer = document.querySelector(".slide-title");
		const subtitleContainer = document.querySelector(".slide-subtitle");

		titleContainer.classList.add("animate-out");
		subtitleContainer.classList.add("animate-out");

		setTimeout(() => {
			titleContainer.innerText = title;
			subtitleContainer.innerText = subtitle;

			titleContainer.classList.remove("animate-out");
			subtitleContainer.classList.remove("animate-out");
		}, 650);
	};

	return (
		<div className="block-features-slider">
			<div className="bg-l"></div>
			<div className="bg-r"></div>

			<div className="container">
				<div className="graphic" id="features-slider-player"></div>

				<div className="content">
					<div className="slide-title">{slides[0].title}</div>
					<div className="slide-subtitle">{slides[0].subtitle}</div>

					<div className="feature-list-wrap">
						<Swiper
							modules={[Navigation, Pagination, Scrollbar, A11y]}
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
									<SwiperSlide
										key={index}
										data-title={slide.title}
										data-subtitle={slide.subtitle}
									>
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
