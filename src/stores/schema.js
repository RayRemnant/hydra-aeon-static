import { writable } from "svelte/store";

const createSchema = () => {
	const { subscribe, set } = writable();

	return {
		subscribe,
		set,
		update: ({ organization = false, breadcrumbs = [], article = false }) => {
			set({ organization, breadcrumbs, article });
		},
	};
};

export let schema = createSchema(); //shouldn't make much difference.
