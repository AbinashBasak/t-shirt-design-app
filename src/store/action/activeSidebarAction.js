export function setsidebar(action) {
	console.log(action);
	return { type: 'SET_ACTIVE_SIDEBAR', val: action };
}
