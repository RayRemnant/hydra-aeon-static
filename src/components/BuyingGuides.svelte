<script>
	export let language, region, title, cardinal, posts;
	import Figure from "Figure";
</script>

<article class="buying-guides">
	<h2>{title}</h2>
	<article>
		<a href="{language}-{region}/blog/{cardinal.slug}/" rel="prefetch">
			<Figure
				name={cardinal.image}
				types={["jpg", "webp"]}
				alt={cardinal.title}
				width="360"
				height="300"
			/>

			<h3>{cardinal.title}</h3></a
		>
	</article>
</article>

<style>
	:global(.buying-guides) {
		display: flex;
		flex-direction: column;
		max-width: 100%;
	}
	:global(.buying-guides article) {
		display: flex;
		align-self: center;
		justify-self: center;
		border-radius: 1.5rem;

		/*width: 500px;
 */

		max-width: 100%;
	}

	:global(.buying-guides h2) {
		font-size: 1.5rem;

		text-align: center;
	}

	:global(.buying-guides h3) {
		font-size: 1.25rem;
		margin: 1rem 0 0 0;

		text-align: center;
	}

	:global(.buying-guides a) {
		width: 100%;
		box-sizing: border-box;
		text-decoration: none;

		border-radius: 1.5rem;
		padding: 1rem;
	}

	:global(.buying-guides picture) {
		background-color: #fff;
	}

	:global(.dark .buying-guides article) {
		background-color: #444;
	}

	:global(.light .buying-guides article) {
		background-color: #ddd;
	}

	:global(.dark .buying-guides a, .light .buying-guides a) {
		color: inherit;
	}

	@media (hover: none) {
		:global(.buying-guides img) {
			max-height: 175px;
		}
	}
</style>
