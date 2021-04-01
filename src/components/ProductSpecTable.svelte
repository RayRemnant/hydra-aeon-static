<script>
	import { _ } from "svelte-i18n";

	export let product;

	let { specs } = product;

	let warranty = specs.warranty.registration || specs.warranty.standard;

	if (Number.isInteger(warranty)) {
		var warrantyText =
			warranty > 1 ? warranty + " " + $_("years") : warranty + " " + $_("year");
	}

	warrantyText = specs.warranty.registration
		? warrantyText +
		  " <a target='_blank' rel='noreferrer' href='" +
		  specs.warranty["registration link"] +
		  "'>" +
		  $_("with registration") +
		  "</a>"
		: warrantyText;
</script>

<table class="specs">
	<tbody>
		{#if product.type == "CPU"}
			<tr>
				<th>Core</th>
				<th>{$_("frequency").capitalize()}</th>
				<th>{$_("lithography").capitalize()}</th>
				<th>Socket</th>
			</tr>
			<tr>
				<td>
					{specs.core}<abbr title="Core">C</abbr>
					/
					{specs.thread}<abbr title="Thread">T</abbr>
				</td>
				<!-- <td>
					{specs.frequency.base.toFixed(1)}
					<abbr title="GigaHertz">GHz</abbr><br />
					{specs.frequency.max.toFixed(1)}
					<abbr title="GigaHertz">GHz</abbr>
					Max
				</td> -->
				<td>
					{specs.frequency.base.toFixed(1)}
					/
					{specs.frequency.max.toFixed(1)}
					<abbr title="GigaHertz">GHz</abbr>
				</td>

				<td>
					{specs.lithography}
					<abbr title={$_("nanometers")}>nm</abbr>
				</td>

				<td>{specs.socket}</td>
			</tr>
			<tr>
				<th colspan="2">
					{$_("integrated graphics").capitalize()}
				</th>
				<td colspan="2">
					{specs.graphics || $_("no").capitalize()}
				</td>
			</tr>
			<tr>
				<th colspan="2">Overclock</th>
				<td colspan="2">
					{specs.overclock ? $_("yes").capitalize() : $_("no").capitalize()}
				</td>
			</tr>
			<tr>
				<th colspan="2">{$_("included heatsink").capitalize()}</th>
				<td colspan="2">
					{specs.heatsink || $_("no").capitalize()}
				</td>
			</tr>
		{/if}
		{#if product.type == "motherboard"}
			<tr>
				<th>{$_("form factor").capitalize()}</th>
				<th>Overclock</th>
				<th>RAM</th>
				<th>Socket</th>
			</tr>
			<tr>
				<td>
					{specs["form factor"]}
				</td>

				<td>
					{specs.overclock ? $_("yes").capitalize() : $_("no").capitalize()}
				</td>

				<td>
					{specs.memory.slot} × {specs.memory.type}
				</td>

				<td>{specs.socket}</td>
			</tr>
			<tr>
				<th colspan="2">
					{$_("storage").capitalize()}
				</th>
				<td colspan="2">
					{#if specs.internal["M2"] != undefined}
						{specs.internal["M2"].length} × M.2
						<br />
					{/if}
					{#each Object.entries(specs.internal.SATA) as [revision, number]}
						{number} × SATA{parseInt(revision)}
					{/each}
				</td>
			</tr>
			<tr>
				<th colspan="2">{$_("back panel").capitalize()}</th>
				<td colspan="2">
					{#if specs.back.USB}
						<span
							>{#each Object.entries(specs.back.USB)
								.sort()
								.reverse() as [type, usb]}
								{#each Object.entries(usb).sort((a, b) => b - a) as [revision, number]}
									{number} × USB {(parseInt(revision) / 10).toFixed(1)}
									{type != "A" ? "Type " + type : ""}<br />
								{/each}
							{/each}
						</span>
					{/if}
					{#if specs.back.video}
						{#each Object.entries(specs.back.video).sort() as [port, number]}
							{number} × {port}<br />
						{/each}
					{/if}
				</td>
			</tr>
			<tr>
				<th colspan="2">{$_("connectivity").capitalize()}</th>
				<td colspan="2">
					{#if specs.connectivity && specs.connectivity.ethernet}
						{#each Object.entries(specs.connectivity.ethernet) as [speed, number]}
							{number} x Ethernet ({parseInt(speed)}
							<abbr title="{$_('megabits').capitalize()} {$_('per second')}"
								>Mbps</abbr
							>)
						{/each}
					{/if}
					{#if specs.connectivity.wifi}
						<br />WiFi
					{/if}
				</td>
			</tr>
		{/if}
		{#if product.type == "SSD"}
			<tr>
				<th>{$_("interface").capitalize()}</th>
				<th>{$_("sequential read").capitalize()}</th>
				<th>{$_("sequential write").capitalize()}</th>
				<th>{$_("warranty").capitalize()}</th>
			</tr>
			<tr>
				<td>
					{@html specs.interface}
				</td>
				<td>
					{@html specs["sequential read"] +
						" <abbr title='" +
						$_("megabytes").capitalize() +
						" " +
						$_("per second") +
						"'>MB/s</abbr>"}
				</td>

				<td>
					{@html specs["sequential write"] +
						" <abbr title='" +
						$_("megabytes").capitalize() +
						" " +
						$_("per second") +
						"'>MB/s</abbr>"}
				</td>

				<td>
					{@html warrantyText}
				</td>
			</tr>
		{/if}
		{#if product.type == "HDD"}
			{#if specs.format == "portable"}
				<tr>
					<th>{$_("dimensions").capitalize()}</th>
					<th>{$_("ports").capitalize()}</th>
					<th>{$_("warranty").capitalize()}</th>
				</tr>
				<tr>
					<td>
						{product.properties.dimensions.length} × {product.properties
							.dimensions.width} × {product.properties.dimensions.depth}
						<abbr title={$_("millimeters")}>{$_("mm")}</abbr>
					</td>
					<td>
						{#each specs.ports as port}
							{port.name}
							{port.revision ? port.revision.toFixed(1) : ""}
							{port.type}
						{/each}
					</td>
					<td>
						{@html warrantyText}
					</td>
				</tr>
			{:else}
				<tr>
					<th>{$_("form factor").capitalize()}</th>
					<th
						><abbr title={$_("revolutions per minute").capitalize()}>RPM</abbr
						></th
					>
					<th>Cache</th><th>{$_("warranty").capitalize()}</th>
				</tr>
				<tr>
					<td>
						{@html specs["form factor"] + " " + specs.interface}
					</td>
					<td>
						{@html specs.RPM}
					</td>

					<td>
						{@html specs.cache}
						<abbr title={$_("megabytes").capitalize()}>MB</abbr>
					</td>

					<td>
						{@html warrantyText}
					</td>
				</tr>
			{/if}
		{/if}
		{#if product.type == "PSU"}
			<tr>
				<th>Watt</th>
				<th>{$_("modular").capitalize()}</th>
				<th>{$_("efficiency").capitalize()}</th>
				<th>{$_("warranty").capitalize()}</th>
			</tr>
			<tr>
				<td>
					{specs.watt}<abbr title="Watt">W</abbr>
				</td>
				<td>
					{$_(specs.modular).capitalize()}
				</td>
				<td>
					{specs.efficiency}
				</td>
				<td>
					{@html warrantyText}
				</td>
			</tr>
		{/if}
		{#if ["CPU Air Cooler", "CPU Liquid Cooler"].includes(product.type)}
			<tr
				><th>
					{#if product.type == "CPU Air Cooler"}
						{$_("dimensions").capitalize()}
					{/if}
					{#if product.type == "CPU Liquid Cooler"}
						{$_("radiator").capitalize()}
					{/if}
				</th>
				<th>{$_("fans").capitalize()}</th>
				<th>{$_("compatibility").capitalize()}</th>
				<th>{$_("warranty").capitalize()}</th>
			</tr>
			<tr>
				<td>
					{#if product.type == "CPU Air Cooler"}
						{specs.dimensions.length} × {specs.dimensions.width} × {specs
							.dimensions.depth}
						<abbr title={$_("millimeters")}>{$_("mm")}</abbr>
					{/if}
					{#if product.type == "CPU Liquid Cooler"}
						{specs.radiator.size}
						<abbr title={$_("millimeters")}>{$_("mm")}</abbr>
					{/if}
				</td>
				<td
					>{#if specs.fans != undefined && specs.fans.length > 0}
						{#each specs.fans as fan}
							{fan.number || 1} × {fan.size}
							<abbr title={$_("millimeters")}>{$_("mm")}</abbr>
						{/each}
					{/if}
				</td>
				<td>
					<ul>
						{#if specs.compatibility.intel.includes("LGA1151")}
							<li>LGA115X</li>
						{/if}
						{#if specs.compatibility.amd.includes("AM4")}
							<li>AM4</li>
						{/if}
					</ul>
				</td>
				<td>
					{@html warrantyText}
				</td>
			</tr>
		{/if}
		<!-- {#if product.type == "CPU Liquid Cooler"}
			<tr>
				<th>{$_("radiator").capitalize()}</th>
				<th>{$_("fans").capitalize()}</th>
				<th>{$_("compatibility").capitalize()}</th>
				<th>{$_("warranty").capitalize()}</th>
			</tr>
			<tr>
				<td>
					{specs.radiator.size}
					<abbr title={$_("millimeters")}>{$_("mm")}</abbr>
				</td>
				<td
					>{#if specs.fans != undefined && specs.fans.length > 0}
						{#each specs.fans as fan}
							{fan.number || 1} × {fan.size}
							<abbr title={$_("millimeters")}>{$_("mm")}</abbr>
						{/each}
					{/if}
				</td>
				<td>
					{#if specs.compatibility.intel.includes("LGA1151")}
						LGA115X
					{/if}
					{#if specs.compatibility.amd.includes("AM4")}
						AM4
					{/if}
				</td>
				<td>
					{@html warrantyText}
				</td>
			</tr>
		{/if} -->
	</tbody>
</table>

<style>
	:global(table) {
		border-collapse: separate;
		border-spacing: 0;
		border-width: 1px;
		margin-bottom: 1.5rem;
		border-radius: 0.5rem;
	}

	:global(table, th, td) {
		border: 1px solid #808080;
	}

	:global(th, td) {
		padding: 0.5rem 0.25rem;
	}

	:global(.specs) {
		width: 100%;
		text-align: center;
		table-layout: fixed;
		font-size: 1rem;
	}

	:global(.specs ul) {
		margin: 0;
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}

	:global(.specs li) {
		list-style-type: none;
		margin: 0;
		font-size: 1rem;
		padding: 0 10%;
	}

	:global(.specs tbody > tr:first-child > :first-child) {
		border-radius: 0.5rem 0 0 0;
	}

	:global(.specs tbody > tr:first-child > :last-child) {
		border-radius: 0 0.5rem 0 0;
	}

	:global(.specs tbody > tr:last-child > :last-child) {
		border-radius: 0 0 0.5rem 0;
	}

	:global(.specs tbody > tr:last-child > :first-child) {
		border-radius: 0 0 0 0.5rem;
	}

	@media (hover: none) {
		:global(.specs) {
			font-size: 0.8rem;
			position: relative;
			width: 110%;
			right: 5%;
		}
	}
</style>
