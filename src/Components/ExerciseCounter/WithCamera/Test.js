import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Camera from "./Camera";
import Timer from "./Timer";
import { Skeleton } from "@mui/material";

import Zoom from '@mui/material/Zoom';
import { Grow } from "@mui/material";
import ModalInstruction from "./ModalInstruction";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import FlagIcon from '@mui/icons-material/Flag';
import LinearWithValueLabel from "../../CameraTodayRoutine/LinearWithValueLabel";
import { styled } from "@mui/system";
import { reset_send_angle,reset_send_wrong_posture,reset_send_posture_of_exercise } from "../../../modules/action";




function sleep(ms){
  return new Promise((r)=>setTimeout(r,ms));
}
var ready_audio = new Audio('/audios/ready1.mp3');
var start_audio=new Audio('/audios/start1.mp3');

function Test(){

    const testState=useSelector(state=>state.testState_reducer.testState);
    const dispatch=useDispatch();
    const module=require("../../../ExercisesInfo/ExerciseInfo.js");

    const exercise_name=useParams();//뒤에 파람스 가져올려고

    const modalRef=useRef();//초반에 띄워주는 알림창

    const [checked, setChecked] = useState(false);//화면 transition
    const [grid_show,set_grid_show]=useState(false);//그리드 보여주기 transition
    const [message_effect,set_message_effect]=useState(false);//준비,시작 transition
    const [modalTime,set_modalTime]=useState(false);//모달이 열렸는지 닫혔는지
    const [buttonClicked,set_ButtonClicked]=useState(false);//모달창에서 최종 모달닫기 버튼 눌렸는지를 알려준다
    const count=useRef(1);//초반랜더링 잡기
    const [message_state,set_message_state]=useState(false);//3초남았는지 준비시간까지
    const [show_posture,set_show_posture]=useState(false);//잘못된 자세 교정멘트
    const wrong_posture=useSelector(state=>state.update_wrong_posture_reducer.text);//멘트 밑에서부터 받기

    const [key_for_css,set_key_for_css]=useState("gridStyle");//운동마다 다른 그리드 스타일-디폴트는 gridStyle


    const handleChange = () => {//transition 
    setChecked((prev) => !prev);
    };

    const handleModalInstruction=()=>{//모달창 열어주기
      modalRef.current.click();
      set_modalTime(true);//모달창을 열었다
    }

    const handleGridShow=()=>{//그리드 보여주기
      set_grid_show(prev=>!prev);
    }

    const handleMessage=()=>{//준비,시작 멘트
      set_message_effect(prev=>!prev);
    }

    const handleShowPosture=()=>{//자세교정 멘트를 뜰 때 보여줌
      set_show_posture(prev=>!prev);
  }

    let result=useSelector(state=>state.exercise_count_reducer);//방금 운동의 카운트된 개수
    result=result.pushup
    sessionStorage.setItem(exercise_name.exercise_name,result);//해당 운동명 키 값으로 업데이트
    

    const skeleton={
      width:"100%",
      height:"80vh",
      "&.MuiSkeleton-root::after":{background: "linear-gradient(90deg, transparent, #5e72e4, transparent)"},
      visibility:testState==="completed"||testState==="preTimer"||testState==="true"?"hidden":"visible"
  }


  const MainStep={
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
      zIndex:"1",
      fontSize:"2em",
      top:"0",
      right:"0",
      lineHeight:"1.5em"
  }

  const Pstyled=styled('p')((props)=>({
    fontSize:props.size?props.size:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0"
}));

const MessageStyle={
  position:"absolute",
  color:"white",
  zIndex:"1",
  fontSize:"2.5rem",
  top:"1em",
  backgroundColor:"rgb(45 206 137 / 19%)",
  lineHeight:"1.5em"
}

  const gridStyle={//그리드 보여주기 transition
    position:"absolute",
    color:"#5e72e4",
    zIndex:"1",
    fontSize:"1em",
    bottom:"7em",
    backgroundColor:"rgb(247 250 252 / 0%)",
    lineHeight:"1.5em",
    width:"100%",
    overflow:"hidden"
  }
  
  const GridMessageTimerStyle={
    backgroundColor:"rgb(255 255 255 / 65%)",
    borderColor:"rgba(45, 206, 137, 0)",
    color:"#ff011a",
    padding:"0.5rem 1.5rem",
    fontSize:"1.875rem",
    marginTop:"0.3em",
    position:"absolute",
    top:"7rem"
}


const bench_press_Grid={
  position:"absolute",
  color:"#5e72e4",
  zIndex:"1",
  fontSize:"1em",
  bottom:"8em",
  backgroundColor:"rgb(247 250 252 / 0%)",
  lineHeight:"1.5em",
  width:"85%",
  overflow:"hidden"
}

const incline_press_Grid={
  position:"absolute",
  color:"#5e72e4",
  zIndex:"1",
  fontSize:"1em",
  bottom:"8em",
  backgroundColor:"rgb(247 250 252 / 0%)",
  lineHeight:"1.5em",
  width:"82%",
  overflow:"hidden"
}

const side_lateral_raise_Grid={
  position:"absolute",
  color:"#5e72e4",
  zIndex:"1",
  fontSize:"1em",
  bottom:"10em",
  backgroundColor:"rgb(247 250 252 / 0%)",
  lineHeight:"1.5em",
  width:"53%",
  overflow:"hidden"
}

    //위에는 스타일 객체 및 멘트

    useEffect(()=>{
      handleChange();//화면 열기
      setTimeout(handleModalInstruction,500);//모달창 열어줘서 초반 인스트럭션 알려주기

    },[])

    useEffect(()=>{
      if(count.current===1){
        dispatch(reset_send_angle());
        dispatch(reset_send_posture_of_exercise());
        dispatch(reset_send_wrong_posture());
        count.current+=1;

        
        if (exercise_name.exercise_name!=="bench_press"&&exercise_name.exercise_name!=="incline_press"&&exercise_name.exercise_name!=="side_lateral_raise"){
          set_key_for_css("gridStyle");
        }else{
          set_key_for_css(exercise_name.exercise_name+"_Grid");

      }
        return;
      }
      if(!modalTime){
        handleGridShow();//그리드 보여주기
        handleMessage();//그리드에 몸을 맞춰주세요! 열기
        setTimeout(handleMessage,2000)//2초뒤에 다시 닫아주고
      }
    },[modalTime])

    useEffect(()=>{
      if(message_state===true){
        handleMessage();//다시 열어주기-준비 시작
        ready_audio.play().catch(e => {
            console.log(e);
        });
        sleep(2000).then(()=>{
          handleMessage();
        });
        sleep(3000).then(()=>set_message_state(false))
        
      }
    },[message_state])

    useEffect(()=>{

      if(testState==="true"){
        start_audio.play().catch(e => {
          console.log(e);
      });
        handleMessage();//열기
        setTimeout(handleMessage,1000);//닫기
        handleGridShow();//그리드 닫기
      }
    },[testState])
    
    useEffect(()=>{
      if(wrong_posture!==""&& testState==="true"){
          handleShowPosture();
          setTimeout(handleShowPosture,1000);
      }
  },[wrong_posture,testState])//잘못된 자세가 인식될 때마다 멘트를 쳐줌

    const message_content={
      false:"",
      preTimer:<><AccountBoxIcon  sx={{color:"#2dce89",fontSize:"2.0em"}}/>그리드에 몸을<br></br>맞춰넣어주세요!</>,
      before_start:<><AlarmOnIcon  sx={{color:"#2dce89",fontSize:"2.0em"}}/>준비!</>,
      true:<><FlagIcon  sx={{color:"#2dce89",fontSize:"2.0em"}}/>시작</>
    }
    return(
        <div style={{position:"relative"}}>


          {/* 카메라부분 */}
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}>
            <div style={{position:"relative"}}>

                
                <Camera display={testState=="true"||testState=="preTimer"?"yes":"no"} />

                <Skeleton animation="wave" variant="rectangular" sx={skeleton}/>

                <div style={{//화면 아래에 떠주는 상태
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                 {
                   testState==="true"
                   ?
                   <span className="badge" style={MainStep}>평가중</span>
                   :
                   <span className="badge" style={{...MainStep,color:"#5e72e4"}}>평가준비중</span>
                 }
                   
               </div>


                {/* 개수카운트 */}
                <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                }}>
                    <span className="badge badge-primary" style={ShowCount}>{result}개</span>
                </div>

                <LinearWithValueLabel />
              

               
               
            </div>
        </Grow>

         {/* 스탑워치정보부분 */}
         <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}>
                <div style={{position:"relative"}}>
                    {/* <div className="alert alert-warning" role="alert" style={SpanStyle} >
                        <Stack direction="column">
                            <span className="badge badge-primary btn-lg" style={badgeStyle}>운동시간</span> 
                            
                        </Stack>
                    </div> */}
                    <Timer exercise={exercise_name.exercise_name} where="physical_test_ready" buttonClicked={buttonClicked} set_message_state={set_message_state}/>
                    {/* 모달창에서 눌렸는지 여부를 바꿔주는 함수,메시지 3초전에 알림 줄 수있는 여부 함수 */}
                </div>
        </Grow>

        <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                <Zoom in={grid_show}>
                  {/* <span className="badge badge-primary" style={gridStyle}>
                      <img src={module[exercise_name.exercise_name+"_content"].grid}/>
                  </span> */}

                  <div className="badge badge-primary" style={eval(key_for_css)}>
                      <img src={module[exercise_name.exercise_name+"_content"].grid} style={{maxWidth:"100%",display:"block",objectFit:"cover"}}/>
                  </div>
                </Zoom>
          </div>

          <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                <Zoom in={message_effect}><span className="badge badge-primary" style={MessageStyle}>{message_state?message_content.before_start:message_content[testState]}</span></Zoom>
        </div>

        <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
            }}>
                <Zoom in={show_posture}>
                    <div className="alert alert-warning" role="alert" style={GridMessageTimerStyle} >
                        <Pstyled bold="etc" size="1.5rem">
                            {wrong_posture}
                        </Pstyled>
                    </div>
                </Zoom>
            </div>

        <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-instruction">Default</button>
        <ModalInstruction set_modalTime={set_modalTime} set_ButtonClicked={set_ButtonClicked} />
            
        </div>
    );
}
export default Test