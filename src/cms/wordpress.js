import axios from "axios";
const wordpressHost = process.env.WORDPRESS_HOST + "/wp-json/wp/v2/";

const toCamelCase = (object) => {
	let newObject = {};
	for (let key in object) {
		//console.log(key);
		if (key == "full") {
			newObject["name"] = object[key];
			continue;
		}

		if (key == "warranty") {
			newObject[key] = object[key].registration || object[key].standard;
			continue;
		}
		let newKey = key.split(" ");

		for (let i = 1; i < newKey.length; i++) {
			newKey[i] = newKey[i].charAt(0).toUpperCase() + newKey[i].slice(1);
		}

		newKey = newKey.join("");
		newObject[newKey] = object[key];
	}
	return newObject;
};

const convertToRegion = (language) => {
	switch (language) {
		case "it":
			return "it";
		case "com":
			return "us";
	}
};

const { languagesAll, countries } = require("countries-list");
const countriesAll = countries;
const i18nCountries = require("i18n-iso-countries");

(async () => {
	await axios({ url: "pages", baseURL: wordpressHost });
	await axios({ url: "categories", baseURL: wordpressHost });
	await axios({ url: "tags", baseURL: wordpressHost });
	await axios({ url: "posts", baseURL: wordpressHost });
	try {
		await axios.post(
			process.env.PANOPTES_HOST + "image/generateAll",
			{
				prefix: "content/",
			},
			{ headers: { Authorization: process.env.PANOPTES_BASIC_AUTH } }
		);
	} catch (e) {
		console.log("PANOPTES UNABLE TO CONNECT");
	}
})();

const getLanguagesRegions = async () => {
	let languages = process.env.LANGUAGES
		? JSON.parse(process.env.LANGUAGES)
		: [];

	//converting array of strings in array of objects with data from modules
	//EX: [ { code: 'it', name: 'Italian', native: 'Italiano' } ]
	for (let index in languages) {
		languages[index] = {
			code: languages[index],
			...languagesAll[languages[index]],
		};
	}

	let regions = [process.env.REGIONS];
	//converting array of strings in array of objects with data from modules
	//EX: [{"code":"it","name":"Italy","native":"Italia","continent":"EU","currency":"EUR","languages":["it"],"emoji":"��","emojiU":"U+1F1EE U+1F1F9"}]
	for (let index in regions) {
		regions[index] = {
			code: regions[index],
			...countriesAll[regions[index].toUpperCase()],
		};

		delete regions[index].phone;
		delete regions[index].capital;
		delete regions[index].emoji;
		delete regions[index].emojiU;
	}

	for (let language of languages) {
		language.regions = regions;

		//sort languages based on the speaking languages of the region / country
		language.regions.sort((a, b) => {
			if (a.languages.includes(language.code)) {
				return -1;
			} else if (b.languages.includes(language.code)) {
				return 1;
			}
			return 0;
		});

		for (let region of language.regions) {
			region.native = i18nCountries.getName(region.code, language.code); //get name of the country in the current language
		}
	}
	//console.log(JSON.stringify(languages));
	//console.log(JSON.stringify(regions));
	return languages;
};

//CAREFUL: you need to visit wp-json/wp/v2/<taxonomy> in order for meta to be update. Code is in rest_api_init.

const get = async ({
	region,
	contentType,
	filters = [],
	fields = [],
	perPage,
}) => {
	const regionList = [process.env.REGIONS];
	if (!regionList.includes(region)) {
		let e = new Error(region + "\n" + JSON.stringify(filters));
		e.name = "INVALID REGION";
		e.status = 404;
		throw e;
	}

	let path = contentType;

	//filter[meta_query][0][key]=lang&filter[meta_query][0][value]

	path += "?";

	filters.forEach((filter, index) => {
		path +=
			"filter[meta_query][" +
			index +
			"][key]=" +
			filter.key +
			(["categories", "tags"].includes(filter.key)
				? "&filter[meta_query][" + index + "][compare]=LIKE"
				: "") +
			"&filter[meta_query][" +
			index +
			"][value]=" +
			filter.value +
			"&";
	});

	path += "_fields=";
	if (fields.length) {
		for (let field of fields) {
			path += "atlas." + field + ",";
		}
	} else {
		path += "atlas";
	}

	if (perPage) {
		path += "&per_page=" + perPage;
	}

	//console.log(path);

	let response = await axios({ url: path, baseURL: wordpressHost });

	/* for (let x in response.headers) {
		console.log(x + " : " + response.headers[x]);
	} */

	//console.log(JSON.stringify(response.headers));

	if (response.headers["x-wp-total"] == 0) {
		let e = new Error(wordpressHost + path);
		e.name = "NOT FOUND";
		e.status = 404;
		//console.log(e);
		throw e;
	}

	//console.log(data);

	return response.data;
};

