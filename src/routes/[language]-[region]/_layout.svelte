<script context="module">
	import { setupI18n } from "i18n";
	import neoFetch from "neoFetch";
	import errorFetch from "errorFetch";
	export async function preload(page) {
		let { language, region } = page.params;
		setupI18n({ withLocale: language });

		try {
			//TO-DO: provide less data when languages become a lot
			/* 	var { languages } = await neoFetch(this.fetch, "/languages"); */
			var { menu } = await neoFetch("menu", { ...page, name: "footer" });
		} catch (e) {
			return errorFetch(this, e);
		}

		//console.log(data);

		return { language, region, menu };
	}

	import Schema from "Schema";
	import Header from "Header";
	import Footer from "Footer";
	import FixedBottom from "FixedBottom";
</script>

<script>
	export let segment, language, region, menu;
	//setting it up again for client-side
	setupI18n({ withLocale: language });
	import { theme } from "theme";
	import { schema } from "schema";

	$: {
		segment = segment || "home";
		schema.update({});
	}

	$: if (process.browser) {
		document.documentElement.lang = language;
	}
</script>

<svelte:head>
	<meta property="og:locale" content="{language}_{region.toUpperCase()}" />
</svelte:head>

<header class={segment}>
	<Header {segment} {language} {region} />
</header>

<main class={segment}>
	<slot />
</main>

<footer class={segment}>
	<Footer {language} {region} {menu} />
</footer>

<FixedBottom />

<Schema {segment} />
