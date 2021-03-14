export default async (fetch, routePath) => {
	if (routePath.charAt(routePath.length - 1) == "/") {
		routePath = routePath.substring(0, routePath.length - 1);
	}

	let res = await fetch(`data${routePath}.json`);

	//console.log(`data${routePath}.json`);
	if (res.status == 200) {
		//console.log(routePath + " CACHE FETCH OK");
		let data = await res.json();
		return data;
	}

	console.log("FETCH FAIL");
	let e = new Error(routePath);
	e.name = "NOT FOUND";
	e.status = 404;
	throw e;
};
