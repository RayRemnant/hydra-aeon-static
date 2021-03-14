<script>
	export let language = "en",
		region = "it",
		menu = undefined;

	import Figure from "Figure";
	import ThemeButton from "ThemeButton";
</script>

<div class="copyright">
	<Figure
		width="26"
		height="26"
		directory="static"
		name="omni-atlas-logo"
		types={["png", "webp"]}
		alt="PC Atlas Logo Mini"
		loading="lazy"
	/>
	<span>
		Omni Atlas
		<br />
		<a
			href="https://creativecommons.org/licenses/by/4.0/deed.{language}"
			target="_blank"
			rel="noreferrer">Creative Commons Attribution 4.0</a
		>
	</span>
</div>

<div class="theme-button">
	<ThemeButton />
</div>

{#if menu != undefined}
	<nav>
		<ul>
			{#each menu as element}
				<li>
					<a rel="prefetch" href="{language}-{region}/{element.slug}/">
						{element.title}
					</a>
				</li>
			{/each}

			<li><a rel="prefetch" href="/">Language & Region</a></li>
		</ul>
	</nav>
{/if}

<style>
	:global(footer) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap-reverse;
		justify-content: space-evenly;
		align-items: center;
		padding: 0.5em 5% 3.75vh 5%;

		font-family: Montserrat;
	}

	:global(footer > *) {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 2rem;
		min-width: 33.33%;
	}

	:global(footer nav ul) {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		width: inherit;
		flex-wrap: wrap;
	}

	/* :global(footer nav li) {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
	} */

	:global(footer li, footer a) {
		text-decoration: none;
	}

	:global(footer li) {
		display: flex; /* to remove dot decoration */
		padding: 0 2rem;
		text-align: center;
		margin: 0.5rem 0;
	}

	:global(footer .copyright) {
		cursor: default;
	}

	:global(footer .copyright span) {
		margin-left: 12px;
		position: relative;
	}

	:global(footer .copyright span:before) {
		content: "|";
		height: 100%;
		left: -12px;
		position: absolute;
		display: flex;
		align-items: center;
	}

	:global(footer .copyright figure) {
		display: unset;
	}

	:global(footer .copyright figure) {
		vertical-align: middle;
		margin: 0 6px 2px 0;
	}

	@media (hover: none) {
		:global(footer) {
			display: none;
		}

		:global(footer.asleep) {
			display: flex;
		}
	}
</style>
