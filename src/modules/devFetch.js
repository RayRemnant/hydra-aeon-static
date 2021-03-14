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

	let res = await fetch(`${process.env.SERVER_API}/cms${routePath}`, {
		headers: {
			Authorization: process.env.SERVER_API_AUTH,
		},
	});

	if (res.status == 200) {
		let data = await res.json();

		let toReplace = new RegExp(process.env.MEDIA_HOST_S3, "gi");

		data = JSON.stringify(data)
			.replace(
				toReplace,
				process.env.MEDIA_HOST_CDN + "/" + process.env.MEDIA_HOST_DIRECTORY
			)
			.replace(/<PATH>/gi, routePath + "/");

		return JSON.parse(data);
	}

	console.log("FETCH FAIL");
	let e = new Error(`${process.env.SERVER_API}/cms${routePath}`);
	e.name = "NOT FOUND";
	e.status = 404;
	console.log(e);
	throw e;
};
