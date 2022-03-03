import { combineReducers } from 'redux';
import pageMove from './action';
import { Appref } from './action';
import {first_login_check} from './action';
import { exercise_count_reducer } from './action';
import {testState_reducer} from './action';
import { change_clicked_button_reducer } from './action';
import { change_routine_page_reducer } from './action';
import {change_current_weight_reducer} from "./action"
import {change_set_reducer} from "./action";
import {change_timeToModal_reducer} from "./action";
import { Exercise_start_reducer } from './action';
import { update_routineInfo_reducer } from './action';

const rootReducer=combineReducers({
    pageMove,
    Appref,
    first_login_check,
    exercise_count_reducer,
    testState_reducer,
    change_clicked_button_reducer,
    change_routine_page_reducer,
    change_current_weight_reducer,
    change_set_reducer,
    change_timeToModal_reducer,
    Exercise_start_reducer,
    update_routineInfo_reducer
});

export default rootReducer;