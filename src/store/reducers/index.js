import { combineReducers } from 'redux';

import activeEditOptions from './activeEditOptionReducer';
import canvas from './canvasReducer';

const rootReducer = combineReducers({
	activeEditOptions,
	canvas,
});

export default rootReducer;
