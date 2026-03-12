export function getTodayDateKey(date = new Date()) {
	const year = date.getFullYear();
	const month = `${date.getMonth() + 1}`.padStart(2, "0");
	const day = `${date.getDate()}`.padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function isDateKey(value: string) {
	return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function resolveDateKey(value?: string) {
	if (!value || !isDateKey(value)) {
		return getTodayDateKey();
	}

	return value;
}

export function formatDisplayDate(dateKey: string) {
	const [year, month, day] = dateKey.split("-").map(Number);
	return new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(year, month - 1, day));
}
