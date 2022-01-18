import React from "react";
import { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Timer = ({func}) => {
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(5);
    const [buttonState,setButtonState]=useState(1);
    const time = useRef(5);
    const count=useRef(1);
    const timerId = useRef(null);

    const navigate=useNavigate();
  
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

        if(func!=null){
            func(true);//상위컴포넌트의 set함수를 받아 상위 state변경->상위에게 나 운동측정시작되었음을 알림
        }
        clearInterval(timerId.current);
        if(whichTimer==="pre-step"){//이전 step이 끝났음을 의미하니 본 스텝 운동타이머를 보여줌 
            setWhichTimer("main-step");
            setMin(1);
            setSec(0);
            time.current=60;
            start();
        }
        else{
            setWhichTimer("finish-step");//타이머 다끝남을 의미 사실 이건 안쓰일듯...
            func(false);// 타이머가 끝났으니 다시 상위컴포넌트로 끝났음을 알림
        }
        // dispatch event
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
        top:'3em',
        backgroundColor:"#fc7c5f26",
    }
        return (
        <div>
            <div class="alert alert-warning" role="alert" style={whichTimer=="main-step"?mainStepStyle:null}>
                <span class="alert-icon"><i class="ni ni-time-alarm"></i></span>
                <span class="alert-text display-1">{whichTimer=="pre-step"?<strong>{sec}초</strong>:<strong>{min}분{sec}초</strong>}</span>

                <button onClick={handleStop} type="button" className="btn btn-primary btn-lg btn-block" style={{marginTop:'5px'}}>{buttonState==1?<span><i className="ni ni-button-pause"></i>중지하기</span>:<span><i className="ni ni-button-play"></i>시작하기</span>}</button>
            </div>

        </div>
        );
  };
export default Timer