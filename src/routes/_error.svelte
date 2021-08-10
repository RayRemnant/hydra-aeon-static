<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === "development";

	import Figure from "Figure";
	import Footer from "Footer";
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<main class="error">
	<a href="/">
		<Figure
			directory="static"
			name="omni-atlas-logo"
			types={["png", "webp"]}
			alt="Omni Atlas Logo"
			height="123"
		/>
	</a>
	<br />

	{#if status == 404}
		<h1>404 - Not Found</h1>
		<Figure
		name="404"
		alt="404"
		directory="static"
		types={["png", "webp"]}
		classes="illustration"
	/>
	{:else}
		<h1>Oops, something went wrong.</h1>
		<Figure
		name="500"
		alt="500"
		directory="static"
		types={["png", "webp"]}
		classes="illustration"
	/>
	{/if}

	{#if dev && error.stack}
		<p>{error.message}</p>
		<pre>{error.stack}</pre>
	{/if}

		<a class="welcome-link" href="/">Back to Welcome Page</a>
</main>

<footer>
	<Footer />
</footer>

<style>
	:global(main.error) {
		text-align: center;
	}

	:global(.error .welcome-link) {
		display: inline-block;
		margin: auto;
		text-align: center;
		padding: 1rem 2.5%;
		border-radius: 0.5rem;

		color: #fff;
		transition: 0.33s ease background-color;
		font-weight: bold;
		background-color:  var(--accent-color);
	}

	:global(.error .illustration){
		margin: 5rem 0;
	}

	:global(.error .welcome-link:hover) {
		background-color: var(--accent-color_2);
	}
</style>
