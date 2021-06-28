import { activeSidebar } from '../actionsTypes';

export default function activeController(state = activeSidebar.text, action) {
	switch (action.type) {
		case 'SET_ACTIVE_SIDEBAR':
			return action.val;
		default:
			return state;
	}
}
