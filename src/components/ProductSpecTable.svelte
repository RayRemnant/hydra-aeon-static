<script>
	import { _ } from "svelte-i18n";

	export let product;

	let { specs } = product;

	let warranty = specs.warranty?.registration || specs.warranty?.standard;

	if (Number.isInteger(warranty)) {
		var warrantyText =
			warranty > 1 ? warranty + " " + $_("years") : warranty + " " + $_("year");
		warrantyText = specs.warranty.registration
			? warrantyText +
			  " <a target='_blank' rel='noreferrer' href='" +
			  specs.warranty["registration link"] +
			  "'>" +
			  $_("with registration") +
			  "</a>"
			: warrantyText;
	} else {
		warrantyText = "-";
	}
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
		{#if product.type == "PC case"}
			<tr>
				<th colspan="5">
					{$_("compatibility").capitalize()}
				</th>
				<td colspan="5">
					{specs.motherboard[0]}
				</td>
			</tr>
			<tr>
				<th colspan="5">
					{$_("dimensions").capitalize()}
				</th>
				<td colspan="5">
					{specs.dimensions.length} × {specs.dimensions.width} × {specs
						.dimensions.height}
					<abbr title={$_("millimeters")}>{$_("mm")}</abbr>
				</td>
			</tr>
			<tr>
				<th colspan="5">
					{$_("I/O").capitalize()}
				</th>
				<td colspan="5">
					{#if specs.io.usb}
						<span
							>{#each Object.entries(specs.io.usb)
								.sort()
								.reverse() as [type, usb]}
								{#each Object.entries(usb).sort((a, b) => b - a) as [revision, number]}
									{number} × USB {(parseInt(revision) / 10).toFixed(1)}
									{type != "A" ? "Type " + type : ""}<br />
								{/each}
							{/each}
						</span>
					{/if}
					{#if specs.io.audio && specs.io.audio.jack}
						{specs.io.audio.jack} × Jack
					{/if}
				</td>
			</tr>
			<tr>
				<th colspan="5">
					{$_("slot").capitalize()}
				</th>
				<td colspan="5">
					{#each Object.entries(specs["drive bays"]).sort() as [type, driveBay]}
						{#if driveBay.standard}
							{driveBay.standard} × {type
								.replace(/x/gi, ".")
								.replace(/\+/gi, " / ")}"<br />
						{:else if driveBay.max}
							{driveBay.max} × {type
								.replace(/x/gi, ".")
								.replace(/\+/gi, " / ")}" (max)<br />
						{/if}
					{/each}
				</td>
			</tr>
			<tr>
				<th colspan="2" rowspan="3">{$_("clearance").capitalize()}</th>
				<th colspan="5">{$_("GPU length").capitalize()}</th>
				<td colspan="3"
					>{@html specs?.cleareance?.gpu?.length
						? specs?.cleareance?.gpu?.length +
						  ` <abbr title=${$_("millimeters")}>${$_("mm")}</abbr>`
						: "-"}</td
				>
			</tr>
			<tr>
				<th colspan="5">{$_("CPU cooler height").capitalize()}</th>
				<td colspan="3"
					>{@html specs?.cleareance["cpu cooler"]?.height
						? specs?.cleareance["cpu cooler"]?.height +
						  ` <abbr title=${$_("millimeters")}>${$_("mm")}</abbr>`
						: "-"}</td
				>
			</tr>
			<tr>
				<th colspan="5">{$_("PSU length").capitalize()}</th>
				<td colspan="3"
					>{@html specs?.cleareance?.psu?.length
						? specs?.cleareance?.psu?.length +
						  ` <abbr title=${$_("millimeters")}>${$_("mm")}</abbr>`
						: "-"}</td
				>
			</tr>
			<tr>
				<th colspan="10">{$_("cooling").capitalize()}</th>
			</tr>
			<tr>
				<td colspan="2" />

				<th colspan="2">
					{$_("radiator").capitalize()}
				</th>
				<th colspan="3">
					{$_("fans").capitalize()}
				</th>
				<th colspan="3">
					{$_("included").capitalize()}
				</th>
			</tr>

			{#each Object.entries(specs.cooling).sort() as [locationName, location]}
				<tr>
					<td colspan="2">{$_(locationName).capitalize()}</td>
					<td colspan="2">
						{@html location?.radiator?.[0]
							? location.radiator[0] +
							  ` <abbr title=${$_("millimeters")}>${$_("mm")}</abbr>`
							: "-"}
					</td>
					<td colspan="3">
						{#if location?.fans?.layouts && location.fans.layouts.length > 0}
							{#each location.fans.layouts as layout, index}
								{#each Object.entries(layout).sort() as [size, number]}
									<span
										>{number} × {size}
										<abbr title={$_("millimeters")}>{$_("mm")}</abbr></span
									>
									{#if location.fans.layouts.length - 1 != index}
										<hr />
									{/if}
								{/each}
							{/each}
						{:else}
							-
						{/if}
					</td>
					<td colspan="3">
						{#if location?.fans?.included && location.fans.included.length > 0}
							{#each location.fans.included as fan}
								{fan.number || 1} × {fan.size}
								<abbr title={$_("millimeters")}>{$_("mm")}</abbr>
							{/each}
						{:else}
							-
						{/if}
					</td>
				</tr>
			{/each}
			<!-- <tr>
				<td colspan="2">{$_("front").capitalize()}</td>
				<td colspan="2">
					{@html specs?.cooling?.front?.radiator?.[0]
						? specs.cooling.front.radiator[0] +
						  ` <abbr title=${$_("millimeters")}>${$_("mm")}</abbr>`
						: "-"}
				</td>
				<td colspan="3">
					{#if specs?.cooling?.front?.fans?.layouts && specs.cooling.front.fans.layouts.length > 0}
						{#each specs.cooling.front.fans.layouts as layout, index}
							{#each Object.entries(layout).sort() as [size, number]}
								<span
									>{number} × {size}
									<abbr title={$_("millimeters")}>{$_("mm")}</abbr></span
								>
								{#if specs.cooling.front.fans.layouts.length - 1 != index}
									<hr />
								{/if}
							{/each}
						{/each}
					{:else}
						-
					{/if}
				</td>
				<td colspan="3">
					{#if specs?.cooling?.front?.fans?.installed && specs.cooling.front.fans.installed.length > 0}
						{#each specs?.cooling?.front?.fans?.installed || [] as fan}
							{fan.number || 1} × {fan.size}
							<abbr title={$_("millimeters")}>{$_("mm")}</abbr>
						{/each}
					{:else}
						-
					{/if}
				</td>
			</tr> -->
			<!-- <tr>
				<td colspan="2">{$_("top").capitalize()}</td>
				<td colspan="2">
					{@html specs?.cooling?.top?.radiator?.[0]
						? specs.cooling.top.radiator[0] +
						  ` <abbr title=${$_("millimeters")}>${$_("mm")}</abbr>`
						: "-"}
				</td>
				<td colspan="3">
					{#if specs?.cooling?.top?.fans?.layouts && specs.cooling.top.fans.layouts.length > 0}
						{#each specs.cooling.top.fans.layouts as layout, index}
							{#each Object.entries(layout).sort() as [size, number]}
								<span
									>{number} × {size}
									<abbr title={$_("millimeters")}>{$_("mm")}</abbr></span
								>
								{#if specs.cooling.top.fans.layouts.length - 1 != index}
									<hr />
								{/if}
							{/each}
						{/each}
					{:else}
						-
					{/if}
				</td>
				<td colspan="3">
					{#if specs?.cooling?.top?.fans?.installed && specs.cooling.top.fans.installed.length > 0}
						{#each specs.cooling.top.fans.installed as fan}
							{fan.number || 1} × {fan.size}
							<abbr title={$_("millimeters")}>{$_("mm")}</abbr>
						{/each}
					{:else}
						-
					{/if}
				</td>
			</tr>
			<tr>
				<td colspan="2">{$_("rear").capitalize()}</td>
				<td colspan="2">
					{@html specs?.cooling?.rear?.radiator?.[0]
						? specs.cooling.rear.radiator[0] +
						  ` <abbr title=${$_("millimeters")}>${$_("mm")}</abbr>`
						: "-"}
				</td>
				<td colspan="3">
					{#if specs?.cooling?.rear?.fans?.layouts && specs.cooling.rear.fans.layouts.length > 0}
						{#each specs.cooling.rear.fans.layouts as layout, index}
							{#each Object.entries(layout).sort() as [size, number]}
								<span
									>{number} × {size}
									<abbr title={$_("millimeters")}>{$_("mm")}</abbr></span
								>
								{#if specs.cooling.rear.fans.layouts.length - 1 != index}
									<hr />
								{/if}
							{/each}
						{/each}
					{:else}
						-
					{/if}
				</td>
				<td colspan="3">
					{#if specs?.cooling?.rear?.fans?.installed && specs.cooling.rear.fans.installed.length > 0}
						{#each specs.cooling.rear.fans.installed as fan}
							{fan.number || 1} × {fan.size}
							<abbr title={$_("millimeters")}>{$_("mm")}</abbr>
						{/each}
					{:else}
						-
					{/if}
				</td>
			</tr> -->
		{/if}
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

	:global(.specs hr) {
		margin: 0.25em auto;
		width: 75%;
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
