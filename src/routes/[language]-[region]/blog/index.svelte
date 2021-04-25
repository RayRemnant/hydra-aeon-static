<script context="module">
	import { _ } from "svelte-i18n";
	import neoFetch from "neoFetch";
	import errorFetch from "errorFetch";
	export async function preload(page, session) {
		//console.log(process.browser);

		const { language, region } = page.params;

		try {
			var data = await neoFetch("blog", page);
		} catch (e) {
			return errorFetch(this, e);
		}

		return { language, region, ...data };
	}

	import Meta from "Meta";
	import BoxLinks from "BoxLinks";
</script>

<script>
	export let language, region, meta, hreflangs, categories;
	meta.title = meta.title || "Blog | Omni Atlas";
</script>

<Meta {...meta} {hreflangs} />

<h1>Blog</h1>

{#if categories != undefined}
	{#each categories as category}
		<article class="blog-category">
			<h1>
				<a href="{language}-{region}/blog/{category.slug}/" rel="prefetch">
					{category.title}</a
				>
				<hr />
			</h1>
			{#if Object.keys(category.tags).length > 0}
				{#each Object.entries(category.tags) as [index, tag]}
					<BoxLinks {language} {region} {...tag} />
				{/each}
			{:else}
				<p>{$_("coming soon").capitalize()}!</p>
			{/if}
		</article>
	{/each}
{/if}

<style>
	:global(.blog-category) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		border-radius: 1rem;
		padding: 1rem;
		margin-bottom: 2.5rem;
	}

	:global(.blog-category h1 a) {
		display: block;
		padding-bottom: 0.75rem;

		text-decoration: none;
	}

	:global(.blog-category h1 hr) {
		width: 44%;
		margin: auto;
	}

	:global(.blog-category h1) {
		width: 100%;
		font-size: 2.25rem;
		text-align: center;
		margin: 0;
	}

	:global(.blog-category > p) {
		margin-top: 0.5rem;
	}

	:global(.dark .blog-category) {
		background-color: #333;
	}

	:global(.light .blog-category) {
		background-color: #eee;
	}
</style>
