import { combineReducers } from 'redux';

import ActiveSidebar from './activeSidebarReducer';
import canvas from './canvasReducer';
import drawOnCanvasStatus from './drawOnCanvasReducer';

const rootReducer = combineReducers({
	ActiveSidebar,
	canvas,
	drawOnCanvasStatus,
});

export default rootReducer;
