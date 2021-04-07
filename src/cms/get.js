import wordpress from "cms/wordpress";

const prefetch = async () => {
	await wordpress.prefetch();
	return true;
};

const languages = async () => {
	try {
		return await wordpress.getLanguagesRegions();
	} catch (e) {
		console.log(e);
	}
};

const home = async ({ language, region }) => {
	var categoryIndex = await wordpress.getCategoryIndex({ language, region });

	let [{ atlas: story }] = await wordpress.get({
		language,
		region,

		contentType: "pages",
		filters: [
			{
				key: "nativeSlug",
				value: "story",
			},
			{
				key: "language",
				value: language,
			},
		],
		fields: ["slug"],
	});

	let [{ atlas: meta }] = await wordpress.get({
		language,
		region,

		contentType: "pages",
		filters: [
			{
				key: "slug",
				value: "home",
			},
			{
				key: "language",
				value: language,
			},
		],
		fields: ["content", "meta"],
	});

	return { ...categoryIndex, story, ...meta };
};

const menu = async (params) => {
	return await wordpress.getMenu(params);
};

const page = async (params) => {
	return await wordpress.getPage(params);
};

//convert into data that is always loaded on the page. could not be limited only to the footer menu.

const blog = async (params) => {
	const categories = await wordpress.getCategoryList(params);
	let [{ atlas: meta }] = await wordpress.get({
		...params,
		...{
			contentType: "pages",
			filters: [
				{
					key: "slug",
					value: "blog",
				},
				{
					key: "language",
					value: params.language,
				},
			],
			fields: ["meta"],
		},
	});
	//TO-EVALUATE: maybe other requests, redefine layout

	return { ...categories, ...meta };
};

const blogContent = async (params) => {
	return (
		(await wordpress.getCategory(params)) || (await wordpress.getPost(params))
	);
};

export default { prefetch, languages, menu, home, page, blog, blogContent };
