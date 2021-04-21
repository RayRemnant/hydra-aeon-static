import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV } = process.env;

const dev = NODE_ENV === "development";

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv("static", { dev }),
		sapper.middleware({
			session: (req, res) => ({
				/* user: req.user, */
				/* themeCookie: req.headers.cookie
					? req.headers.cookie
							.split("; ")
							.find((row) => row.startsWith("theme"))
							.split("=")[1]
					: "dark", */
				mediaHost: {
					cdn: process.env.MEDIA_HOST_CDN,
					directory: process.env.MEDIA_HOST_DIRECTORY,
					bucket: process.env.MEDIA_HOST_BUCKET,
				},
				timestamp: process.env.SAPPER_TIMESTAMP,
			}),
		})
	)
	.listen(PORT, (err) => {
		if (err) console.log("error", err);
	});
