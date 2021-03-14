export default async (fetch, routePath) => {
	/* if (routePath.charAt(routePath.length - 1) == "/") {
		let e = new Error();
		e.name = "REDIRECT";
		e.status = 301;
		e.url = routePath.substring(0, routePath.length - 1);
		//console.log(e.url);
		//TO-DO: move it to a more global solution. maybe Netlify will solve this?
		throw e;
	} */

	const nodePath = require("path");
	const fs = require("fs");

	if (routePath.charAt(routePath.length - 1) == "/") {
		routePath = routePath.substring(0, routePath.length - 1);
	}

	//console.log(routePath + " STARTING...");

	let res = "";

	try {
		res = fs.readFileSync(`__sapper__/export/data${routePath}.json`);
		/* console.log("READ OK"); */
		return JSON.parse(res.toString());
	} catch (e) {
		if (process.browser === false) {
			console.log(
				`${process.env.SERVER_API}/cms${routePath} "FETCHING FROM API...`
			);
			res = await fetch(`${process.env.SERVER_API}/cms${routePath}`, {
				headers: {
					Authorization: process.env.SERVER_API_AUTH,
				},
			});

			if (res.status == 200) {
				//console.log("FETCH OK");
				let data = await res.json();

				let toReplace = new RegExp(process.env.MEDIA_HOST_S3, "gi");

				data = JSON.stringify(data)
					.replace(
						toReplace,
						process.env.MEDIA_HOST_CDN + "/" + process.env.MEDIA_HOST_DIRECTORY
					)
					.replace(/<PATH>/gi, routePath + "/");
				//console.log(JSON.stringify(data));

				//dataToWrite = dataToWrite.replace(/Ray Remnant/gi, "borger");

				const dirPath = nodePath.dirname(`__sapper__/export/data${routePath}`);

				fs.existsSync(dirPath) || fs.mkdirSync(dirPath, { recursive: true });

				await fs.writeFile(
					`__sapper__/export/data${routePath}.json`,
					`${data}`,
					"utf8",
					function (err) {
						if (err) return console.log(err);
						console.log(`${routePath} WRITE OK`);
					}
				);
				return JSON.parse(data);
			}
		}
	}

	console.log("FETCH FAIL");
	let e = new Error(`${process.env.SERVER_API}/cms${routePath}`);
	e.name = "NOT FOUND";
	e.status = 404;
	throw e;
};
