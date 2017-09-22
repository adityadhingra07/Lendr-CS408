import { combineReducers } from 'redux';
import centralReducer from './reducer_central'

const rootReducer = combineReducers({
	centralReducer: centralReducer
});

export default rootReducer;
