window.addEventListener("load", function () {
	var timeElement = document.getElementById("time-updated");
	var timeUpdated = Date.parse(
		timeElement.getElementsByTagName("time")[0].dateTime
	);
	var now = new Date();

	var timeDiff = -Math.abs(now - timeUpdated);

	var format = "hour";

	if (timeDiff / 36e5 <= -1) {
		timeDiff /= 36e5;
	} else if (timeDiff / 60000 <= -1) {
		timeDiff /= 60000;
		format = "minute";
	} else {
		timeDiff = timeDiff / 1000;
		format = "second";
	}

	timeDiff = Math.ceil(timeDiff).toFixed();

	var lang = window.location.pathname.substring(1, 3);

	var rtf = new Intl.RelativeTimeFormat(lang, {
		localeMatcher: "best fit", // other values: "lookup"
		numeric: "always", // other values: "auto"
		style: "long", // other values: "short" or "narrow"
	});

	timeElement.innerHTML += `<span style="white-space:nowrap"> ~ ${rtf.format(
		timeDiff,
		format
	)}</span>`;
});
