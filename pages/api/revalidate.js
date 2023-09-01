export default async function handler(req, res) {
	if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
		return res.status(401).json({ message: "Invalid token" });
	}

	let path = req.query.path;

	// If path is empty or not provided, treat it as the homepage
	if (!path || path === "") {
		// Set path to a value that represents the homepage
		path = "/";
	}

	try {
		await res.revalidate(path);
		return res.json({ revalidated: true });
	} catch (err) {
		return res.status(500).send("Error revalidating");
	}
}
