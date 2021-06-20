import { activeEditOptionsSection } from '../actionsTypes';

export default function activeController(state = activeEditOptionsSection.empty, action) {
	switch (action.type) {
		case activeEditOptionsSection.image:
		case activeEditOptionsSection.text:
		case activeEditOptionsSection.empty:
			return action.val;
		default:
			return state;
	}
}
