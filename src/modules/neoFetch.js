import get from "cms/get";

export default async (functionName, { host, params, path, ...other }) => {
	const { language, region } = params;
	try {
		var data = await get[functionName]({ ...params, ...other });
	} catch (e) {
		console.log(e);
	}
	/* let res = await fetch(`${process.env.SERVER_API}/cms${path}`, {
		headers: {
			Authorization: process.env.SERVER_API_AUTH,
		},
	}); */

	try {
		if (data) {
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
	} catch (e) {
		console.log(e);
	}

	/* console.log("FETCH FAIL");
	let e = new Error(path);
	e.name = "NOT FOUND";
	e.status = 404;
	console.log(e);
	throw e; */
};
