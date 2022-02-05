import { combineReducers } from 'redux';
import pageMove from './action';
import { Appref } from './action';
import {first_login_check} from './action';
import { pushup_count_reducer } from './action';

const rootReducer=combineReducers({pageMove,Appref,first_login_check,pushup_count_reducer});

export default rootReducer;