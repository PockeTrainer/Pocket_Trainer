import { combineReducers } from 'redux';
import pageMove from './action';
import { Appref } from './action';
import {first_login_check} from './action';
import { exercise_count_reducer } from './action';
import {testState_reducer} from './action';
import { change_clicked_button_reducer } from './action';
import { change_routine_page_reducer } from './action';
const rootReducer=combineReducers({pageMove,Appref,first_login_check,exercise_count_reducer,testState_reducer,change_clicked_button_reducer,change_routine_page_reducer});

export default rootReducer;