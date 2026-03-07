export const studyGoals = [
	{
		title: "Write with more clarity",
		horizon: "Current Focus",
		nextStep: "Finish one honest page before lunch",
	},
	{
		title: "Repair sleep rhythm",
		horizon: "This Quarter",
		nextStep: "Shut screens at 11:00 pm",
	},
	{
		title: "Build Reflection",
		horizon: "North Star",
		nextStep: "Refine the daily prompt system",
	},
] as const;

export const studyPrompts = [
	"What felt most true today, even if it was unfinished?",
	"What did you avoid because it felt emotionally expensive?",
	"What is the smallest visible step you can finish tomorrow?",
	"What deserves to count as a win from the outside and from within?",
] as const;

export const studyEntries = [
	{
		date: "Mar 07",
		title: "Better focus after a quieter morning",
		excerpt:
			"Blocking the first hour changed the whole day. The important work stopped feeling heavy.",
		mood: 4,
		energy: 3,
		progress: 4,
	},
	{
		date: "Mar 06",
		title: "Avoidance showed up again",
		excerpt:
			"I kept circling the hard task until I broke it into something that could fit in fifteen minutes.",
		mood: 3,
		energy: 2,
		progress: 3,
	},
	{
		date: "Mar 05",
		title: "Clear next step, calmer day",
		excerpt:
			"Once the next step was concrete, the rest of the day stopped feeling vague.",
		mood: 4,
		energy: 4,
		progress: 4,
	},
	{
		date: "Mar 04",
		title: "Sleep debt leaked into everything",
		excerpt:
			"The low energy was not a mystery. It started the night before and followed me all day.",
		mood: 2,
		energy: 2,
		progress: 2,
	},
] as const;

export const studySeries = [
	{ id: "d1", label: "Mon", mood: 2.8, energy: 2.4, progress: 2.6 },
	{ id: "d2", label: "Tue", mood: 3.1, energy: 2.8, progress: 2.9 },
	{ id: "d3", label: "Wed", mood: 3.7, energy: 3.2, progress: 3.5 },
	{ id: "d4", label: "Thu", mood: 3.2, energy: 2.7, progress: 3.1 },
	{ id: "d5", label: "Fri", mood: 4.1, energy: 3.8, progress: 3.9 },
	{ id: "d6", label: "Sat", mood: 3.9, energy: 3.4, progress: 4.2 },
	{ id: "d7", label: "Sun", mood: 4.2, energy: 3.7, progress: 4.1 },
	{ id: "d8", label: "Mon", mood: 3.5, energy: 3.1, progress: 3.6 },
	{ id: "d9", label: "Tue", mood: 4.0, energy: 3.5, progress: 4.0 },
	{ id: "d10", label: "Wed", mood: 4.3, energy: 3.8, progress: 4.4 },
	{ id: "d11", label: "Thu", mood: 3.8, energy: 3.3, progress: 3.9 },
	{ id: "d12", label: "Fri", mood: 4.4, energy: 3.9, progress: 4.5 },
] as const;

export const studyActivity = [
	{ id: "c1", days: [0, 1, 2, 0, 3, 2, 1] },
	{ id: "c2", days: [1, 2, 0, 1, 2, 3, 1] },
	{ id: "c3", days: [2, 3, 1, 0, 2, 2, 2] },
	{ id: "c4", days: [0, 1, 2, 3, 2, 1, 0] },
	{ id: "c5", days: [1, 2, 3, 1, 2, 4, 2] },
	{ id: "c6", days: [2, 1, 2, 2, 3, 1, 1] },
	{ id: "c7", days: [1, 2, 1, 3, 2, 2, 0] },
	{ id: "c8", days: [2, 3, 2, 2, 4, 3, 1] },
	{ id: "c9", days: [1, 2, 1, 1, 2, 3, 2] },
	{ id: "c10", days: [0, 1, 2, 3, 2, 2, 1] },
	{ id: "c11", days: [1, 2, 3, 2, 1, 2, 0] },
	{ id: "c12", days: [2, 2, 1, 3, 4, 3, 2] },
] as const;
