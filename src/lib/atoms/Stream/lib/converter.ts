const units = ['B', 'kB', 'MB', 'GB'];

export function filesize(bytes: number): string {
	let unit = 0;

	while (bytes >= 1000 && unit < units.length - 1 && ++unit) {
		bytes = bytes / 1000;
	}

	return bytes.toFixed(bytes < 10 && unit > 0 ? 1 : 0) + ' ' + units[unit];
}

export function duration(seconds: number): string {
	let h = Math.floor(seconds / (60 * 60));
	seconds -= h * 60 * 60;

	let m = Math.floor(seconds / 60);
	seconds -= m * 60;

	let s = Math.round(seconds);

	let composition = '';

	if (h >= 10) {
		composition += h + ':';
	} else {
		composition += '0' + h + ':';
	}

	if (m >= 10) {
		composition += m + ':';
	} else {
		composition += '0' + m + ':';
	}

	if (s >= 10) {
		composition += s;
	} else {
		composition += '0' + s;
	}

	return composition;
}
