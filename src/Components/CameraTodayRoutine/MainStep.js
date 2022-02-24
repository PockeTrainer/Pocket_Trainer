import React,{useEffect,useState,useRef} from "react";
import Camera from "../ExerciseCounter/WithCamera/Camera";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from '@mui/material/Skeleton';
import Grow from '@mui/material/Grow';
import Zoom from '@mui/material/Zoom';
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom";

import AlertModal from "../SameLayout/AlertModal";
import {timeToModal} from "../../modules/action"

function MainStep(){
    const testState=useSelector(state=>state.testState_reducer.testState);//카메라가 성공적으로 불러와졌는지 여부
    const count=useRef(1);//카운트용
    const timeId=useRef();//운동시간용
    const modalRef=useRef()//브레이크타임 모달창

    const [checked, setChecked] = useState(false);//전체 카메라화면 transition
    const [message,setMessage]=useState(false);//화면에 띄우는 메시지 transition
    
    

    const exercise_name=useParams();//url에서 운동명 가져오기

    const dispatch=useDispatch();

    const current_weight=useSelector(state=>state.change_current_weight_reducer.current_weight);//연습스텝에서 설정한 무게를 보여준다
    const count_result=useSelector(state=>state.exercise_count_reducer.pushup);//여기는 나중에 각 운동에 대한 모델에 의존한 개수 결과를 보여줘야한다..지금은 푸시업으로 예시
    const howmanySet=useSelector(state=>state.change_set_reducer.current_set)//진행세트 수
    const modalTime=useSelector(state=>state.change_timeToModal_reducer.modalTime)//모딜창을 열지 말지..

    const[sec,setSec]=useState(0);//스탑워치 만들려고..
    const[min,setMin]=useState(0);
    const time=useRef(0);

    //위에는 각종 상수및 state



    //메시지 띄워주는 용도
    const handleMessageChange=()=>{
        setMessage((prev)=>!prev);
    }

    const handleChange = () => {
        setChecked((prev) => !prev);
    };
  
    const openModal=()=>{
        modalRef.current.click()
    }

    const start=()=>{
        timeId.current=setInterval(()=>{
            setMin(parseInt(time.current/60));
            setSec(time.current%60);
            time.current+=1;
        }
        ,1000)
    }
    useEffect(()=>{
        if(count.current===1){
            count.current+=1;
            handleChange();// 전체화면트랜지션
            
            start();//스탑워치 시작
        }

        if(count_result===1){//여기는 임시로 지금 개수를 1개 일 때 모달창 띄우게함
            dispatch(timeToModal())//모달창을 이제 쓰겠다 그러니 타이머를 돌려라 이런뜻..
            return;
        }

        if(count_result===0){
            setTimeout(handleMessageChange,1000);
            // 처음에는 문자보여주고 두번째 랜더링시 문자다시 숨기기
        }
    },[testState,count_result])

    useEffect(()=>{
        if(count.current==1){
            return;
        }
        if(modalTime){
            setTimeout(openModal,1000);//모달창 열어주기 
        }
    },[modalTime])
  

    const subtitle={
        position:"absolute",
        color:"#5e72e4",
        zIndex:"1",
        fontSize:"2em",
        top:"5em",
        backgroundColor:"#f7fafc",
        lineHeight:"1.5em"
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

    const ShowWeight={
        position:"absolute",
        color:"#2dce89",
        zIndex:"1",
        fontSize:"2em",
        top:"0",
        left:"0",
        lineHeight:"1.5em"
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
    //Transition용

    const skeleton={
        width:"100%",
        height:"80vh",
        "&.MuiSkeleton-root::after":{background: "linear-gradient(90deg, transparent, #5e72e4, transparent)"},
        visibility:testState==="completed"?"hidden":"visible"
    }

    const content={
        false:"불러오는중..",
        completed:"준비완료!",
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
                   <span className="badge" style={MainStep}>{howmanySet}세트중</span>
               </div>

               <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                   <span className="badge badge-primary" style={ShowCount}>{count_result}개</span>
               </div>

               <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                   <span className="badge badge-primary" style={ShowWeight}>{current_weight}kg</span>
               </div>
               
            </div>
        </Grow>


        
        {/* 스탑워치정보부분 */}
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}>
                <div style={{position:"relative"}}>
                    <div className="alert alert-warning" role="alert" style={SpanStyle} >
                        <Stack direction="column">
                            <span className="badge badge-primary btn-lg" style={badgeStyle}>운동시간</span> 
                            <span className="alert-text" >{time.current>=60?<strong>{min}분{sec}초</strong>:<strong>{sec}초</strong>}</span>
                        </Stack>
                    </div>
                </div>
        </Grow>

        <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                <Zoom in={message}><span className="badge badge-primary" style={subtitle}>{content[testState]}</span></Zoom>
        </div>
            
       
        <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-default">Default</button>
        <AlertModal where="breakTime"  />

        </div>
        </>
    );
}
export default MainStep