import theFetch from "theFetch";
//fetches Janus-I and stores the data in static/data/
export default async (fetch,
	{ host, params, path },
	staticPath = undefined) => {

	path = staticPath || path;

	if (path.charAt(path.length - 1) == "/") {
		path = path.substring(0, path.length - 1);
	}

	//console.log(path + " SERVER FETCH STARTING...");

	let data = await theFetch(fetch,
		{ host, params, path },
		staticPath);

	//console.log(data)

	const nodePath = require("path");
	const fs = require("fs");

	if (process.browser === false) {
		try {
			const dirPath = nodePath.dirname(`static/data${path}`);

			fs.existsSync(dirPath) || fs.mkdirSync(dirPath, { recursive: true });

			await fs.writeFile(
				`static/data${path}.json`,
				`${JSON.stringify(data)}`,
				"utf8",
				function (err) {
					if (err) return console.log(err);
					console.log(`${path} WRITE OK`);
				}
			);

		} catch (e) {
			console.log(e)
		}
		return data;
	}

	console.log("FETCH FAIL");
	let e = new Error(`${process.env.SERVER_API}/cms${path}`);
	e.name = "NOT FOUND";
	e.status = 404;
	throw e;
};