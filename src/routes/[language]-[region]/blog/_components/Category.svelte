<script>
	export let language, region, slug, data;
	let category = data;

	//guides
	//how to
	//reviews

	import { schema } from "schema";
	$: {
		schema.update({
			breadcrumbs: [
				{ name: "Blog", path: "/blog/" },
				{ name: category.title, path: "/blog/" + slug + "/" },
			],
		});
	}

	import Meta from "Meta";
	import BuyingGuides from "BuyingGuides";
</script>

<Meta
	{...category.meta}
	time={category.time}
	categories={[category.title]}
	tags={category.tags || []}
	hreflangs={category.hreflangs}
/>

<nav class="breadcrumbs">
	<a rel="preload" href="{language}-{region}/blog/">Blog</a> ›
	<a
		rel="preload"
		href="{language}-{region}/blog/{category.title
			.toLowerCase()
			.replace(/ +/gi, '-')}/">{category.title}</a
	>
</nav>

<article class="text">
	<h1>{category.title}</h1>

	<section class="category-description">
		{@html category.content}
	</section>

	<BuyingGuides {language} {region} {...category.buyingGuides} />
</article>
