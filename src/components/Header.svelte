<script>
	export let segment, language, region;
	import Figure from "Figure";
</script>

<nav>
	<ul>
		<li>
			<a
				rel="prefetch"
				aria-current={segment === "home" ? "page" : undefined}
				href="{language}-{region}/"
			>
				<Figure
					directory="static"
					name="icons/home"
					types={["png", "webp"]}
					alt="Home"
					height="100%"
					loading="lazy"
				/>

				<span>Home</span></a
			>
		</li>

		<li>
			<a
				rel="prefetch"
				aria-current={segment === "blog" ? "page" : undefined}
				href="{language}-{region}/blog/"
			>
				<Figure
					directory="static"
					name="icons/blog"
					types={["png", "webp"]}
					alt="Blog"
					height="100%"
				/>

				<span>Blog</span></a
			>
		</li>

		<li class="logo">
			<a rel="prefetch" href="{language}-{region}/">
				<Figure
					directory="static"
					name="omni-atlas-logo"
					types={["png", "webp"]}
					alt="Omni Atlas Logo"
					height="100%"
				/>
			</a>
		</li>

		<li>
			<a
				rel="prefetch"
				aria-current={segment === "tools" ? "page" : undefined}
				href="{language}-{region}/tools/"
			>
				<Figure
					directory="static"
					name="icons/tools"
					types={["png", "webp"]}
					alt="Tools"
					height="100%"
				/>

				<span>Tools</span>
			</a>
		</li>
		<li>
			<a
				rel="prefetch"
				aria-current={["info", "story", "credits"].includes(segment)
					? "page"
					: undefined}
				href="{language}-{region}/info/"
			>
				<Figure
					directory="static"
					name="icons/dots"
					types={["png", "webp"]}
					alt="dots"
					height="100%"
				/>

				<span>Info</span></a
			>
		</li>
	</ul>
</nav>
<hr/>

<style>
	:global(header.asleep li) {
		pointer-events: none;
		display: none;
	}

	:global(header.asleep .logo) {
		display: flex;
	}

	:global(header nav) {
		font-size: 1.5rem;
		font-weight: 400;
		letter-spacing: 2.5px;
		height: 100px;
		padding: 0.5em 20vw;
	}

	:global(header ul) {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		height: inherit;
	}

	:global(header li) {
		display: flex;
		text-decoration: none;
	}

	:global(header a) {
		font-family: "Montserrat";

		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		width: 100%;
		height: 100%;
		position: relative;
	}

	:global(header span) {
		position: relative;
	}

	:global(header span::after) {
		position: absolute;
		content: "";
		width: 96%;
		height: 2px;
		/* background-color: #7880ff; */
		background-color: transparent;
		display: block;
		top: -3px;
		transition: background-color 0.4s ease;
	}

	:global(header [aria-current] span::after) {
		/* background-color: #7880ff; */
		background-color: var(--accent-color);
	}

	:global(header hr) {
		margin: 0.75rem auto 0 auto;
		width: 10%;
	}

	/* DESKTOP */
	@media (hover: hover) {
		:global(header nav) {
			padding: 0.5em 0;
		}

		:global(header li) {
			width: 20vw;
			justify-content: center;
			align-items: center;
			height: 100%;
		}

		:global(.logo) {
			align-items: initial;
		}

		/* IMG */
		:global(.logo figure, .logo img) {
			display: block;
			height: 100%;
		}

		:global(header figure) {
			display: none;
		}
	}
	/* MOBILE */
	@media (hover: none) {
		:global(header nav) {
			position: fixed;
			bottom: 0;
			width: 100%;
			z-index: 99;

			height: 7vh;
			padding: 0;
			padding-bottom: env(safe-area-inset-bottom);

			border-radius: 1rem 1rem 0 0;
		}

		/* :global(header img) {
			object-fit: contain;
			max-height: 100%;
			max-width: 100%;
		} */

		:global(header figure) {
			height: 100%;
		}

		:global(header .logo, header .logo *, header a span) {
			display: none;
		}

		:global(header nav ul, header nav li) {
			height: 100%;
		}

		:global(header nav li) {
			box-sizing: border-box;
			padding: 0.8rem 0;
			flex-grow: 1;
		}

		:global(.dark header img) {
			filter: invert(100%);
		}

		:global(header.asleep) {
			display: none;
		}

		:global(header a:after) {
			position: absolute;
			content: "";
			width: 75%;
			height: 2px;
			background-color: transparent;
			display: block;
			top: -0.75rem;
			transition: background-color 0.4s ease;
		}

		:global(header [aria-current="page"]:after) {
			background-color: var(--accent-color);
		}

		:global(.dark header nav) {
			background-color: #333;
		}

		:global(.light header nav) {
			background-color: #eee;
		}

		:global(header hr) {
			display: none;
		}
	}

	/* DARK / LIGHT */

	/* .light .logo img {
		filter: hue-rotate(140deg);
	} */
</style>
