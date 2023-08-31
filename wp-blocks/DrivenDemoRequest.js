import React, { useState } from "react";
import { gql } from "@apollo/client";
import { PictureTag } from "../utils/themeUtils";

export default function DrivenDemoRequest(props) {
	const { subtitle, title, image: rawImage } = props?.props?.attributes;
	const image = JSON.parse(rawImage);

	const [isLoading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		const sheetName = "Demo"; // Replace with your actual sheet name
		const successMessage = "Success"; // Replace with your actual success message

		const formData = new URLSearchParams({
			name,
			email,
			sheetName,
		});

		try {
			const response = await fetch(
				`https://script.google.com/macros/s/AKfycbwv02uQBsllcILZ-9ZRJs1CG1WlqIYStU60Fvae2quhgi0hlFiL8XdWceeT8ozArTvo/exec?${formData.toString()}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			);

			const data = await response.json();
			console.log("Success:", data);
			setLoading(false);
		} catch (error) {
			console.log("Error:", error);
			setLoading(false);
		}
	};

	return (
		<div className="block-demo-request">
			<div className="image">
				<PictureTag image={image} />
			</div>

			<div className="content">
				<div
					className="title"
					dangerouslySetInnerHTML={{ __html: title }}
				/>

				<p>{subtitle}</p>

				<form onSubmit={handleSubmit} data-gsheet="Demo">
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="email"
						placeholder="Email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button
						type="submit"
						className={`btn ${isLoading ? "btn--loading" : ""}`}
						disabled={isLoading}
					>
						Request Demo
					</button>
				</form>
			</div>
		</div>
	);
}

DrivenDemoRequest.fragments = {
	entry: gql`
		fragment DrivenDemoRequestFragment on DrivenDemoRequest {
			attributes {
				title
				subtitle
				image
			}
		}
	`,
	key: `DrivenDemoRequestFragment`,
};
