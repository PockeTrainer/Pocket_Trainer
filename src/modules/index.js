import { combineReducers } from 'redux';
import pageMove from './action';
import { Appref } from './action';
import {first_login_check} from './action';

const rootReducer=combineReducers({pageMove,Appref,first_login_check});

export default rootReducer;