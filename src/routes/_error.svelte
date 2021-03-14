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
	<Figure
		directory="static"
		name="omni-atlas-logo"
		types={["png", "webp"]}
		alt="Omni Atlas Logo"
		height="123"
	/>
	<br />

	{#if status == 404}
		<h1>404 - Not Found</h1>
		<p>Sorry, that page doesn't exist!</p>
	{:else}
		<h1>Oops, something went wrong.</h1>
		<p>Try reloading the page!</p>
	{/if}

	{#if dev && error.stack}
		<p>{error.message}</p>
		<pre>{error.stack}</pre>
	{/if}

	<a class="welcome-link" href="/">Back to welcome page</a>
</main>

<footer>
	<Footer />
</footer>

<style>
	:global(main.error) {
		text-align: center;
	}

	:global(.error .welcome-link) {
		display: block;
		margin-top: 3rem;
		font-size: 2rem;
		color: #5090ff;
	}
</style>
