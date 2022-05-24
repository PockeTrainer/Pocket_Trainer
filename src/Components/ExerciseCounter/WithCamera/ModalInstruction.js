import React,{useState,useRef,useEffect} from "react";
import ReactPlayer from 'react-player/youtube'

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Grow,Collapse } from "@mui/material";

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { pre_timer  } from "../../../modules/action";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Stack } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';

import { styled } from "@mui/system";
import Slider from "react-slick";

function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  const Pstyled=styled('p')((props)=>({
    fontSize:props.size==="1.0"?"1.0rem":"1.5rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0",
    textAlign:"center",
    color:props.color?props.color:"black"
}));

const GoodPostureAndBadPosture=({good_or_bad})=>{//각각의 잘된 자세와 못된 자세를 보여준다


   const exercise_name=useParams();//운동명을 불러온다
   const module=require("../../../ExercisesInfo/ExerciseInfo.js");
   const [showVideo,set_showVideo]=useState(false);//비디오 버튼을 통한 보여주기
   let call_content;//모듈에서 부를 내용
   let call_exercise;//부를 운동이름

   const handleShowVideo=()=>{
       set_showVideo(prev=>!prev);
   }

   const IconButtonStyle={
    "&.MuiIconButton-root":{
        padding:"0px",
        backgroundColor:"transparent",
        fontSize:"1em"
    },
    "&.MuiIconButton-root:hover":{
        backgroundColor:"transparent"
    }

};

   if(exercise_name.exercise_name==="pushup"){
        call_content="pushup_content";
        call_exercise="Pushup";
   }
   else if(exercise_name.exercise_name==="situp"){
        call_content="situp_content";
        call_exercise="Situp";
   }
   else{//스쿼트일때
        call_content="squat_content";
        call_exercise="Squat";
   }


    return(
        <>
            <Stack direction="row" sx={{justifyContent:"space-between",alignItems:"flex-start"}}>
                <IconButton sx={{...IconButtonStyle,float:"left",marginLeft:"1rem"}} onClick={handleShowVideo}>
                        <Avatar sx={{width:"2rem",height:"2rem",backgroundColor:"#2dce89"}}>
                            <YouTubeIcon/>
                        </Avatar>
                                
                    </IconButton>
                {
                    good_or_bad
                    ?
                        <span className="badge badge-success" style={{fontSize:"1em",marginBottom:"1rem"}}>올바른 자세</span>
                    :
                        <span className="badge badge-danger" style={{fontSize:"1em",marginBottom:"1rem"}}>잘못된 자세</span>

                }


                
                <IconButton sx={{...IconButtonStyle,visibility:"hidden",marginRight:"1rem"}} onClick={handleShowVideo}>
                    <Avatar sx={{width:"2rem",height:"2rem",backgroundColor:"#2dce89"}}>
                        <YouTubeIcon/>
                    </Avatar>
                                
                </IconButton>
            </Stack>
           
              
          
          <ImageListItem key={module[call_exercise].name} >
            <img
             {...srcset(good_or_bad?module[call_content].correct_posture_pic:module[call_content].wrong_posture_pic, 250, 200, 2,2)}
              alt={module[call_exercise].name}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  ".MuiImageListItemBar-title":{
                      fontWeight:"600",
                      textAlign:"left"
                  }
              }}
              title={module[call_exercise].name}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={"의미없음"}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
          <div className="alert alert-secondary" role="alert" style={{marginBottom:"0em",padding:"0.5rem 0.5rem"}}>
        
              <Pstyled bold="lighter" size="1.0">
                  {
                      good_or_bad
                      ?
                        <>
                         <ArrowForwardIosIcon sx={{color:"#5e72e4"}} />{module[call_content].correct_posture} 
                        </>
                      
                      :
                        <>
                            <ArrowForwardIosIcon sx={{color:"#5e72e4"}} />{module[call_content].wrong_posture} 
                        </>
                  }
                  
              </Pstyled>

              <Collapse in={showVideo}>
                  <div>
                  <ReactPlayer url={module[call_content].youtube_url} width='100%' 
                        height='20em'        // 플레이어 크기 (세로)         
                        controls={false}       // 플레이어 컨트롤 노출 여부
                        light={false}         // 플레이어 모드
                        pip={true}            // pip 모드 설정 여부  
                        />
                  </div>
              </Collapse>
          </div>

         

    
        </>
    );
}



