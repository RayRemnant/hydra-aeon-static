export default async (context, e) => {
	if (e.status) {
		//if status is 300ish -> redirect
		if (Math.floor(e.status / 100) * 100 == 300) {
			return context.redirect(e.status, e.url);
		}
		//else display error page
		e.message = e.status == 404 ? "Not found" : "¯\\_(ツ)_/¯";
		return context.error(e.status || 500, e.message);
	}
};
