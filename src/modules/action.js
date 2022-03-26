//로그인 시작 모달
const FIRST_CLEARPAGE="first_clear";
const SECOND_CLEARPAGE="second_clear";
const LAST_CLEARPAGE="last_clear";
const GOTOWEIGHT="gotoweight";

//app.js에서 사용되는 액션타입
const MODALREF="modalref"
const FIRST_LOGIN="first_login";
const SECOND_LOGIN="second_login";
//메인메뉴쪽에서->운동시작으로 넘어갔을 때 필요한 액션-상단바유무를 가려줌
const EXERCISE_START="exercise_start";
const NOT_EXCERCISE_START="not_exercise_start"

//체력측정이 시작되었는지 여부 액션타입
const TESTSTATE="testState";
const NONE_TESTSTATE="none_test";
const SETTING_COMPLETED="setting_completed";
const PRE_TIMER="pre_timer";
//체력측정에서 사용되는 액션타입
const PUSHUP_COUNT="pushup_count";
const SITUP_COUNT="situp_count ";
const SQUAT_COUNT="squat_count";
const RESET_COUNT="reset_count"
//운동추천 루틴페이지에서 눌린 버튼변경 액션
const CHANGE_CLICKED_BUTTON="change_clicked_button";
//루틴페이지에서 어디에있는지를 알려주는 액션
const TODAY_ROUTINE="today_routine";
const EXERCISE_INFO="exercise_info";
const EXTRA_ROUTINE="extra_routine";
//현재 중량을 변경해주는 액션
const SET_CURRENT_WEIGHT="set_current_weight";
const SET_CURRENT_TIME="set_current_time";
const SET_CURRENT_CNT="set_current_count";
const RESET="reset";
const VERY_HARD="very_hard";
const HARD="hard";
const PROPER="proper";
const EASY="easy";
const VERY_EASY="very_easy";
const ERROR="error";
//운동 세트수 변경 액션
const RESET_SET="reset_set";
const INCREASE_SET="increase_set"
//휴식세트를 보여줄지 말지에 대한 액션
const TIMETOMODAL="timeToModal";
const NOT_TIMETOMODAL="not_timeToModal";
//공통으로 쓸 api를 통해 불러온 운동객체 정보를 올리는용도
const ROUTINE_INFO="routine_info";
//한 운동이 끝났을 때에 운동시간을 담아준다
const HOW_LONG="how_long";
//지금 운동페이지에서 어디를 맡고있는지 파악용
const NEXT_PART="next_part";
const PREV_PART="prev_part";
const NEXT_EXERCISE="next_exercise";
const PREV_EXERCISE="prev_exercise";
const SET_EXERCISE_RECORD="set_exercise_record";
//중량,시간,개수 변화전에 마지막 기록을 저장해두는용
const LAST_RECORD="last_record";
//식단에서 아침,점심,저녁에 음식들이 저장됨
const PUSH_BREAKFAST="push_breakfast";
const PUSH_LUNCH="push_lunch";
const PUSH_DINNER="push_dinner";

const POP_BREAKFAST="pop_breakfast";
const POP_LUNCH="pop_lunch";
const POP_DINNER="pop_dinner";
//액션 타입들

export const First_clear_page=()=>({
    type:FIRST_CLEARPAGE
});

export const Second_clear_page=()=>({
    type:SECOND_CLEARPAGE
});

export const Last_clear_page=()=>({
    type:LAST_CLEARPAGE
});

export const gotoweight=()=>({
    type:GOTOWEIGHT
});

export const modalref=(refValue)=>({
    type:MODALREF,
    refValue
});

export const exercise_start=()=>({
    type:EXERCISE_START
});

export const not_exercise_start=()=>({
    type:NOT_EXCERCISE_START
});

export const first_Login=()=>({
    type:FIRST_LOGIN
});

export const second_Login=()=>({
    type:SECOND_LOGIN
})

export const testState=(page)=>({
    type:TESTSTATE,
    page
});

export const none_testState=(page)=>({
    type:NONE_TESTSTATE,
    page
})

export const setting_completed=()=>({
    type:SETTING_COMPLETED
});
export const pre_timer=()=>({
    type:PRE_TIMER
});
export const pushup_count=()=>({
    type:PUSHUP_COUNT
})

export const situp_count=()=>({
    type:SITUP_COUNT
})

export const squat_count=()=>({
    type:SQUAT_COUNT
})

export const reset_count=()=>({
    type:RESET_COUNT
})

export const change_clicked_button=(button_name)=>({
    type:CHANGE_CLICKED_BUTTON,
    button_name
});

export const today_routine=()=>({
    type:TODAY_ROUTINE
});

