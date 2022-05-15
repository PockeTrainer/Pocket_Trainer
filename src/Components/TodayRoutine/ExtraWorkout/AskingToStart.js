import React,{useState,useRef} from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useSelector } from "react-redux";
import { Chip } from "@mui/material";
import { styled } from "@mui/system";
import CancelIcon from '@mui/icons-material/Cancel';

export default function AskingToStart(){

  const closeRef=useRef();

  const extra_routine=useSelector(state=>state.update_extra_exercise_reducer);//추가운동 페이지의 전체 정보가져오기
  const {what_i_want_exercise}=extra_routine;

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

    return(
        <div className="modal fade" id="modal-asking-start"   role="dialog" aria-labelledby="modal-default" aria-hidden="true" style={{zIndex:9999}}>
            <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                        <button ref={closeRef}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{padding:"1rem"}}>
                        {
                            what_i_want_exercise.length===0
                            ?
                                <>
                                    <div className="modal-body" style={{padding:"1rem"}}>
                                        <div className="text-center">
                                            <CancelIcon sx={{color:"#5e72e4",fontSize:"3.5rem"}}/>
                                        </div>
                                        <span className="badge badge-primary" style={{fontSize:"1em",marginTop:"2rem",marginBottom:"1rem"}}>선택없음</span>
                                        <Pstyled bold="lighter">선택한 운동이 없어 진행을 할 수 없습니다.운동을 선택해주세요</Pstyled>
                                        
                                    </div>
                                </>
                            :
                                <>
                            
                                    <div className="text-center">
                                        <PlayArrowIcon sx={{color:"#5e72e4",fontSize:"2.5rem"}}/>
                                    </div>
                                    <span className="badge badge-primary" style={{fontSize:"1em",marginTop:"2rem",marginBottom:"1rem"}}>추가운동하기</span>
                                    <Pstyled bold="lighter">선택하신 해당 운동들을 하시겠습니까?</Pstyled>

                                    <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                                        {what_i_want_exercise.map((exercise,index)=>(
                                            <>
                                                <Chip key={index} label={exercise.name} sx={ChipStyle}  />
                                            </>
                                        ))}
                                    </div>

                                </>
                                
                        }
                        
                                    
                        
                    </div>

                    {
                        what_i_want_exercise.length===0
                        ?
                            <div className="modal-footer" style={{justifyContent:"center"}}>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"> <i className="ni ni-check-bold" /> 확인</button>
                            </div>
                        :
                            <div className="modal-footer" style={{justifyContent:"space-between"}}>
                                <button type="button" className="btn btn-primary" > <i className="ni ni-check-bold" /> 확인</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"><i className="ni ni-fat-remove" /> 취소</button>
                            </div>
                    }
                    
                </div>
            </div>
        </div>
    );
}