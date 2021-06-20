export default function canvasReducer(state = '', action) {
	return action.val ? action.val : state;
}
