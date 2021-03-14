<script context="module">
	//latest articles
	//categories
	//nice deals on products
	//latest products?
	import neoFetch from "neoFetch";
	import errorFetch from "errorFetch";
	export async function preload({ path, params }, session) {
		//console.log(process.browser);

		const { language, region } = params;

		try {
			var data = await neoFetch(this.fetch, path);
		} catch (e) {
			return errorFetch(this, e);
		}

		return { language, region, ...data };
	}
	/* import { schema } from "schema";
	schema.update({
		breadcrumbs: [{ name: "Home", path: "/home" }],
		organization: "true",
	}); */
	import Meta from "Meta";
	import Figure from "Figure";
</script>

<script>
	//import Category from "./blog/_components/Category.svelte";
	export let language, region, content, story, categoryIndex, meta;
</script>

<Meta {...meta} />

<article>
	<h1>
		<Figure
			directory="static"
			classes="home-logo"
			width="100%"
			height="120px"
			alt="Omni Atlas"
			name="omni-atlas-logo-text"
			types={["png", "webp"]}
		/>
	</h1>

	<section class="home-story">
		{@html content || ""}
		<!-- svelte-ignore a11y-missing-content -->
		<a class="more-icon" href="{language}-{region}/{story.slug}/" />
	</section>
</article>

<hr />

<section class="home-category">
	<nav>
		<ul>
			{#each categoryIndex as category}
				<li>
					<a href="{language}-{region}/blog/{category.slug}/">{category.title}</a>
				</li>
			{/each}
		</ul>
	</nav>
	<hr />
	<!-- svelte-ignore a11y-missing-content -->
	<a class="more-dots" href="{language}-{region}/blog/" />
</section>

<style>
	:global(.home-logo) {
		text-align: center;
	}

	:global(.home-logo img) {
		width: 100%;
		height: 6rem;
		object-fit: contain;
		margin: 4.5rem 0;
	}

	:global(.home-story) {
		text-align: center;
		font-family: Montserrat;
		font-size: 1.25rem;
		line-height: 1.8;
	}

	:global(.home-story p) {
		margin-bottom: 1rem;
	}

	:global(.home-category) {
		display: flex;
		flex-direction: column;
		border-radius: 1rem;
		padding: 1rem 2rem;

		margin: 3rem 0 0 0;
	}

	:global(.home-category ul) {
		display: flex;
		justify-content: center;

		margin-bottom: 2rem;
	}

	:global(.home-category li) {
		list-style-type: none;
		margin: 0.5rem;
	}

	:global(.home-category li a) {
		display: block;
		text-align: center;
		text-decoration: none;
		font-family: Montserrat;
		font-size: 1.25rem;
		line-height: 2.2;

		border-radius: 1rem;
		padding: 1rem;
	}

	:global(.home-category hr) {
		margin-inline-start: 44%;
		margin-inline-end: 44%;
	}

	:global(.dark .home-logo img) {
		filter: brightness(173%);
	}

	:global(.light .home-logo img) {
		filter: brightness(93%);
	}

	:global(.dark .home-category hr) {
		background-color: #666;
	}

	:global(.light .home-category hr) {
		background-color: #bbb;
	}

	:global(.dark .home-category) {
		background-color: #333;
	}

	:global(.light .home-category) {
		background-color: #eee;
	}

	:global(.dark .home-category nav a) {
		background-color: #555;
	}

	:global(.light .home-category nav a) {
		background-color: #fff;
	}

	@media (hover: none) {
		:global(.home-logo) {
			background-image: url("https://media.omni-atlas.com/file/situla/static/omni-atlas-logo.webp");
			background-size: 7.5rem;
			background-position: 50% 1%;
			background-repeat: no-repeat;
			padding-top: 6vmax;
		}
	}
</style>
