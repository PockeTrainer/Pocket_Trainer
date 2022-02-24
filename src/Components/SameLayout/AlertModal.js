import React, { useEffect,useRef } from "react";
import { useSelector } from "react-redux";
import PartStepper from "../CameraTodayRoutine/PartStepper";
import Timer from "../ExerciseCounter/WithCamera/Timer";
import LinearWithValueLabel from "./LinearWithValueLabel";

const Pstyle={
    fontSize:"1.0rem",
    fontWeight:"lighter",
    lineWeight:"1.0"

}
function AlertModal({where}){
    const closeRef=useRef();//모달창 닫는 버튼용도
    const howmanySet=useSelector(state=>state.change_set_reducer.current_set);//현재까지 진행된 세트 수를 가져와준다.
    const timeToModal=useSelector(state=>state.change_timeToModal_reducer.modalTime)//모딜창을 열지 말지..
    const count=useRef(1);

    const handleClose=()=>{
        closeRef.current.click();
    }
    useEffect(()=>{
        if(count.current===1){
            count.current+=1;
            return;
        }
        setTimeout(handleClose,1000);//다시 모달창 닫아주기
    },[howmanySet])

    if(where==="confirm"){
        return(
            <div className="modal fade" id="modal-default" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                            <button  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{padding:"1rem"}}>
                            <div className="py-3 text-center">
                                <i className="ni ni-check-bold ni-3x" style={{color:"#5e72e4"}} />
                            </div>
                                <p style={{Pstyle}}>해당 무게로 벤치프레스를 진행하시겠습니까?</p>
                            
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">운동시작</button>
                            <button type="button" className="btn btn-link  ml-auto" data-dismiss="modal">취소</button>
                        </div>
                    </div>
                </div>
          </div>
        );
    }

    else{
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
                                timeToModal&&
                                <>
                                    <Timer where="Press_and_3major"/>
                                    <LinearWithValueLabel where="Press_and_3major"/>
                                </>}
                                
    
                        </div>
                        
                    </div>
                </div>
          </div>
        );
    }

   

}
export default AlertModal