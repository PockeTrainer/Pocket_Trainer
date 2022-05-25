import React, { useEffect,useRef,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import PartStepper from "../CameraTodayRoutine/PartStepper";
import Timer from "../ExerciseCounter/WithCamera/Timer";
import LinearWithValueLabel from "./LinearWithValueLabel";
import Stack from '@mui/material/Stack';
import { styled } from "@mui/system";
import { none_testState, reset,reset_set,not_timeToModal,final_result_page, Last_clear_page, reset_count} from "../../modules/action";
import { useLocation, useNavigate, useParams } from "react-router-dom";



import axios from "axios";


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}



const Pstyled=styled('p')((props)=>({
    fontSize:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0"
}));



function AlertModal({where}){
    let key_for_sendData=useRef("");
    const closeRef=useRef();//모달창 닫는 버튼용도
    const howmanySet=useSelector(state=>state.change_set_reducer.current_set);//현재까지 진행된 세트 수를 가져와준다.
    const timeToModal=useSelector(state=>state.change_timeToModal_reducer.modalTime)//모달창을 열지 말지..
    const count_result=useSelector(state=>state.exercise_count_reducer.pushup);//여기는 나중에 각 운동에 대한 모델에 의존한 개수 결과를 보여줘야한다..지금은 푸시업으로 예시
    const count=useRef(1);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const exercise=useParams();//현재의 운동명을 가져와준다
    const path=useLocation();//stop_today일때에는 url에서 운동명을 따줘야함
    const id=sessionStorage.getItem("user_id");//아이디가져오기

    const change_weight_info=useSelector(state=>state.change_current_weight_reducer);
    const{current_weight,current_time,current_cnt}=change_weight_info;//바뀐 현재의 목표중량을 가져온다


    const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const page_info=useSelector(state=>state.update_page_progress_reducer);//운동부위와 운동명 정보를 불러옴
    const{bodypart,part1,part2,part3,fail_list}=routine_info;//부위정보 담아주기
    const{current_bodypart,current_exercise,is_First}=page_info;//현재페이지의 운동부위와 운동명 인덱스

    const now_exercise=eval("part"+parseInt(current_bodypart+1)+"["+current_exercise+"]");//현재스텝의 운동정보를 가지고 있는다 ex)벤치프레스 객체

    const plank_time_state=useSelector(state=>state.plank_time_update_reducer.plank_state);//디폴트로는 true로 되어있음

    const appRef=useSelector(state=>state.Appref.ref);//모달창-초기회원시 유도해주는 모달



    const handleClose=()=>{
        closeRef.current.click();
    }

    const timeDemand_data={
        target_time:"00:"+parseInt(current_time/60)+":"+parseInt(current_time%60)
    }

    const cntDemand_data={
        target_cnt:current_cnt
    }
    const weightDemand_data={
        target_kg:current_weight
    }

    const sendData={
        time_demand:timeDemand_data,
        weight_demand:weightDemand_data,
        cnt_demand:cntDemand_data,
    }

    useEffect(()=>{
        if(count.current===1){//첨에는 모달창이 안 떴을지라도 바로 handleClose를 하면 오류가 나기에 첨에는 건너뛰어줘야한다.
            count.current+=1;
            return;
        }
        if(count_result===0&&howmanySet!==5){//이건 다시 리셋이 되었을 때의 상황을 의미한다
            // setTimeout(handleClose,500);//다시 모달창 닫아주기
            handleClose();
        }
    },[count_result])

    useEffect(()=>{
        if(exercise.exercise_name==="plank"){
            if(plank_time_state&&howmanySet!==5){//이건 다시 리셋이 되었을 때의 상황을 의미한다
                // setTimeout(handleClose,500);//다시 모달창 닫아주기
                handleClose();
            }
        }
    },[plank_time_state])
    
    useEffect(()=>{
        if(exercise.exercise_name==="plank"){
            key_for_sendData.current="time_demand";
        }
        else if(exercise.exercise_name==="seated_knees_up"||exercise.exercise_name==="crunch"){
            key_for_sendData.current="cnt_demand";
        }
        else{
            key_for_sendData.current="weight_demand";
        }
    },[])

    const sendEndWorkoutTime=async()=>{//운동 종료시간을 서버로 보내준다
        const today=new Date();
        const today_date_form=today.getFullYear()+"-"+parseInt(today.getMonth()+1)+"-"+today.getDate();
        let exercise_name_tmp;//운동명을 받아주는 임시변수

        if(exercise.exercise_name===undefined){//stop_today에서 호출하는 경우 params로 잡지 못하기에
            let url=path.pathname.split("/");
            exercise_name_tmp=url[url.length-1];
        }
        else{
            exercise_name_tmp=exercise.exercise_name;
        }
    
        await axios.post(`/workout/endDateTime/${exercise_name_tmp}/${today_date_form}/${id}`)//맨 처음에 들어왔을 때 운동시작 시간을 보내준다 ex)날짜형식
        .then((res) => {
            console.log(res.data);
    
        })
        .catch((err) => {
            console.log(err)
        })
    };

    if(where==="confirm"){
        const today=new Date();
        const today_date_form=today.getFullYear()+"-"+parseInt(today.getMonth()+1)+"-"+today.getDate();
        const startExercise=async()=>{
            await axios.put(`/workout/changeUserWorkoutInfo/${exercise.exercise_name}/${today_date_form}/${id}`,sendData[key_for_sendData.current])//루틴정보 불러와서 부위종류,part1,part2,part3 운동을 나눠서 데이터를 나눠줌
            .then((res) => {
                console.log(res.data);

            })
            .catch((err) => {
                console.log(err)
            })
            
            // setTimeout(handleClose,100);
            dispatch(none_testState());//다시 카메라상태 끄기로 변경
            dispatch(reset_count());//카운트된 개수 다시 초기화
            navigate("/routine/exercise/"+exercise.exercise_name);
            
        }

        return(
            <div className="modal fade" id="modal-default" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                            <button ref={closeRef} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{padding:"1rem"}}>
                            <div className="py-3 text-center">
                                <i className="ni ni-check-bold ni-3x" style={{color:"#5e72e4"}} />
                            </div>
                                <Pstyled bold="lighter">해당 무게로 {now_exercise.name}를 진행하시겠습니까?</Pstyled>
                            
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={startExercise} >운동시작</button>
                            <button type="button" className="btn btn-link  ml-auto" data-dismiss="modal">취소</button>
                        </div>
                    </div>
                </div>
          </div>
        );
    }

    else if(where==="warning"){
        return(
            <div className="modal fade" id="modal-default" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                            <button ref={closeRef}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{padding:"1rem"}}>
                            <div className="py-3 text-center">
                                <i className="ni ni-fat-remove ni-4x" style={{color:"#5e72e4"}} />
                            </div>
                                <Pstyled bold="lighter">오늘의 운동 피드백을 해주시기 바랍니다</Pstyled>
                            
                        </div>
                        
                        <div className="modal-footer" style={{justifyContent:"center"}}>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" >확인</button>
                        </div>
                    </div>
                </div>
          </div>
        );
    }
    else if(where==="grade_warning"){
        return(
            <div className="modal fade" id="modal-default" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                            <button ref={closeRef}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{padding:"1rem"}}>
                            <div className="py-3 text-center">
                                <i className="ni ni-fat-remove ni-4x" style={{color:"#5e72e4"}} />
                            </div>
                                <Pstyled bold="lighter">해당 무게는 최소로서 더 이상 낮은 중량으로는 불가능합니다.해당 중량을 유지합니다</Pstyled>
                            
                        </div>
                        
                        <div className="modal-footer" style={{justifyContent:"center"}}>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" >확인</button>
                        </div>
                    </div>
                </div>
          </div>
        );
    }

    else if(where==="stop_today"){//cardLayout에 위치함
        let page;//어디쪽에서 호출된 상황인지
        //체력평가 페이지에서 그만둘때
        if(path.pathname.includes("/test")){//끝까지 다왔을때 그만두면 그냥 말그대로 루틴 나가면 됌
            page="test";
        }
        else{
            page="routine";
        }

        const gotoFinish=()=>{
            if(path.pathname.includes("exercise")){//운동스텝에서만 나갈려고 할때 운동종료를 해줘야 함
                sendEndWorkoutTime();//해당 스텝에서 운동을 끝낼려고 하니 서버로 운동종료시간을 보내줌   
            }
            dispatch(none_testState());
            dispatch(reset());//현재운동이 가지고 있던 current_weight같은 정보 리셋
            dispatch(final_result_page());//페이지 정보 초기화-결과페이지로 이동
            dispatch(reset_set());//다시 세트초기화
            closeRef.current.click();
            navigate("/routine/finish");
        }

        const stopTest=()=>{//체력평가 쪽에서 그만둘때
            if(path.pathname.includes("/test/finalResult")){
                dispatch(Last_clear_page("end"));//모달창상으로 완전히 끝남을 의미함-굳이 모달을 또 띄울필요는 없을듯
                // appRef.current.click();
                closeRef.current.click();
                navigate("/");//홈으로 가게하기
            }
            else{//그외에 체력평가 중도포기시
                dispatch(none_testState());
                dispatch(reset_count());
                closeRef.current.click();
                navigate("/main/exercise_counter");
            }
        }
        return(
            <div className="modal fade" id="modal-stop_today" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                            <button ref={closeRef}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{padding:"1rem"}}>
                            <div className="text-center">
                                <i className="ni ni-button-power ni-4x" style={{color:"#5e72e4"}} /> 
                            </div>
                            <span className="badge badge-primary" style={{fontSize:"1em",marginTop:"2rem",marginBottom:"1rem"}}>긴급정지</span>
                                {
                                    page==="test"
                                    ?
                                    <Pstyled bold="lighter">체력평가를 여기서 그만두시겠습니까?체력평가를 하지 않을시 서비스이용이 불가능합니다</Pstyled>
                                    :
                                    <Pstyled bold="lighter">오늘의 운동을 여기서 그만두시겠습니까?</Pstyled>
                                }
                                
                            
                        </div>
                        
                        <div className="modal-footer" style={{justifyContent:"space-between"}}>
                            <button type="button" className="btn btn-primary" onClick={page==="test"?stopTest:gotoFinish} > <i className="ni ni-check-bold" /> 확인</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal"><i className="ni ni-fat-remove" /> 취소</button>
                        </div>
                    </div>
                </div>
          </div>
        );
    }

    else{

        const SpanStyle={
            backgroundColor:"#2dce89",
            borderColor:"#2dce89",
            color:"white",
            padding:"0.5rem 5.1rem",
            fontSize:"1.375rem",
            marginTop:"0.3em"
        }
        const badgeStyle={
            backgroundColor:"white"
        }

        const gotoFinish=()=>{
            sendEndWorkoutTime();//해당 스텝에서 운동을 끝낼려고 하니 서버로 운동종료시간을 보내줌
            dispatch(none_testState());
            dispatch(reset());//현재운동이 가지고 있던 current_weight같은 정보 리셋
            dispatch(reset_set());//다시 세트초기화
            dispatch(final_result_page());//마지막페이지로 이동
            closeRef.current.click();
            navigate("/routine/finish");
        }

        const gotoFeedback=()=>{
            sendEndWorkoutTime();//운동종료시간을 서버로 저장하게 함
            dispatch(none_testState());//다시 카메라 준비상태로 다시원상태로 복귀
            dispatch(reset_set());//다시 세트초기화
            dispatch(not_timeToModal());//다시 모달창 없애기
            handleClose();
            navigate("/routine/evaluation/"+exercise.exercise_name);
        }
        const part=eval("bodypart"+"["+current_bodypart+"]");
        const next_part=bodypart[current_bodypart+1];//다음 부위
        const next_exercise=eval("part"+parseInt(current_bodypart+1)+"["+parseInt(current_exercise+1)+"]");//다음스텝의 운동정보를 가지고 있는다 ex)벤치프레스 객체

        return(
            <div className="modal fade" id="modal-default" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                            <button ref={closeRef} style={{display:"none"}} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{padding:"1rem"}}>
                            <div className="text-center">
                                <i className="ni ni-check-bold ni-3x" style={{color:"#5e72e4"}} />
                            </div>
                                <h4 className="heading" style={{fontSize:"1.5rem",marginBottom:"3em"}}>{howmanySet}세트 완료!</h4>
                                <PartStepper where="set_progress"/>

                                <span className="badge badge-success" style={{fontSize:"1em",marginTop:"3em"}}>휴식시간</span>
                                

                            
                                {
                                    timeToModal && howmanySet!==5
                                    ?
                                    <>
                                    {/* 버튼눌린게 딱히 큰 의미는 없지만 true여야만 타이머 돌아가기 시작함 */}
                                    <Timer where="Press_and_3major" buttonClicked={true}/>
                                    <Pstyled bold="lighter">다음세트까지</Pstyled>
                                    <LinearWithValueLabel where="Press_and_3major"/>
                                </>:
                                (howmanySet===5&&timeToModal
                                    ?
                                    <>
                                        {/* 버튼눌린게 딱히 큰 의미는 없지만 true여야만 타이머 돌아가기 시작함 */}
                                        <Timer where="Press_and_3major" buttonClicked={true}/>
                                        <Pstyled bold="thick">{part}</Pstyled>
                                        <div className="alert alert-warning" role="alert" style={SpanStyle} >
                                            <Stack direction="column">
                                                <span className="badge badge-primary btn-lg" style={badgeStyle}>{next_exercise===undefined?"다음부위":"다음운동"}</span> 
                                                <span className="alert-text" >{next_exercise===undefined?next_part:next_exercise.name}</span>
                                            </Stack>
                                        </div>
                                    </>
                                    :null
                                    )

                                }

                                {
                                howmanySet===5&&count_result===0
                                &&
                                <div className="modal-footer" style={{padding:"0rem"}}>
                                    <button onClick={gotoFeedback} style={{margin:"auto"}} type="button" className="btn btn-primary"><i className="ni ni-button-play"></i>{next_exercise===undefined?"다음부위":"다음운동"}</button>
                                    <button style={{margin:"auto"}} type="button" className="btn btn-primary" onClick={gotoFinish}><i className="ni ni-button-pause"></i>그만두기</button>
                                </div>
                                }

                                
                                
    
                        </div>
                        
                    </div>
                </div>
          </div>
        );
    }

   

}
export default AlertModal