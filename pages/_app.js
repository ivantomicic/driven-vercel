import "../faust.config";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { FaustProvider } from "@faustwp/core";
import "@faustwp/core/dist/css/toolbar.css";
import "../styles/stylesheets.scss";

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();

	return (
		<FaustProvider pageProps={pageProps}>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Component {...pageProps} key={router.asPath} />
		</FaustProvider>
	);
}
