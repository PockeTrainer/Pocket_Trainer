import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Camera from "./Camera";
import Timer from "./Timer";
import TitleMessage from "./TitleMessage";

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

import Zoom from '@mui/material/Zoom';

import { pre_timer  } from "../../../modules/action";



function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

function Test(){

    const testState=useSelector(state=>state.testState_reducer.testState);
    const dispatch=useDispatch();

    const exercise_name=useParams();//뒤에 파람스 가져올려고

    const count=useRef(1);


    const [loading, setLoading] = useState(false);//로딩바용
    const [success, setSuccess] = useState(false);//로딩성공시
    const timer = useRef();//로딩바용 


    const [checked, setChecked] = useState(false);

    const handleChange = () => {
    setChecked((prev) => !prev);
    };


    useEffect(()=>{
        if(count.current==1){
            count.current+=1;
            return;
        }
        if(testState==="true"){//시작을 띄워줘야 함 
            setTimeout(handleChange,1000)
        }
        if(success&&testState==="completed"){
            sleep(2000).then(()=>dispatch(pre_timer()));//Promise객체로 비동기지연-카메라 켜주는 상태로 전환 testState==preTimer
            handleChange();//준비 띄워주기
        }
        else if(testState==="completed"){//카메라가 준비 완료됨을 알게되면 로딩바를 끝냄 
            setSuccess(true);
            setLoading(false);
        }
    },[testState,success]);

    //위에거는 상태변화에 따른 로딩바 변화 및 다음 카메라측정으로 넘어가는 부분

    const pushup_content={
        title:"체력평가를\n시작합니다",
        message:"상체측정을 위한 푸시업을 곧 시작하겠습니다."
    };

    const situp_content={
        title:"체력평가를\n시작합니다",
        message:"복근측정을 위한 싯업을 곧 시작하겠습니다."
    };

    const squat_content={
        title:"체력평가를\n시작합니다",
        message:"하체측정을 위한 스쿼트를 곧 시작하겠습니다."
    };

    const entire={
        pushup:pushup_content,
        situp:situp_content,
        squat:squat_content
    };

    const counting_number={
        position:"relative",
        color:"white",
        float:"right",
        zIndex:"9999",
        fontSize:"2em",
        backgroundColor:"#5e72e4"
    }

    const message={
        position:"absolute",
        zIndex:"9999",
        fontSize:"3em",
        marginBottom:"2em",
        color:"white",
        backgroundColor:"#5e72e46b"
    }

    //위에는 스타일 객체 및 멘트

    let result=useSelector(state=>state.exercise_count_reducer);
    if(exercise_name.exercise_name==="pushup"){
        result=result.pushup
    }
    else if(exercise_name.exercise_name==="situp"){
        result=result.situp
    }
    else{
        result=result.squat
    }

    //위에거는 운동개수 측정용
    const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
        width:"80px",
        height:"80px"

      };
    
      useEffect(() => {
        handleButtonClick();//로딩바를 돌리기 위해서
        return () => {
          clearTimeout(timer.current);
        };
      }, []);

      const handleButtonClick = () => {//로딩바 돌리는 이벤트
        if (!loading) {
          setSuccess(false);
          setLoading(true);
        }
      };

      //위에거는 로딩용

      
    return(
        <div>
            <TitleMessage content={entire[exercise_name.exercise_name]} display={testState=="true"||testState=="preTimer"?"no":"yes"}/>
            {testState=="true"||testState=="preTimer"?
            <div style={{height:"18em"}}>
                <span className="badge badge-primary" style={counting_number}>{result}개</span>
            </div>
            :null
            }

            {testState=="preTimer"&&
            <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                <Zoom in={checked}><span className="badge badge-primary" style={message}>준비!</span></Zoom>
            </div>
            }


            {testState=="true"&&
                        <div style={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                        }}>
                            <Zoom in={checked}><span className="badge badge-primary" style={message}>시작!</span></Zoom>
                        </div>
            }

            <Camera  display={testState=="true"||testState=="preTimer"?"yes":"no"}/>

            {/* 로딩바 */}
            {
            testState=="false"||testState=="completed" ? <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"center" }}>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Fab
                aria-label="save"
                color="warning"
                sx={buttonSx}
                onClick={handleButtonClick}
              >
                {success ? <CheckIcon sx={{"&.MuiSvgIcon-root":{fontSize:"2.5rem"}}} /> : <HourglassBottomIcon sx={{"&.MuiSvgIcon-root":{fontSize:"2.5rem"}}}/>}
              </Fab>
              {loading && (
                <CircularProgress
                  size={90}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              )}
            </Box>
          </Box>:null}

            {testState=="true"||testState=="preTimer"?<Timer where="physical_test_ready" exercise={exercise_name.exercise_name}/>:null}
            
        </div>
    );
}
export default Test