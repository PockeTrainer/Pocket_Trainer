//로그인 시작 모달
const FIRST_CLEARPAGE="first_clear";
const SECOND_CLEARPAGE="second_clear";
const LAST_CLEARPAGE="last_clear";
const GOTOWEIGHT="gotoweight";

//app.js에서 사용되는 액션타입
const MODALREF="modalref"
const FIRST_LOGIN="first_login";
const SECOND_LOGIN="second_login";

//체력측정이 시작되었는지 여부 액션타입
const TESTSTATE="testState";
const NONE_TESTSTATE="none_test";
const SETTING_COMPLETED="setting_completed";
const PRE_TIMER="pre_timer";
//체력측정에서 사용되는 액션타입
const PUSHUP_COUNT="pushup_count";
const SITUP_COUNT="situp_count ";
const SQUAT_COUNT="squat_count";
//운동추천 루틴페이지에서 눌린 버튼변경 액션
const CHANGE_CLICKED_BUTTON="change_clicked_button";
//루틴페이지에서 어디에있는지를 알려주는 액션
const TODAY_ROUTINE="today_routine";
const EXERCISE_INFO="exercise_info";
const EXTRA_ROUTINE="extra_routine";
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

//액션생성함수

const initialState={//모달창들에서 페이지들을 의미
    page:"start_step"
};

const initialRef={//맨 위 모달창 켜는 버튼을 의미
    ref:""
};

const initialFirstId={
    first_login:""//지금 개발의 편의를 위해 꺼놓음 실제 할때에는 true로 바꾸기
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

const initialPage={
    page:"today_routine"
}
//초기페이지 정보
export default function pageMove(state=initialState,action){
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
export function Appref(state=initialRef,action){
    switch (action.type) {
        case MODALREF:
            return {
                ref:action.refValue
            }    
        default:
            return state;
    }
}

export function first_login_check(state=initialFirstId,action){
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

export function testState_reducer(state=initialTestState,action){
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

export function exercise_count_reducer(state=initialExercise,action){
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
        default:
            return state;
    }
}

export function change_clicked_button_reducer(state=initialClickedButton,action){
    switch (action.type) {
        case CHANGE_CLICKED_BUTTON:
            return{
                clickedButton:action.button_name
            }
    
        default:
            return state
    }
}

export function change_routine_page_reducer(state=initialPage,action){
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