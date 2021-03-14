<script>
	export let theme;
</script>

<style>
	:global(.fixed-bottom) {
		position: fixed;
		bottom: 0;
		height: 4vh;
		width: 100%;
		pointer-events: none;
		z-index: 9;
		background-color: rgba(255, 255, 255, 0);
	}

	:global(.dark .fixed-bottom) {
		background-image: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0),
			rgba(34, 34, 34, 1)
		);
	}

	:global(.light .fixed-bottom) {
		background-image: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 1)
		);
	}

	:global(.fixed-bottom.asleep) {
		display: none;
	}

	@media (hover: none) {
		:global(.fixed-bottom) {
			bottom: 5.5vh;
		}
	}
</style>

<div class="{$theme} fixed-bottom" />
