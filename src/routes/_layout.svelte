<script context="module">
	import neoFetch from "neoFetch";
	import errorFetch from "errorFetch";
	import { languages } from "store";
	export async function preload(page) {
		try {
			languages.set(await neoFetch(this.fetch, page, "/languages"));
		} catch (e) {
			return errorFetch(this, e);
		}
	}

	String.prototype.capitalize = function () {
		return this.replace(/\w\S*/g, (w) =>
			w.replace(/^\w/, (c) => c.toUpperCase())
		);
	};
</script>

<script>
	import { theme } from "theme";

	$: if (process.browser) {
		$theme = document.cookie
			? document.cookie
					.split("; ")
					.find((row) => row.startsWith("theme"))
					.split("=")[1]
			: "dark";

		if ($theme == "dark") {
			document.body.className = document.body.className.replace(
				"light",
				"dark"
			);
		} else {
			document.body.className = document.body.className.replace(
				"dark",
				"light"
			);
		}

		theme.useCookie();
	}
</script>

<svelte:head>
	<meta property="og:site_name" content="Omni Atlas" />
</svelte:head>

<slot />
