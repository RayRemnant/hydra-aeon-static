<script>
	import { stores } from "@sapper/app";
	const { session } = stores();
	const { mediaHost } = $session;
	const mediaHostUrl = `https://${mediaHost.cdn}/${mediaHost.directory}/${mediaHost.bucket}/`;

	export let classes = undefined,
		width = undefined,
		height = undefined,
		alt,
		directory = "",
		name = "placeholder",
		types,
		loading = undefined;

	if ((directory && directory == "static") || name == "placeholder") {
		directory = mediaHostUrl + "static/";
	}

	//TO-DO: implement jpeg testing through reversing of the array order
</script>

<figure>
	{#if classes}
		<picture
			class={classes}
			style="{width ? `width:${width}px;` : ''}{height
				? `height:${height}px;`
				: ''}"
			>{#each types.reverse() as type}
				<source
					srcset="{directory}{name}.{type}"
					type="image/{type == 'jpg' ? 'jpeg' : type}"
				/>
			{/each}
			<img {loading} src="{directory}{name}.{types[0]}" {alt} />
		</picture>
	{:else}
		<picture
			style="{width ? `width:${width}px;` : ''}{height
				? `height:${height}px;`
				: ''}"
			>{#each types.reverse() as type}
				<source
					srcset="{directory}{name}.{type}"
					type="image/{type == 'jpg' ? 'jpeg' : type}"
				/>
			{/each}
			<img {loading} src="{directory}{name}.{types[0]}" {alt} />
		</picture>
	{/if}
</figure>

<style>
	:global(figure) {
		margin-block-start: 0;
		margin-block-end: 0;
		margin-inline-start: 0;
		margin-inline-end: 0;
	}

	:global(figure.alignright) {
		float: right;
		margin-left: 10px;
		max-width: 50%;
	}

	:global(figure.alignleft) {
		float: left;
		margin-right: 10px;
		max-width: 50%;
	}

	:global(picture) {
		display: flex;

		justify-content: center;
		align-items: center;
		margin: auto;
		width: 100%;
		height: 100%;
		max-width: 100%;
		max-height: 100%;
	}

	:global(img) {
		max-width: 100%;
		max-height: 100%;
	}

	:global(.dark main figure) {
		filter: brightness(0.85);
	}

	:global(.text figure) {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	:global(main picture, main img) {
		border-radius: 1.5rem;
	}

	@media (max-width: 555px) {
		:global(figure.alignleft, figure.alignright) {
			float: none;
			max-width: 100%;
			margin-left: auto;
			margin-right: auto;
		}
	}

	@media (max-width: 1000px) {
		:global(.text picture) {
			min-height: 175px;
			max-height: 25vh;
		}
	}
</style>
