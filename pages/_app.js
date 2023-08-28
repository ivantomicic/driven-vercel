import "../faust.config";
import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "@faustwp/core/dist/css/toolbar.css";

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();

	return (
		<FaustProvider pageProps={pageProps}>
			<button onClick={() => alert("👻")}>
				Click This Button For Alert
			</button>
			<Component {...pageProps} key={router.asPath} />
		</FaustProvider>
	);
}
