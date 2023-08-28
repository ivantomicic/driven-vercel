export const getBackgroundImageStyles = (image) => {
	const { url, focalPoint } = image;

	return {
		backgroundImage: `url(${url})`,
		backgroundPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
	};
};

export const PictureTag = (props) => {
	const image = props.image;
	return <img src={image.url} className={props.className} />;
};
