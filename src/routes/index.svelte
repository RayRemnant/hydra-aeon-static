<script context="module">
	import Meta from "Meta";
	import Figure from "Figure";
	import Footer from "Footer";
</script>

<script>
	import { stores } from "@sapper/app";
	const { page, session } = stores();
	const { host } = $page;
	const { mediaHost } = $session;

	const mediaHostUrl = `https://${mediaHost.cdn}/${mediaHost.directory}/${mediaHost.bucket}/`;
	const schema =
		`<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","url":"https://${host}","logo":"${mediaHostUrl}static/omni-atlas-logo.png"}<` +
		`\/script>`;

	import { languages } from "store";
	const title = "Omni Atlas | Welcome";
</script>

<Meta {title} description="Welcome to Omni Atlas, a new way of doing information." />

<main>
	<article class="welcome-page">
		<Figure
			directory="static"
			name="omni-atlas-logo"
			types={["png", "webp"]}
			alt="Omni Atlas Logo"
			width="123"
			height="123"
		/>
		<br />
		<h1>Omni Atlas</h1>
		<h2>Welcome!</h2>
		<p>To begin, choose the language and region that your prefer.</p>
		<br />
		{#if $languages.length}
			{#each $languages as language}
				<h2>{language.native}</h2>
				<ul>
					{#each language.regions as region}
						<li>
							<a rel="prefetch" href="/{language.code}-{region.code}/">
								<Figure
									height="32"
									alt="{region.name} flag"
									directory="static"
									name="flag-{region.name.toLowerCase()}"
									types={["png", "webp"]}
								/>
								<p>
									&nbsp;<span>{region.native} </span>
									<span class="go-icon" />
								</p></a
							>
						</li>
					{/each}
				</ul>
			{/each}
		{/if}
	</article>
</main>

<footer>
	<Footer />
</footer>

{@html schema}

<style>
	:global(.welcome-page) {
		text-align: center;
		cursor: default;
		min-height: 55vh;
	}

	:global(.welcome-page h1) {
		margin-bottom: 3rem;
	}

	/* :global(.welcome-page h1) {
		font-size: 1.75rem;
	} */

	/* :global(.welcome-page li) {
		
	} */

	:global(.welcome-page a) {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.welcome-page img) {
		border-radius: 0;
	}

	:global(.welcome-page h1, .welcome-page h2) {
		font-family: Montserrat;
	}
</style>
