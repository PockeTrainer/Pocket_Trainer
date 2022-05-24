import React,{useRef,useState} from "react";
import Slider from "react-slick";
import RunCircleRoundedIcon from '@mui/icons-material/RunCircleRounded';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ParaglidingIcon from '@mui/icons-material/Paragliding';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import FullScreenDialog from "./FullScreenDialog";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gotoweight,not_exercise_start } from "../../modules/action";


function AlertMessage({sliderRef}){
    const user_name=sessionStorage.getItem("user_name");//현재 로그인 되어있는 유저의 이름값을 가져와준다
    return(
        <div>
            <div className="modal-body">
                    <div className="py-3 text-center">
                        <i className="ni ni-bell-55 ni-3x" />
                        <h4 className="heading mt-4">안녕하세요 {user_name}님!</h4>
                        <p>저희 포켓트레이너에 오신 것을 환영합니다!저희 서비스를 이용받기 위해서는 사전절차가 좀 더 필요합니다!</p>
                        <hr></hr>
                        <p>지금 안내를 받아보시겠습니까?</p>
                    </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary " onClick={()=>sliderRef.current.slickNext()}>네 좋아요!</button>
                <button type="button" className="btn btn-primary ml-auto" data-dismiss="modal">다음에 할래요!</button>
            </div>
        </div>
    );
}

function PtStep({buttonRef,page,which}){
    const steps = [
        '현재 신체 상태와 목표체중 기입',
        '루틴추천을 위한 부위별 체력측정',
        '추천루틴으로 피티받기',
      ];

    const icons={
        start_step:<RunCircleRoundedIcon sx={{fontSize:"4em"}}/>,
        first_clear_step:<FitnessCenterIcon sx={{fontSize:"4em"}}/>,
        second_clear_step:<ParaglidingIcon sx={{fontSize:"4em"}}/>,
        last_clear_step:<AssignmentTurnedInIcon sx={{fontSize:"4em"}} />
    }
    let alertMessage;
    let button_name;

    const dispatch=useDispatch();
    const navigate=useNavigate();
    let active_step=0;
    if(page=="first_clear_step"){
        active_step=1;
        alertMessage="수고하셨습니다!이제는 체력측정을 받으러 가보러 갈까요?";
        button_name="체력측정받기";
    }
    else if(page=="second_clear_step"){
        active_step=2;
        alertMessage="체력측정 하니라 수고하셨습니다!최종결과를 확인하고 루틴을 추천받으러 갈까요?";
        button_name="최종결과확인";
    }
    else if(page==="last_clear_step"){
        active_step=3;
        alertMessage="이제 오늘의 루틴을 확인해볼까요?";
        button_name="오늘의루틴보기"
    }
    else{
        active_step=0;
        alertMessage="피티 전 준비단계는 이와 같습니다!";
        button_name="신체정보기입하기"
    }

    const handleClose=()=>{//해당 모달창을 닫게해야 다음 뜨는 신체입력창에 스택오버플로우가 안남
        setTimeout(close,500);
        dispatch(gotoweight());//체중체크페이지로 이동할 것을 알려줌
    }
    const moveToCheck=()=>{//체력측정페이지로 이동
        setTimeout(close,500);
        navigate("/main/exercise_counter");
    }
    const moveToFinalResult=()=>{
        setTimeout(close,500);
        navigate("/test/finalResult");
        
    }
    const moveToEnd=()=>{
        setTimeout(close,500);
        dispatch(not_exercise_start());//이제 나갈거니까 운동모드에서 나감을 의미
        if(which==="end"){//그냥 종료하는 것으로 메인페이지로
            navigate("/");
        }
        else{//루틴추천페이지로 이동
            navigate("/main/routine");
        }

    }
    const close=()=>{
        buttonRef.current.click();
    }

    const func={
        start_step:handleClose,
        first_clear_step:moveToCheck,
        second_clear_step:moveToFinalResult,
        last_clear_step:moveToEnd
    }
    return(
        <div>
            <div className="modal-body">
                    <div className="py-3 text-center">
                        {icons[page]}
                        <h4 className="heading mt-4">{alertMessage}</h4>
                    </div>
                    <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={active_step} alternativeLabel>
                                {steps.map((label) => (
                                <Step key={label}>
                                        <StepLabel sx={{".MuiStepLabel-label.Mui-active":{color:"#ffc107"},".MuiStepLabel-labelContainer":{color:"white"},".MuiStepLabel-label.Mui-completed":{color:"#2dce89"}}} StepIconProps={{sx:{"&.MuiStepIcon-root":{color:"#8898aa"},"&.Mui-active":{color:"orange"},"&.Mui-completed":{color:"#2dce89"}}}}>{label}</StepLabel>
                                </Step>
                                ))}
                            </Stepper>
                    </Box>
            </div>
            <div className="modal-footer">
                <button onClick={func[page]} type="button" className="btn btn-primary btn-lg btn-block" style={{marginTop:"3em"}} ><i className="ni ni-button-play"></i>{button_name}</button>
            </div>
            
        </div>
    );
}



function StartModal({buttonRef}){

    const closeRef=useRef();//닫는 버튼용 
    const slider=useRef();//슬라이더용


    const page_info=useSelector(state=>state.pageMove);//스토어를 통해 현재페이지 정보를 가져와줌
    const {page,which}=page_info;

    const settings = {
        arrows:false,
        dots: true,
        infinite:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe:false
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

                <Slider {...settings} ref={slider}>
                    <AlertMessage sliderRef={slider}/>
                    <PtStep buttonRef={closeRef} page={page} which={which}/>
                    {page=="weight_page"&&<FullScreenDialog/>}
                </Slider>
                

            </div>
        </div>
    </div>
    );

}
export default StartModal