<script context="module">
	import neoFetch from "neoFetch";
	import errorFetch from "errorFetch";
	export async function preload({ path, params }, session) {
		const { slug } = params;
		try {
			var data = await neoFetch(this.fetch, path);
			//console.log(data);
		} catch (e) {
			console.log(e);
			return errorFetch(this, e);
		}

		//console.log(data);
		return { slug, ...data };
	}
</script>

<script>
	export let slug, title, content, meta;
	meta.title = meta.title || title;
	import { schema } from "schema";
	$: {
		schema.update({
			breadcrumbs: [
				{ name: "Info", path: "/info/" },
				{ name: title, path: "/" + slug + "/" },
			],
		});
	}

	import Meta from "Meta";
</script>

<Meta {...meta} />

<article class="text">
	<h1>{title}</h1>
	{@html content}
</article>
