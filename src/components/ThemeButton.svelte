<script>
	import { theme } from "theme";

	function toggleTheme() {
		$theme = $theme == "dark" ? "light" : "dark";
	}
</script>

<noscript>
	<style>
		.theme-button {
			display: none;
		}
	</style>
</noscript>

<div aria-hidden="true" class="theme-btn">
	<input
		tabindex="-1"
		on:click={() => toggleTheme()}
		type="checkbox"
		checked={$theme == "dark" ? true : false}
	/>
	<span />
</div>

<style>
	:global(.theme-btn) {
		position: relative;
		width: 145px;
		height: 74px;
		border-radius: 40px;
	}

	:global(.theme-btn input[type="checkbox"]) {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: 0px;
		cursor: pointer;
		opacity: 0;
		z-index: 2;
	}

	:global(.theme-btn span) {
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		overflow: hidden;
		opacity: 1;
		background-color: #fff;
		/* 		box-shadow: 0px 2px 25px #d9d9d9;
 */
		border-radius: 40px;
		transition: 0.2s ease background-color, 0.2s ease opacity;
	}

	:global(.theme-btn span:before, .theme-btn span:after) {
		content: "";
		position: absolute;
		top: 8px;
		width: 58px;
		height: 58px;
		border-radius: 50%;
		transition: 0.5s ease transform, 0.2s ease background-color;
	}

	:global(.theme-btn span:before) {
		background-color: #222;
		/* 		transform: translate(-58px, 0px); */
		transform: translate(20px, -66px);
		z-index: 1;
	}

	:global(.theme-btn span:after) {
		background-color: #fff;
		transform: translate(8px, 0px);
		z-index: 0;
	}

	:global(.theme-btn input[type="checkbox"] + span) {
		background-color: #222;
	}

	:global(.theme-btn input[type="checkbox"]:checked + span) {
		background-color: #fff;
	}

	:global(.theme-btn input[type="checkbox"]:active + span) {
		opacity: 0.5;
	}

	:global(.theme-btn input[type="checkbox"]:checked + span:before) {
		background-color: #fff;
		transform: translate(56px, -19px);
	}

	:global(.theme-btn input[type="checkbox"]:checked + span:after) {
		background-color: #222;
		transform: translate(79px, 0px);
	}
</style>