export default function ModalInstruction({set_modalTime,set_ButtonClicked}){//체력측정시 평가 전 기본 안내사항을 알려줌

    const closeRef=useRef();//모달창 닫는 버튼용도
    const dispatch=useDispatch();
    const exercise_name=useParams();//운동명을 불러온다

    const sliderRef=useRef();//슬라이더를 가리킴
    const count=useRef(1);
    const [loading, setLoading] = useState(false);//로딩바용
    const [success, setSuccess] = useState(false);//로딩성공시
    const [checked, setChecked] = useState(false);//화면 transition
    const [page_move,set_page_move]=useState(0);//0이면 로딩 돌아가는 거,1이면 사용설명서 랜더링
    const testState=useSelector(state=>state.testState_reducer.testState);//카메라 준비상태를 의미 false->completed->pre_timer->true
    const [exercise_kor_name,set_exercise_kor_name]=useState("");//한국어 운동명
    const yes_button_count=useRef(0);//알겠습니다 버튼 누른 횟수-2번이면 모달창 닫고 그리드 설명


    const handleButtonClick = () => {//로딩바 돌리는 이벤트
        if (!loading) {
          setSuccess(false);
          setLoading(true);
        }
    };

    const handleChange = () => {//transition 
        setChecked((prev) => !prev);
    };

    const gotoNext=()=>{
        if(yes_button_count.current===1){//즉 두번째 상황에서 누르는 버튼순간
            closeRef.current.click();//모달창 닫기
            yes_button_count.current=0;//혹시나 모른 초기화
            set_modalTime(false);//부모에게 다시 닫음을 알림
            set_ButtonClicked(true);//모달 버튼 클릭
            return;
        }
        sliderRef.current.slickNext();
        yes_button_count.current+=1;
    }

    const pushup_content={
        message:"상체측정을 위한 푸시업을 곧 시작하겠습니다"
    };

    const situp_content={
        message:"복근측정을 위한 싯업을 곧 시작하겠습니다"
    };

    const squat_content={
        message:"하체측정을 위한 스쿼트를 곧 시작하겠습니다"
    };

    const entire={
        pushup:pushup_content,
        situp:situp_content,
        squat:squat_content
    };


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
        handleChange();
        handleButtonClick();//로딩바를 돌리기 위해서
        if(exercise_name.exercise_name==="pushup"){
            set_exercise_kor_name("푸시업");
        }
        else if(exercise_name.exercise_name==="situp"){
            set_exercise_kor_name("싯업");
        }
        else{
            set_exercise_kor_name("스쿼트");
        }
        
    }, []);

    useEffect(()=>{
        if(count.current==1){
            count.current+=1;
            return;
        }
        if(testState==="true"){//시작을 띄워줘야 함 
           console.log("카메라측정중");
        }
        if(success&&testState==="completed"){
            sleep(2000).then(()=>dispatch(pre_timer())).then(()=>set_page_move(1));//Promise객체로 비동기지연-카메라 켜주는 상태로 전환 testState==preTimer
        }
        else if(testState==="completed"){//카메라가 준비 완료됨을 알게되면 로딩바를 끝냄 
            setSuccess(true);
            setLoading(false);
        }
    },[testState,success]);

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
        <div className="modal fade" id="modal-instruction" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
            <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                        <button ref={closeRef}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{padding:"1rem"}}>

                        {
                            page_move===0
                            &&
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 1000 } : {})}>
                                <div>

                                    <span className="badge badge-primary" style={{fontSize:"1em",marginTop:"2rem",marginBottom:"1rem"}}>{exercise_kor_name}</span>

                                    <Pstyled bold="etc">
                                        {entire[exercise_name.exercise_name].message}
                                    </Pstyled>
                    

                    
                                        
                                    <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"center" }}>
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
                                        </Box>
                                                
                                    
                                </div>
                            </Grow>
                        }
                        {
                            page_move===1
                            &&
                            <>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 1000 } : {})}>
                                    <div>
                                        <Slider {...settings} ref={sliderRef}>
                                            {/* 잘못된 자세 */}
                                            <GoodPostureAndBadPosture good_or_bad={false}/>
                                            {/* 잘된 자세 */}
                                            <GoodPostureAndBadPosture good_or_bad={true}/>
                                        </Slider>
                                    </div>
                                </Grow>
                            
                            </>    

                        }

                            
                    </div>
                    
                    <div className="modal-footer" style={{justifyContent:"center"}}>
                        {
                            testState==="false"
                            &&
                            <Pstyled bold="bold" size={"1.0"}>
                                <RestartAltIcon/>카메라를 불러오는 중입니다..
                            </Pstyled>
                        }
                        {
                            testState==="completed"
                            &&
                            <Pstyled bold="bold" size={"1.0"} color={"#2dce89"}>
                                <LinkedCameraIcon/>불러오기 완료!..
                            </Pstyled>
                        }
                        {
                            testState==="preTimer"
                            &&
                            <button onClick={gotoNext} type="button" className="btn btn-primary btn-lg btn-block" ><i className="ni ni-button-play"></i>알았습니다!</button>
                        }
                        
                    </div>
                </div>
            </div>
    </div>
    );
}