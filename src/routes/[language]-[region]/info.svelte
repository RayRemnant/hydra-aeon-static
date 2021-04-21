<script context="module">
	import neoFetch from "neoFetch";
	import errorFetch from "errorFetch";
	export async function preload(page) {
		const { language, region } = page.params;

		try {
			var data = await neoFetch(this.fetch, page);
			//console.log(data);
		} catch (e) {
			console.log(e);
			return errorFetch(this, e);
		}
		return { language, region, ...data };
	}

	import Meta from "Meta";
</script>

<script>
	export let language, region, meta, children;
</script>

<Meta {...meta} />

<h1>Info</h1>

<nav>
	<ul>
		{#each children as child}
			<li>
				<a rel="prefetch" href="{language}-{region}/{child.slug}/"
					>{child.name}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<style>
	:global(main.info) {
		padding-bottom: 0;
	}

	:global(main.info ul) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: inherit;
	}

	:global(main.info nav li) {
		font-size: 1.75rem;
		margin: 1rem 0;
		text-align: center;
	}

	@media (hover: none) {
		:global(footer.info) {
			display: flex;
			padding: 0 5% 5% 5%;
			flex-direction: column-reverse;
		}

		:global(footer.info nav) {
			margin-top: 0;
		}

		:global(footer.info nav ul) {
			font-size: 1.75rem;
			flex-direction: column;
		}

		:global(footer.info nav li) {
			margin: 1rem 0;
		}
	}
</style>
