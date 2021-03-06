import { combineReducers } from 'redux';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from "redux-persist";
import pageMove from './action';
import { Appref } from './action';
import {first_login_check} from './action';
import { exercise_count_reducer } from './action';
import {testState_reducer} from './action';
import { change_clicked_button_reducer } from './action';
import {change_current_weight_reducer} from "./action"
import {change_set_reducer} from "./action";
import {change_timeToModal_reducer} from "./action";
import { Exercise_start_reducer } from './action';
import { update_routineInfo_reducer } from './action';
import {update_page_progress_reducer} from './action';
import { update_how_long_reducer } from './action';
import { update_last_record_reducer } from './action';
import { update_meals_reducer } from './action';
import { update_choose_meal_date_reducer } from './action';
import { plank_time_update_reducer } from './action';
import { update_day_info_obj_reducer } from './action';
import { update_extra_exercise_reducer,update_mainpage_reducer,update_angle_reducer,update_wrong_posture_reducer,update_what_wrong_posture_reducer} from './action';

const persistConfig={
    key:"root",
    storage:storageSession
}
const rootReducer=combineReducers({
    pageMove,
    Appref,
    first_login_check,
    exercise_count_reducer,
    testState_reducer,
    change_clicked_button_reducer,
    change_current_weight_reducer,
    change_set_reducer,
    change_timeToModal_reducer,
    Exercise_start_reducer,
    update_routineInfo_reducer,
    update_day_info_obj_reducer,
    update_mainpage_reducer,
    update_page_progress_reducer,
    update_how_long_reducer,
    update_last_record_reducer,
    update_meals_reducer,
    update_choose_meal_date_reducer,
    plank_time_update_reducer,
    update_extra_exercise_reducer,
    update_angle_reducer,
    update_wrong_posture_reducer,
    update_what_wrong_posture_reducer
});

// export default persistReducer(persistConfig,rootReducer);
export default rootReducer;