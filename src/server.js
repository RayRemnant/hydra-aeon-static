import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
const axios = require("axios");

var http = require("http");
const serverApi = new URL(process.env.SERVER_API);

http
	.request({
		hostname: serverApi.hostname,
		path: "/cms/prefetch",
		port: serverApi.port,
		headers: { Authorization: process.env.SERVER_API_AUTH },
	})
	.end();

const { PORT, NODE_ENV } = process.env;

const dev = NODE_ENV === "development";

(async () => {
	try {
		let result = await axios.get(
			process.env.SERVER_API + "/db/getEnvVar/REGIONS",
			{
				headers: {
					Authorization: process.env.SERVER_API_AUTH,
				},
			}
		);
		if (result.status == 200) {
			process.env.REGIONS = result.data;
		}

		//console.log(JSON.stringify(process.env.REGIONS));
	} catch (e) {
		console.log("getEnvVar ERROR: " + e);
	}
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
					regions: process.env.REGIONS,
				}),
			})
		)
		.listen(PORT, (err) => {
			if (err) console.log("error", err);
		});
})();
