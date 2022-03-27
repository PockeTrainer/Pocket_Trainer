import React, { useEffect,useRef,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import PartStepper from "../CameraTodayRoutine/PartStepper";
import Timer from "../ExerciseCounter/WithCamera/Timer";
import LinearWithValueLabel from "./LinearWithValueLabel";
import Stack from '@mui/material/Stack';
import { styled } from "@mui/system";
import { none_testState, reset,reset_set,not_timeToModal } from "../../modules/action";
import { useNavigate, useParams } from "react-router-dom";


import axios from "axios";


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}



const Pstyled=styled('p')((props)=>({
    fontSize:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0"
}))

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
    const id=sessionStorage.getItem("user_id");//아이디가져오기

    const change_weight_info=useSelector(state=>state.change_current_weight_reducer);
    const{current_weight,current_time,current_cnt}=change_weight_info;//바뀐 현재의 목표중량을 가져온다


    const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const page_info=useSelector(state=>state.update_page_progress_reducer);//운동부위와 운동명 정보를 불러옴
    const{bodypart,part1,part2,part3}=routine_info;//부위정보 담아주기
    const{current_bodypart,current_exercise,is_First}=page_info;//현재페이지의 운동부위와 운동명 인덱스

    const now_exercise=eval("part"+parseInt(current_bodypart+1)+"["+current_exercise+"]");//현재스텝의 운동정보를 가지고 있는다 ex)벤치프레스 객체

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
        if(count.current===0){//첨에는 모달창이 안 떴을지라도 바로 handleClose를 하면 오류가 나기에 첨에는 건너뛰어줘야한다.
            return;
        }
        if(count_result===0&&howmanySet!==5){//이건 다시 리셋이 되었을 때의 상황을 의미한다
            // setTimeout(handleClose,500);//다시 모달창 닫아주기
            handleClose();
        }
    },[count_result])
    
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

    console.log(where)

    if(where==="confirm"){
        const today=new Date();
        const today_date_form=today.getFullYear()+"-"+parseInt(today.getMonth()+1)+"-"+today.getDate();
        const startExercise=async()=>{
            await axios.put(`http://127.0.0.1:8000/api/workout/changeUserWorkoutInfo/${exercise.exercise_name}/${today_date_form}/${id}`,sendData[key_for_sendData.current])//루틴정보 불러와서 부위종류,part1,part2,part3 운동을 나눠서 데이터를 나눠줌
            .then((res) => {
                console.log(res.data);

            })
            .catch((err) => {
                console.log(err)
            })
            
            // setTimeout(handleClose,500);
            dispatch(none_testState());//다시 카메라상태 끄기로 변경
            dispatch(reset());//눌린버튼들에 대한 정보 초기화-다음페이지로 넘어가니까
            sleep(2000).then(()=>navigate("/routine/exercise/"+exercise.exercise_name));
            
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

    else if(where==="stop_today"){

        const gotoFinish=()=>{
            dispatch(none_testState());
            closeRef.current.click();
            navigate("/routine/finish");
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
                                <Pstyled bold="lighter">오늘의 운동을 여기서 그만두시겠습니까?</Pstyled>
                            
                        </div>
                        
                        <div className="modal-footer" style={{justifyContent:"space-between"}}>
                            <button type="button" className="btn btn-primary" onClick={gotoFinish} > <i className="ni ni-check-bold" /> 확인</button>
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

        const gotoFeedback=()=>{
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
                                    <Timer where="Press_and_3major"/>
                                    <Pstyled bold="lighter">다음세트까지</Pstyled>
                                    <LinearWithValueLabel where="Press_and_3major"/>
                                </>:
                                (howmanySet===5&&timeToModal
                                    ?
                                    <>
                                        <Timer where="Press_and_3major"/>
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
                                    <button style={{margin:"auto"}} type="button" className="btn btn-primary" data-dismiss="modal"><i className="ni ni-button-pause"></i>그만두기</button>
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