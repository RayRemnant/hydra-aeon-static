//fetches data from static/data/
export default async (fetch,
	{ path },
	staticPath = undefined) => {

	path = staticPath || path;

	if (path.charAt(path.length - 1) == "/") {
		path = path.substring(0, path.length - 1);
	}

	//console.log(path + " SERVER FETCH STARTING...");

	if (process.browser === false) {

		const fs = require("fs");

		try {
			return JSON.parse(fs.readFileSync(`static/data${path}.json`).toString());
		} catch (e) {
			console.log(e)

		}
	}

	console.log("FETCH FAIL");
	let e = new Error(`${process.env.SERVER_API}/cms${path}`);
	e.name = "NOT FOUND";
	e.status = 404;
	throw e;
};