const getMenu = async ({
	language = undefined,
	region = undefined, //not useful, but I'll keep it for consistency
	name = undefined,
	filters = [],
}) => {
	filters.push(
		{
			key: "language",
			value: language,
		},
		{
			key: "menu",
			value: name,
		}
	);

	//console.log(filters);

	let result = {
		menu: await get({
			contentType: "pages",
			filters,
			fields: ["title", "slug"],
			region,
		}),
	};
	//console.log(result);

	result.menu = result.menu.map((item) => item.atlas);

	return result;
};

const getPage = async ({
	language = undefined,
	region = undefined, //not useful, but I'll keep it for consistency
	filters = [],
	slug,
}) => {
	filters.push(
		{
			key: "language",
			value: language,
		},
		{
			key: "slug",
			value: slug,
		}
	);

	//console.log(filters);

	let [{ atlas: page }] = await get({
		contentType: "pages",
		filters,
		fields: ["title", "meta", "content", "children"],
		region,
	});

	//console.log(page);

	return page;
};

const getCategoryIndex = async ({
	language = undefined,
	region = undefined,
	filters = [],
}) => {
	filters.push({
		key: "language",
		value: language,
	});

	let categoryIndex = await get({
		contentType: "categories",
		filters,
		fields: ["title", "slug"],
		region,
	});

	//console.log(categoryIndex);

	categoryIndex = categoryIndex.map((category) => category.atlas);

	categoryIndex = categoryIndex.filter(
		(category) => category.slug != "uncategorized"
	);

	return { categoryIndex };
};

const getCategoryList = async ({
	language = undefined,
	region = undefined, //not useful, but I'll keep it for consistency
	filters = [],
}) => {
	filters.push({
		key: "language",
		value: language,
	});

	let { categoryIndex } = await getCategoryIndex({
		language,
		region, //not useful, but I'll keep it for consistency
		filters,
	});

	let categories = [];

	for (let { slug } of categoryIndex) {
		let category = await getCategory({
			language,
			region,
			slug,
			fields: ["title", "slug"],
		});
		categories.push(category);
	}

	return { categories };
};

const getCategory = async ({
	language = undefined, ////not useful, but I'll keep it for consistency
	region = undefined,
	filters = [],
	slug,
	fields = ["title", "hreflangs", "meta", "content"],
}) => {
	filters.push({
		key: "language",
		value: language,
	});
	try {
		var [{ atlas: category }] = await get({
			region,
			contentType: "categories",
			filters: [
				...filters,
				{
					key: "slug",
					value: slug,
				},
			],
			fields,
		});
	} catch (e) {
		if (e.status == 404) {
			console.log(e);
			return false;
		}
		throw e;
	}
	//console.log(category);

	try {
		let [{ atlas: tag }] = await get({
			contentType: "tags",
			filters: [
				...filters,
				{
					key: "group",
					value: "buying-guides",
				},
			],
			region,
			fields: ["title"],
		});

		category["buyingGuides"] = tag;

		let { posts } = await getPostList({
			language,
			region,
			filters: [
				{
					key: "categories",
					value: category.title,
				},
				{
					key: "tags",
					value: tag.title,
				},
			],
		});

		posts.forEach((post, index) => {
			//need another layer of filtering because the wordpress filter makes a stupid string comparison
			//"CPU" category will match "Dissipatore CPU", this will remove any wrong results.
			if (!post.categories.includes(category.title)) {
				delete posts[index];
				return;
			}
			if (post.cardinal) {
				delete post.cardinal;
				category["buyingGuides"].cardinal = post;
				delete posts[index];
			} else {
				return post;
			}
		});

		posts = posts.filter((post) => post != null);

		category["buyingGuides"].posts = posts;
	} catch (e) {
		if (e.status == 404) {
			console.log(e);
		} else {
			throw e;
		}
	}

	//GET LIST OF ALL TAGS ASSOCIATED - TO BE DEPRECATED
	/* category.tags = [];

const tagList = [
	{
		en: "Buying Guides",
		it: "Guide Acquisto",
	},
	/* {
		en: "Reviews",
		it: "Recensioni",
	},
];

	for (let slug of tagList) {
		try {
			var [{ atlas: tag }] = await get({
				contentType: "tags",
				filters: [
					...filters,
					{
						key: "slug",
						value: slug[language].replace(/ /gi, "-"),
					},
				],
				region,
			});

			delete tag.slug; //TO-DO: reimplment when making tag pages - see Notion for more details
			delete tag.language;
			delete tag.hreflangs;
			delete tag.meta;

			var { posts } = await getPostList({
				language,
				region,
				filters: [
					{
						key: "categories",
						value: category.name,
					},
					{
						key: "tags",
						value: slug[language],
					},
				],
			});
		} catch (e) {
			if (e.status == 404) {
				console.log(e);
				continue;
			}
			throw e;
		}

		category.tags.push({ ...tag, posts });
	} */

	//console.log(posts);

	category.type = "category";
	return category;
	//get posts by category and tag
	//https://staging.omni-atlas.com/wp-json/wp/v2/posts?tags=32&categories=26&_fields=atlas
};

