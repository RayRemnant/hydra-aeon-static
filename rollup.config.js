import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import preprocess from "svelte-preprocess";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
	(warning.code === "MISSING_EXPORT" && /'preload'/.test(warning.message)) ||
	(warning.code === "CIRCULAR_DEPENDENCY" &&
		/[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);

const aliasEntries = [
	{
		find: "errorFetch",
		replacement: `${__dirname}/src/modules/errorFetch.js`,
	},
	{
		find: "cookie",
		replacement: `${__dirname}/src/stores/cookie.js`,
	},
	{
		find: "theme",
		replacement: `${__dirname}/src/stores/theme.js`,
	},
	{
		find: "store",
		replacement: `${__dirname}/src/stores/store.js`,
	},
	{
		find: "schema",
		replacement: `${__dirname}/src/stores/schema.js`,
	},
	{ find: "i18n", replacement: `${__dirname}/src/services/i18n.js` },
	{
		find: "layout",
		replacement: `${__dirname}/src/routes/[language]-[region]/_layout.svelte`,
	},
	{
		find: "Meta",
		replacement: `${__dirname}/src/components/Meta.svelte`,
	},
	{
		find: "Schema",
		replacement: `${__dirname}/src/components/Schema.svelte`,
	},
	{
		find: "Figure",
		replacement: `${__dirname}/src/components/Figure.svelte`,
	},
	{
		find: "BuyingGuides",
		replacement: `${__dirname}/src/components/BuyingGuides.svelte`,
	},
	{
		find: "ProductSpecTable",
		replacement: `${__dirname}/src/components/ProductSpecTable.svelte`,
	},
	{
		find: "PostProduct",
		replacement: `${__dirname}/src/components/PostProduct.svelte`,
	},
	{
		find: "Header",
		replacement: `${__dirname}/src/components/Header.svelte`,
	},
	{
		find: "Footer",
		replacement: `${__dirname}/src/components/Footer.svelte`,
	},
	{
		find: "ThemeButton",
		replacement: `${__dirname}/src/components/ThemeButton.svelte`,
	},
	{
		find: "FixedBottom",
		replacement: `${__dirname}/src/components/FixedBottom.svelte`,
	},
];

let clientAlias = alias({
	resolve: [".js", ".svelte"],
	entries: [
		...aliasEntries,
		{
			find: "neoFetch",
			replacement:
				`${__dirname}/src/modules/` + (dev ? "devFetch.js" : "clientFetch.js"),
		},
	],
});

let serverAlias = alias({
	resolve: [".js", ".svelte"],
	entries: [
		...aliasEntries,
		{
			find: "neoFetch",
			replacement:
				`${__dirname}/src/modules/` + (dev ? "devFetch.js" : "serverFetch.js"),
		},
	],
});

const replaces = {
	"process.env.NODE_ENV": JSON.stringify(mode),
	"process.env.SAPPER_TIMESTAMP": Date.now(),
	delimiters: ["", ""],
};

if (dev) {
	replaces["process.env.SERVER_API"] = JSON.stringify(process.env.SERVER_API);
	replaces["process.env.SERVER_API_AUTH"] = JSON.stringify(
		process.env.SERVER_API_AUTH
	);
	replaces["process.env.MEDIA_HOST_S3"] = JSON.stringify(
		process.env.MEDIA_HOST_S3
	);
	replaces["process.env.MEDIA_HOST_CDN"] = JSON.stringify(
		process.env.MEDIA_HOST_CDN
	);
	replaces["process.env.MEDIA_HOST_DIRECTORY"] = JSON.stringify(
		process.env.MEDIA_HOST_DIRECTORY
	);
	replaces["process.env.MEDIA_HOST_BUCKET"] = JSON.stringify(
		process.env.MEDIA_HOST_BUCKET
	);
	replaces["global.min.css"] = "global.css";
}

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			clientAlias,
			replace({
				"process.browser": true,
				...replaces,
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
				preprocess: preprocess({
					babel: {
						presets: [
							[
								"@babel/preset-env",
								{
									loose: true,
									// No need for babel to resolve modules
									modules: false,
									targets: {
										// ! Very important. Target es6+
										esmodules: true,
									},
								},
							],
						],
					},
				}),
			}),
			resolve({
				browser: true,
				dedupe: ["svelte"],
			}),
			commonjs(),

			legacy &&
				babel({
					extensions: [".js", ".mjs", ".html", ".svelte"],
					babelHelpers: "runtime",
					exclude: ["node_modules/@babel/**"],
					presets: [
						[
							"@babel/preset-env",
							{
								targets: "> 0.25%, not dead",
							},
						],
					],
					plugins: [
						"@babel/plugin-syntax-dynamic-import",
						[
							"@babel/plugin-transform-runtime",
							{
								useESModules: true,
							},
						],
					],
				}),

			!dev &&
				terser({
					module: true,
				}),
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			//json(),
			serverAlias,
			replace({
				"process.browser": false,
				...replaces,
			}),
			svelte({
				generate: "ssr",
				hydratable: true,
				dev,
				emitCss: true,
				preprocess: preprocess({
					babel: {
						presets: [
							[
								"@babel/preset-env",
								{
									loose: true,
									// No need for babel to resolve modules
									modules: false,
									targets: {
										// ! Very important. Target es6+
										esmodules: true,
									},
								},
							],
						],
					},
				}),
			}),
			resolve({
				dedupe: ["svelte"],
			}),
			commonjs(),
		],
		external: Object.keys(pkg.dependencies).concat(
			require("module").builtinModules
		),

		preserveEntrySignatures: "strict",
		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				"process.browser": true,
				...replaces,
			}),
			commonjs(),
			!dev && terser(),
		],

		preserveEntrySignatures: false,
		onwarn,
	},
};
