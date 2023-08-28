import "../faust.config";
import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import { WordPressBlocksProvider } from "@faustwp/blocks";
import blocks from "../wp-blocks";
import "@faustwp/core/dist/css/toolbar.css";
import "../styles/stylesheets.scss";

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();

	return (
		<FaustProvider pageProps={pageProps}>
			<button onClick={() => alert("👻")}>
				Click This Button For Alert
			</button>
			<WordPressBlocksProvider
				config={{
					blocks,
				}}
			>
				<Component {...pageProps} key={router.asPath} />
			</WordPressBlocksProvider>
		</FaustProvider>
	);
}
