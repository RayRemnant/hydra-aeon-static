<script>
	import { _ } from "svelte-i18n";
	import { schema } from "schema";

	export let language, region, slug, data;
	let category = data;

	//guides
	//how to
	//reviews

	$: {
		schema.update({
			breadcrumbs: [
				{ name: "Blog", path: "/blog/" },
				{ name: category.title, path: "/blog/" + slug + "/" },
			],
		});
	}

	category.meta.title =
		category.meta.title ||
		category.title + " - " + $_("the complete guide").capitalize();

	import Meta from "Meta";
	import BoxLinks from "BoxLinks";
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

	{#each Object.entries(category.tags) as [index, tag]}
		<BoxLinks {language} {region} {...tag} />
	{/each}
</article>
