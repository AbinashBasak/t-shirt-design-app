import { activeDrawAction } from '../actionsTypes';

export default function drawOnCanvasStatus(state = '', action) {
	switch (action.type) {
		case activeDrawAction.image:
			return action.val;
		case activeDrawAction.text:
			return action.val;
		case activeDrawAction.empty:
			return action.val;
		default:
			return state;
	}
}
