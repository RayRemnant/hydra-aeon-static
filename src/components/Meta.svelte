<script>
	import { languages } from "store";
	//console.log($languages[0].regions);
	import { stores } from "@sapper/app";
	const { page, session } = stores();

	const { mediaHost } = $session;
	const mediaHostUrl = `https://${mediaHost.cdn}/${mediaHost.directory}/${mediaHost.bucket}/static/`;

	const { host, path, params } = $page;
	const { language, region } = params;

	export let title,
		description = "",
		time = undefined,
		categories = [],
		tags = [],
		type = "article",
		hreflangs = undefined,
		facebook = {},
		twitter = {};

	facebook.img = facebook.img || mediaHostUrl + "omni-atlas-logo-facebook.png";
	twitter.img = twitter.img || mediaHostUrl + "omni-atlas-logo-twitter.png";
</script>

<svelte:head>
	<link rel="apple-touch-icon" href="{mediaHostUrl}omni-atlas-logo-apple.png" />

	<meta name="description" content={description} />

	<link rel="canonical" href="https://{host}{path}" />

	{#if language != undefined && region != undefined && !(path == `/${language}-${region}/`)}
		<title>{title} | Omni Atlas</title>

		<!-- POSTS / CATEGORIES -->
		{#if hreflangs != undefined}
			{#if time != undefined}
				<meta property="article:published_time" content={time.published} />
				<meta property="article:modified_time" content={time.modified} />
			{/if}
			{#each $languages as _language}
				{#if hreflangs[_language.code] != undefined}
					<link
						rel="alternate"
						hreflang={_language.code}
						href="https://{host}/{_language.code}-{_language.regions[0]
							.code}/blog/{hreflangs[_language.code]}/"
					/>

					{#each _language.regions as _region}
						<link
							rel="alternate"
							hreflang="{_language.code}-{_region.code}"
							href="https://{host}/{_language.code}-{_region.code}/blog/{hreflangs[
								_language.code
							]}/"
						/>
					{/each}
				{/if}
			{/each}
		{:else}
			<!-- PAGES -->
			{#each $languages as _language}
				<link
					rel="alternate"
					hreflang={_language.code}
					href="https://{host}{path.replace(
						language + '-' + region,
						_language.code + '-' + _language.regions[0].code
					)}"
				/>
				{#each _language.regions as _region}
					<link
						rel="alternate"
						hreflang="{_language.code}-{_region.code}"
						href="https://{host}{path.replace(
							language + '-' + region,
							_language.code + '-' + _region.code
						)}"
					/>
				{/each}
			{/each}
		{/if}

		{#if categories.length > 0}
			<meta property="og:section" content={categories[0]} />
		{/if}

		{#if tags.length > 0}
			{#each tags as tag}
				<meta property="og:tags" content={tag} />
			{/each}
		{/if}
	{:else}
		<!-- HOME / WELCOME -->
		<title>{title}</title>
		<link rel="alternate" hreflang="x-default" href="https://{host}" />
		{#each $languages as _language}
			<link
				rel="alternate"
				hreflang={_language.code}
				href="https://{host}/{_language.code}-{_language.regions[0].code}/"
			/>
			{#each _language.regions as _region}
				<link
					rel="alternate"
					hreflang="{_language.code}-{_region.code}"
					href="https://{host}/{_language.code}-{_region.code}/"
				/>
			{/each}
		{/each}
	{/if}

	<meta property="og:type" content={type} />
	<meta property="og:url" content="{'https://' + host}{path}" />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />

	<meta property="og:image" content={facebook.img} />
	<meta property="og:image:secure_url" content={facebook.img} />

	<meta property="og:image:type" content="image/png" />

	<meta property="og:image:height" content="512" />
	<meta property="og:image:alt" content={title} />

	<meta name="twitter:card" content="summary_large_image" />

	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	<meta name="twitter:image" content={twitter.img} />
	<meta name="twitter:image:alt" content={title} />

	<!-- <meta name="twitter:site" content="" />
	<meta name="twitter:creator" content="" /> -->
</svelte:head>
