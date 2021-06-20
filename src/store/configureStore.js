import { createStore, compose } from 'redux';

import rootReducer from './reducers';

export default function configureStore(initialState) {
	const composeEnhacer = (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) || compose;
	return createStore(rootReducer, initialState, composeEnhacer);
}