export const exercise_info=()=>({
    type:EXERCISE_INFO
});

export const extra_routine=()=>({
    type:EXTRA_ROUTINE
});

export const set_current_weight=(start_kg)=>({
    type:SET_CURRENT_WEIGHT,
    start_kg
})

export const set_current_time=(start_time)=>({
    type:SET_CURRENT_TIME,
    start_time
})

export const set_current_cnt=(start_cnt)=>({
    type:SET_CURRENT_CNT,
    start_cnt
})

export const reset=()=>({
    type:RESET
})

export const very_hard=(unit_kg,unit_time,unit_cnt)=>({
    type:VERY_HARD,
    unit_kg,
    unit_time,
    unit_cnt
})

export const hard=(unit_kg,unit_time,unit_cnt)=>({
    type:HARD,
    unit_kg,
    unit_time,
    unit_cnt
})

export const proper=()=>({
    type:PROPER,
})

export const easy=(unit_kg,unit_time,unit_cnt)=>({
    type:EASY,
    unit_kg,
    unit_time,
    unit_cnt
})

export const very_easy=(unit_kg,unit_time,unit_cnt)=>({
    type:VERY_EASY,
    unit_kg,
    unit_time,
    unit_cnt
})

export const error=()=>({
    type:ERROR,
})

export const reset_set=()=>({
    type:RESET_SET
})

export const increase_set=()=>({
    type:INCREASE_SET
})

export const timeToModal=()=>({
    type:TIMETOMODAL
})

export const not_timeToModal=()=>({
    type:NOT_TIMETOMODAL
})

export const routine_info=(bodypart,part1,part2,part3)=>({
    type:ROUTINE_INFO,
    bodypart,
    part1,
    part2,
    part3
});

export const how_long=(min,sec)=>({
    type:HOW_LONG,
    min,
    sec
})

export const next_part=()=>({
    type:NEXT_PART,

});

export const prev_part=()=>({
    type:PREV_PART,

});

export const next_exercise=()=>({
    type:NEXT_EXERCISE,

});

export const prev_exercise=()=>({
    type:PREV_EXERCISE,

});

export const set_exercise_record=(api_record)=>({//API로부터 받은 최근 중량체크 변화날짜나 처음여부를 담아줄것임
    type:SET_EXERCISE_RECORD,
    api_record
})

export const last_record=(record)=>({
    type:LAST_RECORD,
    record
});

export const push_breakfast=(record)=>({
    type:PUSH_BREAKFAST,
    record
});

export const push_lunch=(record)=>({
    type:PUSH_LUNCH,
    record
});

export const push_dinner=(record)=>({
    type:PUSH_DINNER,
    record
});

export const pop_breakfast=(new_arr)=>({
    type:POP_BREAKFAST,
    new_arr
});

export const pop_lunch=(new_arr)=>({
    type:POP_LUNCH,
    new_arr
});

export const pop_dinner=(new_arr)=>({
    type:POP_DINNER,
    new_arr
});

//액션생성함수

const initialState={//모달창들에서 페이지들을 의미
    page:"start_step"
};

const initialRef={//맨 위 모달창 켜는 버튼을 의미
    ref:""
};

const initialExerciseStart={//운동페이지들어갔나 안들어갔나 의미
    page:false
}
const initialFirstId={
    first_login:""
}

const initialTestState={//체력측정 들어갔는지 안 들어갔는지
    testState:"false",
    urlState:""
}
const initialExercise={//체력측정시 각 개수를 의미
    pushup:0,
    situp:0,
    squat:0
}
const initialClickedButton={//루틴 추천시 어떤 부위가 눌렸는지
    clickedButton:"total"
}

const initialPage={//기본적으로 오늘 하루전체 루틴을 다 보여줌
    page:"today_routine"
}

const initialInfoChange={//중량체크,시간체크,세트당 횟수에서 쓰이는,,
    current_weight:1000,
    current_time:1000,//이건 어차피 그냥 임의의 큰값으로 줘서 무겁다고 하더라도 다 빼는데 한참 걸리게 함,,이해가 안간다면 speedDialToolTipOpen 쪽 무거움 버튼참고
    current_cnt:1000,//똑같음
    clicked_button:"",
    clicked_count:0
}

const initialSet={//메인운동에서 세트수 진행 
    current_set:1
}

const initialTimeToModal={//휴식세트 창을 보여줄지 말지
    modalTime:false
}

const initialRoutineInfo={//api로부터 불러온 루틴정보 
    bodypart:[],
    part1:[],
    part2:[],
    part3:[]
};

const initialHowLong={
    min:"",
    sec:""
}

