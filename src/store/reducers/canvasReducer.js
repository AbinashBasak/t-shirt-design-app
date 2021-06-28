export default function canvasReducer(state = null, action) {
	switch (action.type) {
		case 'SET_CANVAS':
			return action.val;
		default:
			return state;
	}
}
