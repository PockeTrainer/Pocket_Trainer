import React,{useEffect,useState,useRef} from "react";
import Camera from "../ExerciseCounter/WithCamera/Camera";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from '@mui/material/Skeleton';
import Grow from '@mui/material/Grow';
import Zoom from '@mui/material/Zoom';
import Stack from '@mui/material/Stack';
import SpeedDialTooltipOpen from "../SameLayout/SpeedDialToolTipOpen"
import { useParams } from "react-router-dom";

import { set_current_weight } from "../../modules/action";
import { set_current_time } from "../../modules/action";
import { set_current_cnt } from "../../modules/action";
import AlertModal from "../SameLayout/AlertModal";

import Typography from '@mui/material/Typography';
import LinearWithValueLabel from "./LinearWithValueLabel";



function PracticeStep(){
    const testState=useSelector(state=>state.testState_reducer.testState);//카메라가 성공적으로 불러와졌는지 여부
    const count=useRef(1);//카운트용
    const modalRef=useRef();//모달창 ref

    const [checked, setChecked] = useState(false);//전체 카메라화면 transition
    const [message,setMessage]=useState(false);//화면에 띄우는 메시지 transition
    const dispatch=useDispatch();//이걸로 무게설정할것임

    const exercise_name=useParams();//url에서 운동명 가져오기-벤치프레스이면 해당 초기무게를 따로 설정해둔것에서 가져오자-ExerciseInfo.js에 넣자
    const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const page_info=useSelector(state=>state.update_page_progress_reducer);//운동부위와 운동명 정보를 불러옴
    const{bodypart,part1,part2,part3,fail_list}=routine_info;//부위정보 담아주기
    const{current_bodypart,current_exercise,is_First}=page_info;//현재페이지의 운동부위와 운동명 인덱스

    const now_exercise=eval("part"+parseInt(current_bodypart+1)+"["+current_exercise+"]");//현재스텝의 운동정보를 가지고 있는다 ex)벤치프레스 객체


    const change_weight_info=useSelector(state=>state.change_current_weight_reducer);
    const{current_weight,current_time,current_cnt,clicked_button,clicked_count}=change_weight_info;

    const [min,setMin]=useState("");//플랭크 할때에 쓰이는 분을 의미
    const [sec,setSec]=useState("");//초를 의미

    let key_for_message=useRef();//메시지를 주기위한 메시지 객체의 키값

    //위에는 각종 상수및 state

    const handleMessageChange=()=>{
        setMessage((prev)=>!prev);
    }

    const handleChange = () => {
        setChecked((prev) => !prev);
    };
  
    const openModal=()=>{
        modalRef.current.click()
    }
    useEffect(()=>{
        if(count.current===1){
            count.current+=1;
            handleChange();// 전체화면트랜지션

            if(exercise_name.exercise_name==="plank"){
                const start_time=now_exercise.Info_from_api.target_time;//현재저장되어 있던 초기 시간을 가져온다-플랭크-대신에 초로 환산해주자
                var tmp=start_time.split(":");
                
                let sec_converted=parseInt(tmp[1])*60+parseInt(tmp[2]);//초로 환산해줌

                dispatch(set_current_time(sec_converted));
                key_for_message.current="time_demand";

            }
            else if(exercise_name.exercise_name==="seated_knees_up"||exercise_name.exercise_name==="crunch"){
                const start_cnt=now_exercise.Info_from_api.target_cnt;//현재저장되어 있던 초기 개수를 가져온다-크런치,시티드니업
                dispatch(set_current_cnt(start_cnt));
                key_for_message.current="cnt_demand";
            }
            else{
                const start_kg=now_exercise.Info_from_api.target_kg;//현재저장되어 있던 초기 무게를 가져온다-거의 대부분운동
                dispatch(set_current_weight(start_kg));//시작무게설정

                if(exercise_name.exercise_name==="pec_dec_fly"||exercise_name.exercise_name==="lat_pull_down"||exercise_name.exercise_name==="seated_row"||exercise_name.exercise_name==="reverse_pec_dec_fly"||exercise_name.exercise_name==="cable_push_down"||exercise_name.exercise_name==="arm_curl"||exercise_name.exercise_name==="leg_extension"){
                    key_for_message.current="pound_demand";
                }
                else{
                    key_for_message.current="weight_demand";
                }
                
            }
            
            
        }
        let tmp_info=localStorage.getItem(exercise_name.exercise_name);//해당 운동에 대한 이전 저장해둔 값을 가져온다
        if(exercise_name.exercise_name==="plank"){
            
            setMin(parseInt(current_time/60));//분설정
            setSec(current_time%60);//초설정
            localStorage.setItem(exercise_name.exercise_name,JSON.stringify({...JSON.parse(tmp_info),new:current_time}));//기존데이터+새로운 데이터로 업데이트
        }
        else if(exercise_name.exercise_name==="seated_knees_up"||exercise_name.exercise_name==="crunch"){
            localStorage.setItem(exercise_name.exercise_name,JSON.stringify({...JSON.parse(tmp_info),new:current_cnt}));//기존데이터+새로운 데이터로 업데이트
        }
        else{
            localStorage.setItem(exercise_name.exercise_name,JSON.stringify({...JSON.parse(tmp_info),new:current_weight}));//기존데이터+새로운 데이터로 업데이트
        }

        if(clicked_button!==""){ 
            // 무엇이 눌린게 있다면..
            handleMessageChange();//보여주고
            setTimeout(handleMessageChange,1000);//닫고

            if(clicked_button==="proper"){
                // 적절하다고 생각들면 모달창..
               setTimeout(openModal,1000);
            }
            return;
        }
         
        setTimeout(handleMessageChange,1000);
        // 처음에는 문자보여주고 두번째 랜더링시 문자다시 숨기기

    },[testState,clicked_button,clicked_count,current_time])
  
    // clicked_count를 넣으므로써 지속적인 업데이틀를 반영가능-버튼이 안 바뀌어도


    const subtitle={
        position:"absolute",
        color:"#5e72e4",
        zIndex:"1",
        fontSize:"2em",
        top:"5em",
        backgroundColor:"#f7fafc",
        lineHeight:"1.5em"
    }

    const practiceStep={
        position:"absolute",
        color:"#2dce89",
        zIndex:"1",
        fontSize:"1em",
        bottom:"0",
        backgroundColor:"rgb(247 250 252 / 0%)",
        lineHeight:"1.5em"
    }

    const ShowCount={
        position:"absolute",
        color:"#2dce89",
        zIndex:"9999",
        fontSize:"2em",
        top:"0",
        right:"0",
        lineHeight:"1.5em"
    }
    const ProgressWrpperStyle={
        position:"absolute",
        zIndex:"9999",
        right:"0",
        transform:"rotate(-90deg)"
    }

    const SpanStyle={
        backgroundColor:"#2dce89",
        borderColor:"#2dce89",
        color:"white",
        padding:"0.5rem 7.1rem",
        fontSize:"1.875rem",
        marginTop:"0.3em"
    }

    const badgeStyle={
        backgroundColor:"white"
    }

    const TypographyStyle={
        fontWeight:"500",
        lineHeight:"0.95"
    }
    //Transition용

    const skeleton={
        width:"100%",
        height:"80vh",
        "&.MuiSkeleton-root::after":{background: "linear-gradient(90deg, transparent, #5e72e4, transparent)"},
        visibility:testState==="completed"?"hidden":"visible"
    }

    const loading_content={
        false:"불러오는중..",
        completed:"준비완료!",
    }

    // 밑에는 클릭된 버튼여부에 필요한 내용
    const alert_content={
        very_hard:{
            time_demand:"20초를 감소시킵니다!",
            cnt_demand:"4개를 감소시킵니다!",
            weight_demand:now_exercise.unit_kg*2+"kg"+"감소 시켜주세요!",
            pound_demand:now_exercise.unit_kg*2+"lbs"+"감소 시켜주세요!"
        },
        hard:{
            time_demand:"10초를 감소시킵니다!",
            cnt_demand:"2개를 감소시킵니다!",
            weight_demand:now_exercise.unit_kg*1+"kg"+"감소 시켜주세요!",
            pound_demand:now_exercise.unit_kg*1+"lbs"+"감소 시켜주세요!"
        },
        proper:{
            time_demand:"한세트시간 설정완료",
            cnt_demand:"한세트개수 설정완료",
            weight_demand:"해당무게로 진행!",
            pound_demand:"해당파운드로 진행!"
        },
        easy:{
            time_demand:"10초를 증가시킵니다!",
            cnt_demand:"2개를 증가시킵니다!",
            weight_demand:now_exercise.unit_kg*1+"kg"+"증가 시켜주세요!",
            pound_demand:now_exercise.unit_kg*1+"lbs"+"증가 시켜주세요!",
        },
        very_easy:{
            time_demand:"20초를 증가시킵니다!",
            cnt_demand:"4개를 증가시킵니다!",
            weight_demand:now_exercise.unit_kg*2+"kg"+"증가 시켜주세요!",
            pound_demand:now_exercise.unit_kg*2+"lbs"+"증가 시켜주세요!",
        },
        error:{
            time_demand:"해당시간으로 불가능!",
            cnt_demand:"해당개수로 불가능",
            weight_demand:"해당무게로 불가능!",
            pound_demand:"해당파운드로 불가능!"
        }

    }
    return(
        <>
        <div style={{position:"relative"}}>

        
        {/* 카메라부분 */}
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}>
            <div style={{position:"relative"}}>

                
                <Camera display={testState==="completed"?"yes":"no"} />

                <Skeleton animation="wave" variant="rectangular" sx={skeleton}/>

                <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                   <span className="badge" style={practiceStep}>연습세트중</span>
               </div>

               <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                   <span className="badge badge-primary" style={ShowCount}>0개</span>
               </div>
               

                {/* <div className="progress-wrapper" style={ProgressWrpperStyle}>
                        <div className="progress-info">
                            <div className="progress-percentage">
                                <span>60%</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: '60%'}} />
                        </div>
                </div> */}
                <LinearWithValueLabel/>

            </div>
        </Grow>


        
        {/* 현재중량정보부분 */}
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}>
                <div style={{position:"relative"}}>
                    <div className="alert alert-warning" role="alert" style={SpanStyle} >
                        <Stack direction="column">

                            {
                            exercise_name.exercise_name==="plank"
                            ?
                                <>
                                    <span className="badge badge-primary btn-lg" style={badgeStyle}>현재세트당시간</span>
                                    <span className="alert-text" ><strong>{min===0?sec+"초":min+"분"+sec+"초"}</strong></span>
                                </>
                            :
                            (exercise_name.exercise_name==="crunch"||exercise_name.exercise_name==="seated_knees_up"
                            ?
                                <>
                                    <span className="badge badge-primary btn-lg" style={badgeStyle}>현재세트당횟수</span>
                                    <span className="alert-text" ><strong>{current_cnt}개</strong></span>
                                </>
                            :(
                                exercise_name.exercise_name==="pec_dec_fly"||exercise_name.exercise_name==="lat_pull_down"||exercise_name.exercise_name==="seated_row"||exercise_name.exercise_name==="reverse_pec_dec_fly"||exercise_name.exercise_name==="cable_push_down"||exercise_name.exercise_name==="arm_curl"||exercise_name.exercise_name==="leg_extension"
                                ?
                                    <>
                                        <span className="badge badge-primary btn-lg" style={badgeStyle}>현재파운드</span>
                                        <span className="alert-text" ><strong>{current_weight}lbs</strong></span>
                                    </> 
                                :
                                <>
                                    <span className="badge badge-primary btn-lg" style={badgeStyle}>현재중량</span>
                                    <span className="alert-text" ><strong>{current_weight}kg</strong></span>
                                </> 
                            )
                                
                            )
                            }

                            {
                                exercise_name.exercise_name==="bench_press"||exercise_name.exercise_name==="incline_press"
                                ?
                                <>
                                    <Typography sx={TypographyStyle} variant="subtitle1" gutterBottom component="div">(바포함+20kg)</Typography>
                                </>
                                :
                                null
                            }
                        </Stack>
                    </div>
                    <SpeedDialTooltipOpen now_exercise={now_exercise} is_First={is_First}/>
                    {/* 무게 평가 다이얼 버튼 */}
                </div>
        </Grow>

        <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                <Zoom in={message}><span className="badge badge-primary" style={subtitle}>{clicked_button===""?loading_content[testState]:alert_content[clicked_button][key_for_message.current]}</span></Zoom>
                {/* 버튼이 눌린게 있냐 없냐에 따라 여부로 컨텐츠 용도가 준비,시작 또는 알림전달로 쓰임 */}
        </div>
            
       
        <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-default">Default</button>
        <AlertModal where="confirm" />
        </div>
        </>
    );
}
export default PracticeStep