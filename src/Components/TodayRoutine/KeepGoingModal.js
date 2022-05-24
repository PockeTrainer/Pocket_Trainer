import React,{useState,useRef} from "react";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';
import {routine_info,exercise_start,next_part } from "../../modules/action";
import ReplayIcon from '@mui/icons-material/Replay';

function KeepGoingModal(){
    const closeRef=useRef();//모달창 닫는 버튼용도
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const _routine_info=useSelector(state=>state.update_routineInfo_reducer);//부위 정보는 그대로 가져온다
    const {bodypart,fail_list}=_routine_info;
    const Pstyled=styled('p')((props)=>({
        fontSize:"1.0rem",
        fontWeight:props.bold=="lighter"?"lighter":"600",
        lineWeight:"1.0",
        marginBottom:"0"
    }));
    const ChipStyle={
        fontFamily:"Noto Sans KR",
        backgroundColor:"#fb6340",
        color:"white"
    }


    const set_FailList_to_routine=()=>{//fail_list 정보를 routine_info으로 넘김
        let part1=[];
        let part2=[];
        let part3=[];
        let where_to_put;

        fail_list.map((exercise,index)=>{
            if(exercise.part==="가슴"||exercise.part==="등"||exercise.part==="어깨"){
                where_to_put=part1;
            }
            else if(exercise.part==="삼두"||exercise.part==="이두"||exercise.part==="하체"){
                where_to_put=part2;
            }
            else{
                where_to_put=part3;
            }
            where_to_put.push(exercise);
        });

        dispatch(routine_info(bodypart,part1,part2,part3));//fail_list를 순회하면서 생성된 값을 routine_info로 치환
    };

    const gotoKeepGoing=()=>{
        closeRef.current.click();
        set_FailList_to_routine();//routine_info의 값을 fail_list로 치환
        dispatch(exercise_start());
        if(fail_list[0].part==="삼두"||fail_list[0].part==="이두"||fail_list[0].part==="하체"){//첫 건너뛴 운동의 부위가 운동의 중간 부위일때
            dispatch(next_part());//한 부위를 건너뛴다
        }
        else if(fail_list[0].part==="복근"){//마지막 부위일때
            dispatch(next_part());
            dispatch(next_part());
        }
        navigate(`/routine/weightcheck/${fail_list[0].eng_name}`)
    }

    return(
        <div className="modal fade" id="modal-keep-going-alert" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
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
                            <ReplayIcon sx={{color:"#5e72e4",fontSize:"2.5rem"}}/>
                        </div>
                        <span className="badge badge-primary" style={{fontSize:"1em",marginTop:"2rem",marginBottom:"1rem"}}>이어하기</span>
                            <Pstyled bold="lighter">아직 오늘 클리어를 하지 못한 운동들이 있습니다.이어서 하시겠습니까?</Pstyled>

                        <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                            {fail_list.map((exercise,index)=>(
                                <>
                                    <Chip key={index} label={exercise.name} sx={ChipStyle}  />
                                </>
                            ))}
                        </div>
                                    
                        
                    </div>
                    
                    <div className="modal-footer" style={{justifyContent:"space-between"}}>
                        <button type="button" className="btn btn-primary" onClick={gotoKeepGoing} > <i className="ni ni-check-bold" /> 확인</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal"><i className="ni ni-fat-remove" /> 취소</button>
                    </div>
                </div>
            </div>
    </div>
    );
}
export default KeepGoingModal