const getPostList = async ({
	language = undefined,
	region = undefined, //not useful, but I'll keep it for consistency
	filters = [],
	perPage = undefined,
}) => {
	filters.push({
		key: "language",
		value: language,
	});

	let posts = await get({
		contentType: "posts",
		filters,
		fields: ["title", "author", "image", "slug", "categories", "cardinal"],
		perPage,
		region,
	});

	//console.log(posts);

	posts = posts.map((post) => post.atlas);

	return { posts };
};

const getPost = async ({
	language = undefined, ////not useful, but I'll keep it for consistency
	region = undefined,
	slug,
	fields = [
		"title",
		"author",
		"time",
		"image",
		"hreflangs",
		"categories",
		"tags",
		"group",
		"meta",
		"content",
	],
}) => {
	let project = {};
	const regionList = [process.env.REGIONS];
	for (let regionName of regionList) {
		if (regionName != region) {
			project["shop." + regionName] = 0;
		}
	}

	const filters = [
		{
			key: "slug",
			value: slug,
		},
		{
			key: "language",
			value: language,
		},
	];

	try {
		var [{ atlas: post }] = await get({
			region,
			contentType: "posts",
			filters,
			fields,
		});
	} catch (e) {
		if (e.status == 404) {
			console.log(e);
			return false;
		}
		throw e;
	}

	//console.log(post);

	if (!region) {
		//if region is not specified, get the default one for the current language
		region = convertToRegion(post.language);
	}

	let content = post.content
		.replace(/<script>|<\/script>/gi, "")
		.split("CONTENT_BLOCK_SEPARATOR");

	//console.log(content);

	post.content = [];

	for (let index in content) {
		let block = content[index];
		//console.log(block);
		if (!block) {
			continue;
		}

		try {
			var { query, text, blockType } = JSON.parse(block);

			try {
				query.region = region;

				query.project = {};

				//console.log(query);
				let result = await axios.post(
					process.env.SERVER_API + "/db/search",
					{ ...query },
					{
						headers: {
							Authorization: process.env.SERVER_API_AUTH,
						},
					}
				);

				if ((result.status = 200)) {
					var data = result.data;
				}

				if (!data.length || data.length < 1) {
					console.log("TEXT SEARCH NO RESULTS - " + JSON.stringify(query));
					continue;
				}

				let [document] = data;
				delete document._id;

				try {
					let imageDefault = document?.image?.default;
					document.image = document?.image[imageDefault][0];
					if (imageDefault == "fallback") {
						document.image.types = ["jpg"];
					}
				} catch (e) {
					//has no image
					document.image = false;
				}

				if (text) {
					let product = {
						brand: document.name.brand,
						name: document.name.full,
						warranty:
							document?.specs?.warranty?.registration ||
							document?.specs?.warranty?.standard,
						core: document?.specs?.core,
						thread: document?.specs?.thread,
						socket: document?.specs?.socket,
					};

					try {
						//TO-DO: maybe replace any {<variable>} left with something that hides doesn't seem so obviously bugged — or alert in case this condition happens
						for (let property in product) {
							if (!product[property]) {
								continue;
							}
							let toReplace = new RegExp("\\${" + property + "}", "gi");

							text = text.replace(toReplace, product[property]);
						}
					} catch (e) {
						console.log(e);
					}

					document.text = text;
				}

				document.blockType = blockType;

				post.content.push(document);

				//console.log(JSON.stringify(context));

				//console.log(JSON.stringify(document));
			} catch (e) {
				console.log(e);
			}
		} catch (e) {
			//console.log(e);
			post.content.push({
				html: block,
			});
		}
	}

	//(JSON.stringify(post));
	post.type = "post";
	return post;
};

export default {
	getLanguagesRegions,
	get,
	getMenu,
	getPage,
	getCategoryIndex,
	getCategoryList,
	getCategory,
	getPostList,
	getPost,
};
/* request({
	contentType: "posts",
	filters: [
		{
			key: "lang",
			value: "it",
		},
	],
}); */
