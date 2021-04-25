<script>
	export let language,
		region,
		title,
		main = {},
		posts = [];

	import { _ } from "svelte-i18n";
	import Figure from "Figure";
</script>

{#if Object.keys(main).length > 0 || posts.length > 0}
	<article class="box-links">
		<h2>{title}</h2>

		{#if Object.keys(main).length > 0}
			<article class="main">
				<a href="{language}-{region}/blog/{main.slug}/" rel="prefetch">
					<Figure
						name={main.image}
						types={["jpg", "webp"]}
						alt={main.title}
						width="360"
						height="300"
					/>

					<h3>{main.title}</h3></a
				>
			</article>
		{/if}

		{#if posts.length > 0}
			<ul>
				{#each posts as post}
					<article>
						<a href="{language}-{region}/blog/{post.slug}/" rel="prefetch">
							<Figure
								name={post.image}
								types={["jpg", "webp"]}
								alt={post.title}
								width="240"
								height="200"
							/>

							<h3>{post.title}</h3></a
						>
					</article>
				{/each}
			</ul>
		{/if}
	</article>
{/if}

<style>
	:global(.box-links) {
		display: flex;
		flex-direction: column;
		max-width: 100%;
		width: 100%;
	}
	:global(.box-links article) {
		display: flex;
		align-self: center;
		justify-self: center;
		border-radius: 1.5rem;

		/*width: 500px;
 */

		max-width: 100%;
	}

	:global(.box-links ul) {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	:global(.box-links ul article) {
		max-width: 48%;
		margin: 1%;
	}

	:global(.box-links ul h3) {
		font-size: 1.1rem;
	}

	:global(.box-links h2) {
		font-size: 1.5rem;
		margin-top: 1rem;

		text-align: center;
	}

	:global(.box-links h3) {
		font-size: 1.25rem;
		margin: 1rem 0 0 0;

		text-align: center;
	}

	:global(.box-links a) {
		width: 100%;
		box-sizing: border-box;
		text-decoration: none;

		border-radius: 1.5rem;
		padding: 1rem;
	}

	:global(.box-links picture) {
		background-color: #fff;
	}

	:global(.dark .box-links article) {
		background-color: #444;
	}

	:global(.light .box-links article) {
		background-color: #ddd;
	}

	:global(.dark .box-links a, .light .box-links a) {
		color: inherit;
	}

	@media (max-width: 555px) {
		:global(.box-links ul article) {
			max-width: 100%;
			margin: 0;
		}
	}

	@media (hover: none) {
		:global(.box-links img) {
			max-height: 175px;
		}
	}
</style>
