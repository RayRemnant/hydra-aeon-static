<script>
	import { stores } from "@sapper/app";
	const { page, session } = stores();
	const { mediaHost } = $session;

	const mediaHostUrl = `https://${mediaHost.cdn}/${mediaHost.directory}/${mediaHost.bucket}/`;

	export let segment;

	import { schema } from "schema";

	var output = "";
	$: {
		const { host, path, params } = $page;
		const { language, region } = params;
		const prePath = language && region ? `/${language}-${region}` : "";

		output = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[`;

		if ($schema.breadcrumbs.length > 0) {
			output += `{"@type": "BreadcrumbList","itemListElement":[`;
			for (let i in $schema.breadcrumbs) {
				let { name, path: _path } = $schema.breadcrumbs[i];
				let index = parseInt(i) + 1;
				output += `{"@type":"ListItem","position":${index},"name":"${name}","item":"${
					"https://" + host + prePath + _path
				}"}`;
				output += $schema.breadcrumbs.length == index ? "" : ",";
			}
			output += "]}";
		} else {
			output += `{"@type":"BreadcrumbList","itemListElement": [`;
			output += `{"@type":"ListItem","position": 1,"name":"${
				typeof segment == "string"
					? segment.capitalize()
					: "Welcome"
			}","item":"${"https://" + host + path}"}`;
			output += "]}";
		}

		if ($schema.organization) {
			output += `,{"@type": "Organization","url": "https://${host}","logo": "${mediaHostUrl}static/omni-atlas-logo.png"}`;
		}

		if ($schema.article) {
			const { title, image } = $schema.article;

			output += `,{"@type": "Article","headline": "${title}"`;

			if (image) {
				output += `,"image": ["${image.replace(
					"content/",
					"content/1x1/"
				)}.jpg","${image.replace(
					"content/",
					"content/4x3/"
				)}.jpg","${image.replace(
					"content/",
					"content/16x9/"
				)}.jpg"]`;
			}
			output += "}";
		}

		output += `]}<` + `\/script>`;
	}
</script>

{@html output}