const initialPageProgress={//운동페이지에서 지금진행하고 있는 운동부위와 운동명의 인덱스 그리고 현재운동의 중량체크관련 정보를 가진다
    current_bodypart:0,
    current_exercise:0,
    is_First:true
}

const initialLastRecord={//중량,시간,개수 체크 변화전 초기값을 갖고 있어준다.-변화량 때문에
    last_record:""
}

const initialMeals={//아침,점심,저녁 정보를 가지고 있어준다.
    breakfast:["현미밥","닭가슴살","사과","오리구이","빵"],
    lunch:["현미밥","닭가슴살","사과","오리구이","빵"],
    dinner:["현미밥","닭가슴살","사과","오리구이","빵"]
}

//초기페이지 정보
export default function pageMove(state=initialState,action){//모달창의 페이지 이동 부분 
    switch (action.type) {
        case FIRST_CLEARPAGE:
            return {
                page:"first_clear_step"
            }
        case GOTOWEIGHT:
            return{
                page:"weight_page"
            }   
        case SECOND_CLEARPAGE:
            return {
                page:"second_clear_step"
            }            
        case LAST_CLEARPAGE:
            return {
                page:"last_clear_step"
            }

        default:
            return state;
    }
}
export function Appref(state=initialRef,action){//첫 로그인 시 뜨는 모달창의 ref값
    switch (action.type) {
        case MODALREF:
            return {
                ref:action.refValue
            }    
        default:
            return state;
    }
}

export function Exercise_start_reducer(state=initialExerciseStart,action){//운동모드로 들어갔는지 아닌지-상단 navbar의 유무를 보여줌
    switch (action.type) {
        case EXERCISE_START:
            return {
                page:true
            }    
        case NOT_EXCERCISE_START:
            return {
                page:false
            }      
        default:
            return state;
    }
}

export function first_login_check(state=initialFirstId,action){//첫 로그인인가 아님 여러번 접속 기록이 있는지-모달창 여부
    switch (action.type) {
        case FIRST_LOGIN:
            return{
                first_login:true
            }
        case SECOND_LOGIN:
            return{
                first_login:false
            }
        default:
            return state;
    }
}

export function testState_reducer(state=initialTestState,action){//카메라 준비->준비완료상태->테스트가능상태,준비타이머 상태
    switch (action.type) {
        case TESTSTATE:
            return{
                testState:"true",
                urlState:action.page
            }
    
        case NONE_TESTSTATE:{
            return{
                testState:"false",
                urlState:action.page
            }
        } 
        case SETTING_COMPLETED:
            return{
                testState:"completed",
                urlState:""
            }

        case PRE_TIMER:
            return{
                testState:"preTimer",
                urlState:""
            }    
        default:
            return state
    }
}

export function exercise_count_reducer(state=initialExercise,action){//체력측정개수를 담는다
    switch (action.type) {
        case PUSHUP_COUNT:
            return {
                ...state,
                pushup:state.pushup+1,
            }
        case SITUP_COUNT:
            return{
                ...state,
                situp:state.situp+1
            }    
        case SQUAT_COUNT:
            return{
                ...state,
                squat:state.squat+1
            }   
        case RESET_COUNT:{
            return{
                ...initialExercise
            }
        }    
        default:
            return state;
    }
}

export function change_clicked_button_reducer(state=initialClickedButton,action){//루틴페이지에서 눌린 버튼 담당
    switch (action.type) {
        case CHANGE_CLICKED_BUTTON:
            return{
                clickedButton:action.button_name
            }
    
        default:
            return state
    }
}

export function change_routine_page_reducer(state=initialPage,action){//루틴페이지에서 상단 소개 메뉴를 담당한다
    switch (action.type) {
        case TODAY_ROUTINE:
            return{
                page:"today_routine"
            }
        case EXERCISE_INFO:
            return{
                page:"exercise_info"
            }
        case EXTRA_ROUTINE:
            return{
                page:"extra_routine"
            }
        default:
            return state
    }
}

