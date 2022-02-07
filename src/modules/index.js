import { combineReducers } from 'redux';
import pageMove from './action';
import { Appref } from './action';
import {first_login_check} from './action';
import { exercise_count_reducer } from './action';
import {testState_reducer} from './action';
const rootReducer=combineReducers({pageMove,Appref,first_login_check,exercise_count_reducer,testState_reducer});

export default rootReducer;