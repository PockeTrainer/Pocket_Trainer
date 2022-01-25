import React,{useRef,useState} from "react";
import Slider from "react-slick";
import RunCircleRoundedIcon from '@mui/icons-material/RunCircleRounded';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { color } from "@mui/system";
import FullScreenDialog from "./FullScreenDialog";


function AlertMessage(){
    return(
        <div>
            <div className="modal-body">
                    <div className="py-3 text-center">
                        <i className="ni ni-bell-55 ni-3x" />
                        <h4 className="heading mt-4">안녕하세요 티맥스님!</h4>
                        <p>저희 포켓트레이너에 오신 것을 환영합니다!저희 서비스를 이용받기 위해서는 사전절차가 좀 더 필요합니다!</p>
                        <hr></hr>
                        <p>지금 상담을 받아보시겠습니까?</p>
                    </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary ">네 좋아요!</button>
                <button type="button" className="btn btn-primary ml-auto" data-dismiss="modal">다음에 할래요!</button>
            </div>
        </div>
    );
}

function PtStep({buttonRef,handleCloseState}){
    const steps = [
        '현재 신체 상태와 목표체중 기입',
        '루틴추천을 위한 부위별 체력측정',
        '추천루틴으로 피티받기',
      ];


    const handleClose=()=>{//해당 모달창을 닫게해야 다음 뜨는 신체입력창에 스택오버플로우가 안남
        setTimeout(close,500);
        handleCloseState();
    }
    const close=()=>{
        buttonRef.current.click();
    }
    return(
        <div>
            <div className="modal-body">
                    <div className="py-3 text-center">
                        <RunCircleRoundedIcon sx={{fontSize:"4em"}}/>
                        <h4 className="heading mt-4">피티 전 준비단계는 이와 같습니다!</h4>
                    </div>
                    <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={0} alternativeLabel>
                                {steps.map((label) => (
                                <Step key={label}>
                                        <StepLabel sx={{".MuiStepLabel-label.Mui-active":{color:"#ffc107"},".MuiStepLabel-labelContainer":{color:"white"}}} StepIconProps={{sx:{"&.MuiStepIcon-root":{color:"#8898aa"},"&.Mui-active":{color:"orange"},"&.Mui-completed":{color:"#2dce89"}}}}>{label}</StepLabel>
                                </Step>
                                ))}
                            </Stepper>
                    </Box>
            </div>
            <div className="modal-footer">
                <button onClick={handleClose} type="button" className="btn btn-primary btn-lg btn-block" style={{marginTop:"3em"}} >신체정보기입하기</button>
            </div>
            
        </div>
    );
}

function StartModal(){

    const closeRef=useRef();//닫는 버튼용 

    const [closeState,setCloseState]=useState(false);
    const handleCloseState=()=>{
        setCloseState(true);
    };
    const settings = {
        arrows:false,
        dots: true,
        infinite:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return(

    <div className="modal fade" id="modal-notification" tabIndex={-1} role="dialog" aria-labelledby="modal-notification" aria-hidden="true">
        <div className="modal-dialog modal-danger modal-dialog-centered modal-" role="document">
            <div className="modal-content bg-gradient-primary">
                <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">포켓트레이너-알리미</h6>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={closeRef}>
                    <span aria-hidden="true">×</span>
                </button>
                </div>

                <Slider {...settings}>
                    <AlertMessage/>
                    <PtStep buttonRef={closeRef} handleCloseState={handleCloseState}/>
                    {closeState&&<FullScreenDialog/>}
                </Slider>
                

            </div>
        </div>
    </div>
    );

}
export default StartModal