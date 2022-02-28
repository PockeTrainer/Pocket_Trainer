import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import { useNavigate } from "react-router-dom";


function ScrollButton(props) {
    const { children,content,window,grade,changeModalTime } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    // 스크롤로 나타내고 모 없애고 싶을때 쓰삼
    // const trigger = useScrollTrigger({
    //   target: window ? window() : undefined,
    //   disableHysteresis: true,
    //   threshold: 50,
    // });

    const[check,setCheck]=useState(false);//이걸로 버튼 짜잔 할거임

    const handleChange=()=>{
      setCheck((prev)=>!prev);
    }

    useEffect(()=>{
      setTimeout(handleChange,3000)
    },[])
  
    const navigate=useNavigate();
    const handleClick = (event) => {
      if(content==="평가준비"){
        navigate("/test/caution");//테스트평가사항페이지로 이동
      }
      else if(content=="운동준비"){
        navigate("/routine/caution");
      }
      else if(content=="벤치시작"){
          navigate("/routine/weightcheck/BenchPress");
      }
      else if(content=="연습세트"){
          navigate("/routine/weightcheck/practice/BenchPress");
      }
      else if(content=="다음운동"){
        if(grade===null){
          changeModalTime(true);//위에서 받아온 점수항목이면 다시 평가를 하도록 모달창 띄워져야함
        }
        else{
          navigate("/routine/weightcheck/BenchPress");
        }
       
      }
    };
  
    return (
        <Zoom in={check}>
          <Box
            onClick={handleClick}
            role="presentation"
            sx={{ position: 'fixed', bottom: "1em", right: "7.5em" }}
          >
            {children}
          </Box>
        </Zoom>
      );
    }

function ScrollTriggerButton({content,grade,changeModalTime}){
    const ScrollStyle={
        padding:"0.475rem 0.7rem",
        borderRadius:"1.4375rem",
        boxShadow:"0 15px 6px #21252975, 0 5px 3px #5e72e4"
    }
    return(
        <>
        <ScrollButton content={content} grade={grade} changeModalTime={changeModalTime}>
            <button type="button"
             className="btn btn-primary btn-lg btn-block"
             style={ScrollStyle}><h2 style={{fontWeight:"600"}}><i className="ni ni-button-play"></i>{content}</h2></button>
      </ScrollButton>
      </>
    );
}
export default ScrollTriggerButton