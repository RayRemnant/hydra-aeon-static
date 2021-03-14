<script context="module">
	import neoFetch from "neoFetch";
	import errorFetch from "errorFetch";
	export async function preload({ path }) {
		try {
			var data = await neoFetch(this.fetch, path);
			//console.log(data);
		} catch (e) {
			console.log(e);
			return errorFetch(this, e);
		}

		return { ...data };
	}

	import { _ } from "svelte-i18n";
	import Figure from "Figure";
	import Meta from "Meta";
</script>

<script>
	export let meta;
</script>

<Meta {...meta} />

<article class="page">
	<h3>{$_("under construction").capitalize() + "..."}</h3>
	<Figure
		name="under-construction"
		height="750"
		alt={$_("under construction").capitalize() + "..."}
		directory="static"
		types={["webp", "png"]}
	/>
</article>

<style>
	:global(.tools article) {
		text-align: center;
	}

	:global(.tools picture) {
		max-height: 75vh;
	}
</style>
