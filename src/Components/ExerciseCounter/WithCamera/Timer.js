import React from "react";
import { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { useDispatch,useSelector } from "react-redux";
import { none_testState, testState,increase_set,not_timeToModal,reset_count,plank_time_set} from "../../../modules/action";
import { Stack } from "@mui/material";

const setting={//해당 시간을 조절해줄것
    physical_test_ready:10,
    Press_and_3major:3,
    etc:90,
    shoulder_and_arm:40
}
// 각 운동부위마다 필요한 브레이크타임이나 테스트시 사용되는 준비시간이 다름

const Timer = ({exercise,where,buttonClicked,set_message_state}) => {//어떤 운동을 하는지,그리고 어디페이지 쪽에서 쓰는지
    const [min, setMin] = useState(parseInt(setting[where]/60));//parseInt를 하는 이유는 나눈 몫이 소수점까지 나옴
    const [sec, setSec] = useState(setting[where]%60);//각 부위별로 운동휴식시간 및 준비시간이 다름
    const [buttonState,setButtonState]=useState(1);
    const time = useRef(setting[where]);//각 부위별로 운동휴식시간 및 준비시간이 다름
    const count=useRef(1);
    const timerId = useRef(null);
    const _testState=useSelector(state=>state.testState_reducer.testState);

    const navigate=useNavigate();
    const howmanySet=useSelector(state=>state.change_set_reducer.current_set);//현재까지 진행된 세트 수를 가져와준다.
    const dispatch=useDispatch();
  
    const [whichTimer,setWhichTimer]=useState("pre-step");

    const badgeStyle={
        backgroundColor:"white"
    }

    const start=()=>{
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current / 60));
            setSec(time.current % 60);
            time.current -= 1;
          }, 1000);
    };

    useEffect(() => {
      if(buttonClicked){//버튼이 눌려여만 타이머가 돌아가기 시작함
          start();
      }
      return () => clearInterval(timerId.current);
    }, [buttonClicked]);
  
    useEffect(() => {
      // 만약 타임 아웃이 발생했을 경우
      console.log("sec:",sec," time.current:",time.current);
      if (time.current < 0) {
        console.log("타임 아웃");

        clearInterval(timerId.current);

        if(where==="physical_test_ready"){
            if(whichTimer==="pre-step"){//이전 step이 끝났음을 의미하니 본 스텝 운동타이머를 보여줌 
                dispatch(testState(exercise));//준비시간  타이머 끝남을 알림
                setWhichTimer("main-step");
                setMin(1);
                setSec(0);
                time.current=60;
                start();
            }
            else{
                setWhichTimer("finish-step");//타이머 다끝남을 의미 사실 이건 안쓰일듯...
                dispatch(none_testState(exercise));//타이머가 끝나면 끝남을 반영시킴
            }
        }
        else{
            if(howmanySet===5){//세트진행이 5번째 마지막까지 왔다면 더이상 업데이트해줄필요는 없다..
                return;
            }
            dispatch(increase_set());//운동 세트 수 증가 시켜주기
            dispatch(not_timeToModal());//휴식세트 창을 다시 닫아주면서 다시 state 변경
        }
       
      }
      else if(time.current===2&&where==="physical_test_ready"&&whichTimer==="pre-step"){//체력평가에서 준비까지3초남았을 때
        set_message_state(true);//준비까지 3초 남았음을 위로 알림
      }

      else if(time.current===0&&where!=="physical_test_ready"){
        // 여기에서 1초일 때 분기를 하는 이유는 미리 count를 0으로 1초전에 변경해주면 최대한 increase_set나 not_timeToModal에 의한 ui변경전에 모달을 닫을수잇다

        dispatch(reset_count());//다시 카운트된 개수를 리셋시켜줌
        dispatch(plank_time_set(true));//리셋된 플랭크 시간을 다시 5초로 설정해줌-이 5초는 큰의미가 없다
      }
    }, [sec]);
  
    useEffect(()=>{
        if(count.current==1){//처음 들어왔을때에는 중지하기가 안눌렸는데 굳이 돌아갈 핑요가 없다
            return;
        }
        if(buttonState===0){
            if(timerId.current==null){
                // 혹시나 start함수가 안돌아가있는 상태일때를 대비해서..사실 그럴일은 별로없을듯,,
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


    const useStyles=makeStyles({
        mainStepPadding:{
            padding:"0.5rem 5.1rem !important"
        }
    })
    const classes=useStyles();

    if(where==="physical_test_ready"){
        return (
            <div>
                <div className={"alert alert-success "+classes.mainStepPadding} role="alert" style={{marginTop:"0.3rem"}}>
                    <Stack direction={"column"}>
                        {
                            _testState==="preTimer"||_testState==="completed"||_testState==="false"
                            ?
                            <span className="badge badge-primary btn-lg" style={badgeStyle}>준비시간</span> 
                            :
                            <span className="badge badge-primary btn-lg" style={badgeStyle}>남은시간</span> 
                        }
                        
                        <span className="alert-text display-3">{time.current<60?<strong><i class="ni ni-time-alarm"></i>{time.current}초</strong>:<strong><i class="ni ni-time-alarm"></i>{min}분{sec}초</strong>}</span>
                    </Stack>
                    
    
                    {/* <button onClick={handleStop} type="button" className="btn btn-primary btn-lg btn-block" style={{marginTop:'5px'}}>{buttonState==1?<span><i className="ni ni-button-pause"></i>중지하기</span>:<span><i className="ni ni-button-play"></i>시작하기</span>}</button> */}
                </div>
    
            </div>
            );
    }

    else{
        return(
            <>
                 <div className={"alert alert-secondary "+classes.mainStepPadding} role="alert" >
                    <span className="alert-icon"><i class="ni ni-time-alarm"></i></span>
                    <span className="alert-text display-4">{time.current<60?<strong>{sec}초</strong>:<strong>{min}분{sec}초</strong>}</span>
    
                </div>
            </>
        );
    }
       
  };
export default Timer