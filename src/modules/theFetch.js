//If you want to switch back to an online solution, just set this as the only neoFetch

export default async (
	fetch,
	{ host, params, path },
	staticPath = undefined
) => {
	const { language, region } = params;
	path = staticPath || path;

	//console.log(`${process.env.SERVER_API}/cms${path}`);

	let res = await fetch(`${process.env.SERVER_API}/cms${path}`, {
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
			.replace(/<PATH>/gi, path)
			.replace(
				/http:\/\/<BLOG>|http:\/\/&lt;BLOG&gt;|<BLOG>|&lt;BLOG&gt;/gi,
				"https://" + host + `/${language}-${region}/blog/`
			);

		return JSON.parse(data);
	}

	console.log("FETCH FAIL");
	let e = new Error(`${process.env.SERVER_API}/cms${path}`);
	e.name = "NOT FOUND";
	e.status = 404;
	console.log(e);
	throw e;
};
