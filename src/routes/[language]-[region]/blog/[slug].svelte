<script context="module">
	import neoFetch from "neoFetch";
	import errorFetch from "errorFetch";
	export async function preload({ path, params }, { timestamp }) {
		//console.log(process.browser);

		const { language, region, slug } = params;

		try {
			var data = await neoFetch(this.fetch, path);
			//console.log(data);
		} catch (e) {
			console.log(e);
			return errorFetch(this, e);
		}

		//console.log(data);
		return { language, region, slug, data, timestamp };
	}

	import Category from "./_components/Category.svelte";
	import Post from "./_components/Post.svelte";
	import Tag from "./_components/Tag.svelte";
</script>

<script>
	export let language, region, slug, data, timestamp;
	let components = {
		post: Post,
		category: Category,
		tag: Tag,
	};
</script>

<svelte:component
	this={components[data.type]}
	{language}
	{region}
	{slug}
	{data}
	{timestamp}
/>

<style>
	:global(.breadcrumbs) {
		font-size: 0.9rem;
		text-align: center;
		margin-bottom: 0.75rem;
		cursor: default;
	}

	:global(.breadcrumbs a) {
		color: var(--accent-color_1);
		transition: 0.2s ease color;
	}

	:global(.breadcrumbs a:hover) {
		color: var(--accent-color_3);
	}

	:global(.text #time-updated) {
		text-align: center;
		font-size: 1rem;
	}
</style>
