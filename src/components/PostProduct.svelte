<script>
	import { _ } from "svelte-i18n";
	import Figure from "Figure";
	import ProductSpecTable from "ProductSpecTable";

	export let region, product;
	//product should have tag property to use as amazonio

	const shopName = product.shop[region].ranking[0];
	const { availability, id, price, prime } = product.shop[region][shopName];
	let shopLink = "";
	switch (shopName) {
		case "amazon":
			shopLink = `https://www.amazon.it/dp/${id}?tag=omni-atlas-21`;
	}
</script>

<div class="product {product.type.toLowerCase()}">
	<h3>
		{(
			product.name.full +
			(product.name.capacity ? " " + product.name.capacity : "")
		).trim()}
	</h3>

	<Figure
		directory={product.image.url ? "" : "static"}
		name={product.image.url || "placeholder"}
		width={product.image.width}
		height={product.image.height}
		types={product.image.types || ["jpg", "webp"]}
		alt={product.name.full}
		loading="lazy"
	/>

	<ProductSpecTable {product} />

	{#if product.text}
		<p>
			{@html product.text}
		</p>
	{/if}

	{#if !id}
		<a
			href={shopLink}
			target="_blank"
			rel="noopener noreferrer"
			class="buy-button disabled"
			>{$_("not").capitalize()}
			{$_("available")}
		</a>
	{:else if availability == 99}
		<a
			href={shopLink}
			target="_blank"
			rel="noopener noreferrer"
			class="buy-button unavailable"
			>{$_("not").capitalize()}
			{$_("available")}
		</a>
	{:else}
		<a
			href={shopLink}
			target="_blank"
			rel="noopener noreferrer"
			class="buy-button available"
			>{$_("buy").capitalize()}
			{$_("on")}
			{shopName.capitalize()}</a
		>
	{/if}
	<hr />
</div>

<style>
	:global(.product img) {
		border-radius: 0.75rem;
	}

	:global(.product .buy-button) {
		display: block;
		margin: auto;
		text-align: center;
		width: 45%;
		max-width: 100%;
		padding: 1rem 2.5%;
		border-radius: 0.5rem;

		color: #fff;
		transition: 0.33s ease background-color;
		font-weight: bold;
	}

	:global(.product .buy-button:hover) {
		color: #fff;
	}

	:global(.product .buy-button::selection) {
		background-color: rgba(0, 0, 0, 0);
	}

	:global(.product .buy-button.available) {
		background-color: var(--accent-color);
	}

	:global(.product .buy-button.available:hover) {
		background-color: var(--accent-color_2);
	}

	:global(.product .buy-button.unavailable) {
		background-color: gray;
	}

	:global(.product .buy-button.disabled) {
		background-color: gray;
		pointer-events: none;
	}

	@media (hover: none) {
		:global(.product figure, .product picture) {
			max-width: 95%;
		}
	}
</style>
