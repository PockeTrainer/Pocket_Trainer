import React from "react";
import Box from '@mui/material/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import { useNavigate } from "react-router-dom";


function ScrollButton(props) {
    const { children,content,window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 50,
    });
  
    const navigate=useNavigate();
    const handleClick = (event) => {
      if(content==="평가준비"){
        navigate("/test/caution");//테스트평가사항페이지로 이동
      }
      else if(content=="운동준비"){
        navigate("/routine/caution");
      }
      else if(content=="벤치시작"){
          //여기 navigate채워주기
      }
    };
  
    return (
        <Zoom in={trigger}>
          <Box
            onClick={handleClick}
            role="presentation"
            sx={{ position: 'fixed', bottom: "4em", right: "7.5em" }}
          >
            {children}
          </Box>
        </Zoom>
      );
    }

function ScrollTriggerButton({content}){
    const ScrollStyle={
        padding:"0.475rem 0.7rem",
        borderRadius:"1.4375rem",
        boxShadow:"0 15px 6px #21252975, 0 5px 3px #5e72e4"
    }
    return(
        <>
        <ScrollButton content={content}>
            <button type="button"
             className="btn btn-primary btn-lg btn-block"
             style={ScrollStyle}><h2 style={{fontWeight:"600"}}><i className="ni ni-button-play"></i>{content}</h2></button>
      </ScrollButton>
      </>
    );
}
export default ScrollTriggerButton