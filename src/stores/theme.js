import { writable } from "svelte/store";

const createCookie = () => {
	const { subscribe, set, update } = writable("dark");

	return {
		subscribe,
		set,
		update,
		useCookie: () => {
			subscribe((current) => {
				if (current) {
					document.cookie = "theme=" + current + "; path=/; SameSite=Lax;";
				}
			});
		},
	};
};

export let theme = createCookie(); //shouldn't make much difference.
