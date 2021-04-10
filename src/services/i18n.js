import { dictionary, locale, _ } from "svelte-i18n";
function setupI18n({ withLocale: _locale } = { withLocale: "en" }) {
	dictionary.set({
		en: {
			interface: "interface",
			year: "year",
			years: "years",
			megabytes: "megabytes",
			"per second": "per second",
			"with registration": "with registration",
			"sequential read": "sequential read",
			"sequential write": "sequential write",
			"included heatsink": "included heatsink",
			warranty: "warranty",
			buy: "buy",
			on: "on",
			not: "not",
			yes: "yes",
			no: "no",
			available: "available",
			found: "found",
			frequency: "frequency",
			lithography: "lithography",
			nanometers: "nanometers",
		},
		it: {
			interface: "interfaccia",
			year: "anno",
			years: "anni",
			megabytes: "megabyte",
			megabits: "megabit",
			"per second": "per secondo",
			"with registration": "con registrazione",
			"sequential read": "lettura sequenziale",
			"sequential write": "scrittura sequenziale",
			"included heatsink": "dissipatore incluso",
			"integrated graphics": "grafica integrata",
			warranty: "garanzia",
			buy: "compra",
			on: "su",
			not: "non",
			yes: "si",
			no: "no",
			available: "disponibile",
			found: "trovato",
			frequency: "frequenza",
			lithography: "litografia",
			nanometers: "nanometri",
			storage: "archiviazione",
			"back panel": "pannello posteriore",
			"form factor": "formato",
			connectivity: "connettività",
			"under construction": "in costruzione",
			"updated on": "aggiornato al",
			"revolutions per minute": "rotazioni per minuto",
			dimensions: "dimensioni",
			ports: "porte",
			millimeters: "millimetri",
			mm: "mm",
			modular: "modulare",
			efficiency: "efficienza",
			"coming soon": "prossimamente",
			fans: "ventole",
			compatibility: "compatibilità",
			radiator: "radiatore",
			front: "fronte",
			top: "sopra",
			rear: "retro",
			"pre-installed": "pre-installate",
			cooling: "raffreddamento",
			"GPU length": "lunghezza GPU",
			"CPU cooler height": "altezza dissipatore CPU",
			"PSU length": "lunghezza PSU",
			clearance: "spazio",
			side: "lato",
			included: "incluse",
			"up to": "fino a",
			bottom: "sotto",
		},
	});
	locale.set(_locale);
}
export { _, setupI18n };
