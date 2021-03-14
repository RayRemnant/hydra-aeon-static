<script>
	export let language, region, slug, data, timestamp;

	let post = data;

	post.time.modified = new Date(
		timestamp
	).toISOString() /* .substring(0, 19) + "Z" */;

	const { timeZone } = Intl.DateTimeFormat().resolvedOptions() || undefined;

	import { schema } from "schema";
	$: {
		schema.update({
			breadcrumbs: [
				{ name: "Blog", path: "/blog/" },
				{
					name: post.categories[0],
					path: "/blog/" + post.categories[0].toLowerCase() + "/",
				},
				{ name: post.title, path: "/blog/" + slug + "/" },
			],
		});
	}

	import { _ } from "svelte-i18n";
	import Meta from "Meta";
	import PostProduct from "PostProduct";
</script>

<Meta
	{...post.meta}
	time={post.time}
	categories={post.categories || []}
	tags={post.tags || []}
	hreflangs={post.hreflangs}
/>

<nav class="breadcrumbs">
	<a rel="preload" href="{language}-{region}/blog/">Blog</a> ›
	<a
		rel="preload"
		href="{language}-{region}/blog/{post.categories[0]
			.toLowerCase()
			.replace(/ +/gi, '-')}/">{post.categories[0]}</a
	>
	› <a rel="preload" href="{language}-{region}/blog/{slug}/">{post.title}</a>
</nav>

<article class="text">
	<h1>{post.title}</h1>
	<p class="time-updated">
		{$_("updated on")}
		{new Intl.DateTimeFormat(`${language}-${region}`, {
			hour: "numeric",
			minute: "numeric",
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone,
		}).format(Date.parse(post.time.modified))}
	</p>
	{#each post.content as box, i}
		{#if box.html == undefined}
			<PostProduct {region} product={box} />
		{:else}
			{@html box.html || ""}
		{/if}
	{/each}
</article>