export function change_current_weight_reducer(state=initialInfoChange,action){//버튼 눌러서 중량,시간,개수 변화주는 곳
    switch (action.type) {
        case SET_CURRENT_WEIGHT:
            return{
                ...state,
                current_weight:action.start_kg,
            }
        case SET_CURRENT_TIME:
            return{
                ...state,
                current_time:action.start_time,
            }        

        case SET_CURRENT_CNT:
            return{
                ...state,
                current_cnt:action.start_cnt,
            }    
        case RESET:
            return{
                ...state,
                clicked_button:"",
                clicked_count:0,

            }    
        
        case VERY_HARD:
            return{
                ...state,
                current_weight:state.current_weight-(2*action.unit_kg),
                current_time:state.current_time-(2*action.unit_time),
                current_cnt:state.current_cnt-(2*action.unit_cnt),
                clicked_button:"very_hard",
                clicked_count:state.clicked_count+1
            }
        case HARD:
            return{
                ...state,
                current_weight:state.current_weight-(1*action.unit_kg),
                current_time:state.current_time-(1*action.unit_time),
                current_cnt:state.current_cnt-(1*action.unit_cnt),
                clicked_button:"hard",
                clicked_count:state.clicked_count+1
            }
        
        case PROPER:
            return{
                ...state,
                clicked_button:"proper",
                clicked_count:state.clicked_count+1
            }
        case EASY:
            return{
                ...state,
                current_weight:state.current_weight+(1*action.unit_kg),
                current_time:state.current_time+(1*action.unit_time),
                current_cnt:state.current_cnt+(1*action.unit_cnt),
                clicked_button:"easy",
                clicked_count:state.clicked_count+1
            } 
            
        case VERY_EASY:
            return{
                ...state,
                current_weight:state.current_weight+(2*action.unit_kg),
                current_time:state.current_time+(2*action.unit_time),
                current_cnt:state.current_cnt+(2*action.unit_cnt),
                clicked_button:"very_easy",
                clicked_count:state.clicked_count+1
            }
        case ERROR:
            return{
                ...state,
                clicked_button:"error",
                clicked_count:state.clicked_count+1
            }
        default:
            return state
    }
    // 클릭된 횟수를 바탕으로 버튼이 눌렸음을 인지
}

export function change_set_reducer(state=initialSet,action){//운동 세트 보여주는 부분 업데이트 해주는 곳
    switch(action.type){
        case RESET_SET:
            return{
                current_set:1
            }
        case INCREASE_SET:
            return{
                current_set:state.current_set+1
            }   
        default:
            return state     
    }
}

export function change_timeToModal_reducer(state=initialTimeToModal,action){//각 세트 끝났을 때 모달 띄워줄지 말지
    switch(action.type){
        case TIMETOMODAL:
            return{
                modalTime:true
            }
        case NOT_TIMETOMODAL:
            return{
                modalTime:false
            }   
        default:
            return state     
    }
}

export function update_routineInfo_reducer(state=initialRoutineInfo,action){//오늘의 루틴 api로 받았을 때 값 저장
    switch (action.type) {
        case ROUTINE_INFO:
            return {
                bodypart:action.bodypart,
                part1:action.part1,
                part2:action.part2,
                part3:action.part3
            }    
        default:
            return state;
    }
}

export function update_how_long_reducer(state=initialHowLong,action){//각 운동 얼마나 했는지
    switch(action.type){
        case HOW_LONG:
            return{
                min:action.min,
                sec:action.sec
            }
        default:
            return state;    
    }
}
export function update_page_progress_reducer(state=initialPageProgress,action){//운동 진행하면서 어디페이지인지
    switch (action.type) {
        case NEXT_PART:
            return {
                ...state,
               current_bodypart:state.current_bodypart+1,
               current_exercise:0
            }    
        case PREV_PART:
            return {
                ...state,
                current_bodypart:state.current_bodypart-1,
                current_exercise:0
            }   
        case NEXT_EXERCISE:
            return {
                ...state,
                current_exercise:state.current_exercise+1
            }     
        case PREV_EXERCISE:
            return {
                ...state,
                current_exercise:state.current_exercise-1
            }    
        case SET_EXERCISE_RECORD:
            return {
                ...state,
                is_First:action.api_record
            }        
        default:
            return state;
    }
}

export function update_last_record_reducer(state=initialLastRecord,action){//api 호출되었을 때 중량,시간,개수 변화전에 저장해두는 곳
    switch(action.type){
        case LAST_RECORD:
            return{
                last_record:action.record
            }
        default:
            return state;    
    }
}

export function update_meals_reducer(state=initialMeals,action){//아침,점심,저녁을 담아주는 곳
    switch(action.type){
        case PUSH_BREAKFAST:
            return{
                ...state,
                breakfast:state.breakfast.push(action.record)
            }
        case PUSH_LUNCH:
            return{
                ...state,
                lunch:state.lunch.push(action.record)
            }
        case PUSH_DINNER:
            return{
                ...state,
                dinner:state.dinner.push(action.record)
            }   
        
        case POP_BREAKFAST:
            return{
                ...state,
                breakfast:action.new_arr
            }
        
        case POP_LUNCH:
            return{
                ...state,
                lunch:action.new_arr
            }
        case POP_DINNER:
            return{
                ...state,
                dinner:action.new_arr
            }
        default:
            return state;    
    }
}
