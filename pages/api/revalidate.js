export default async function handler(req, res) {
	if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
		return res.status(401).json({ message: "Invalid token" });
	}

	try {
		await res.revalidate(req.query.path);
		return res.json({ revalidated: req.query.path });
	} catch (err) {
		return res.status(500).send("Error revalidating " + req.query.path);
	}
}
