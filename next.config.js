const { withFaust, getWpHostname } = require("@faustwp/core");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: ["node_modules"],
	},
	images: {
		domains: [getWpHostname()],
	},
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			resourceQuery: /inline/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
};

module.exports = withFaust(nextConfig);
