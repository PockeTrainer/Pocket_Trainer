import React from "react";
import { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { useDispatch } from "react-redux";
import { none_testState, testState } from "../../../modules/action";


const Timer = ({page}) => {
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(5);
    const [buttonState,setButtonState]=useState(1);
    const time = useRef(5);
    const count=useRef(1);
    const timerId = useRef(null);

    const navigate=useNavigate();
    const dispatch=useDispatch();
  
    const [whichTimer,setWhichTimer]=useState("pre-step");

    const start=()=>{
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current / 60));
            setSec(time.current % 60);
            time.current -= 1;
          }, 1000);
    };

    useEffect(() => {
      start();
      return () => clearInterval(timerId.current);
    }, []);
  
    useEffect(() => {
      // 만약 타임 아웃이 발생했을 경우
      if (time.current < 0) {
        console.log("타임 아웃");

        // if(func!=null){
        //     func(true);//상위컴포넌트의 set함수를 받아 상위 state변경->상위에게 나 운동측정시작되었음을 알림
        // }
        clearInterval(timerId.current);
        if(whichTimer==="pre-step"){//이전 step이 끝났음을 의미하니 본 스텝 운동타이머를 보여줌 
            dispatch(testState(page));//준비시간  타이머 끝남을 알림
            setWhichTimer("main-step");
            setMin(0);
            setSec(30);
            time.current=30;
            start();
        }
        else{
            setWhichTimer("finish-step");//타이머 다끝남을 의미 사실 이건 안쓰일듯...
            dispatch(none_testState(page));//타이머가 끝나면 끝남을 반영시킴
        }
      }
    }, [sec]);
  
    useEffect(()=>{
        if(count.current==1){//처음 들어왔을때에는 중지하기가 안눌렸는데 굳이 돌아갈 핑요가 없다
            return;
        }
        if(buttonState===0){
            if(timerId.current==null){
                return;
            }
            else{
                clearInterval(timerId.current);
                timerId.current=null
            }
        }
        else{
            start();
        }
    },[buttonState])

    const handleStop=()=>{
        setButtonState(1-buttonState);
        count.current=0;
    }

    const mainStepStyle={
        top:'5em',
        backgroundColor:"#fc7c5f26",
    }

    const useStyles=makeStyles({
        mainStepPadding:{
            padding:"0.5rem 0.5rem !important"
        }
    })
    const classes=useStyles();
        return (
        <div>
            <div className={"alert alert-warning "+classes.mainStepPadding} role="alert" style={mainStepStyle}>
                <span className="alert-icon"><i class="ni ni-time-alarm"></i></span>
                <span className="alert-text display-1">{whichTimer=="pre-step"?<strong>{sec}초</strong>:<strong>{min}분{sec}초</strong>}</span>

                <button onClick={handleStop} type="button" className="btn btn-primary btn-lg btn-block" style={{marginTop:'5px'}}>{buttonState==1?<span><i className="ni ni-button-pause"></i>중지하기</span>:<span><i className="ni ni-button-play"></i>시작하기</span>}</button>
            </div>

        </div>
        );
  };
export default Timer