import  React,{useState,useEffect,useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { useDispatch, useSelector } from 'react-redux';
import { First_clear_page } from '../../modules/action';


import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Slider from 'react-slick';

import { styled } from '@mui/system';

import HeightAndWeight from './HeightAndWeight';
import Goal from "./Goal"
import ActivationLevel from './ActivationLevel';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

function sleep(ms){
  return new Promise((r)=>setTimeout(r,ms));
}



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  let id=sessionStorage.getItem("user_id");//세션에서 아이디 가져오기
  const [open, setOpen] = useState(false);//열기용
  const slider=React.useRef("");//슬라이더를 가르킴
  const [showChecked, setShowChecked] = useState(false);//질문완료시 알림 transition

  const dispatch=useDispatch();
  const ref_v=useSelector(state=>state.Appref.ref);//맨 위에 App.js의 있는 모달버튼에 접근해서 가져옴
  const count=useRef(1);

  const [each_value_list,set_each_value_list]=useState({//각 문항들에서 가져오는 답변들
    height:100,
    weight:30,
    goal_answer:1,
    activation_level:2
  });

  const [what_im_looking,set_what_im_looking]=useState(0);//현재 보고 있는 페이지를 의미함
  const prev_what=useRef(0);//what_im_looking의 이전값을 갖고있어준다
  const initial_state=useRef("init");//맨처음 랜더링 될때를 의미 init:시작 next:다음버튼 눌렀을 때 prev:이전버튼 눌렀을 때

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {//해당 다이얼로그 닫아주기
    dispatch(First_clear_page());//닫기나 저장하기 버튼을 누르면 다음스텝으로 이동함을 알려준다
    setOpen(false);
    ref_v.current.click()//모달버튼 ref를 스토어에서 가져와 클릭 해줘서 다시 보여줌
  };



  const settings = {
    initialSlide:initial_state.current==="next"?what_im_looking-1:(initial_state.current==="prev"?what_im_looking+1:(initial_state.current==="end"?2:0)),
    arrows:false,
    dots:true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe:false
  };

  const StyledSlider=styled(Slider)`
    .slick-dots {
        bottom:-30px !important;
    }
   `
  const FabStyle={
    "&.MuiFab-root:hover":{backgroundColor:"#5e72e4"},
    backgroundColor:"#2dce89",
    position:"fixed",
    bottom:"1rem",
    left:"50%",
    transform:"translate(-50%,0)"
  }

  const finishAlertStyle={
    position:"absolute",
    color:"white",
    zIndex:"1",
    fontSize:"2rem",
    top:"5em",
    left:"0",
    right:"0",
    backgroundColor:"#5e72e4cc"
}

  const gotoNext=()=>{//다음페이지로 가는 버튼기능을 의미
    if(what_im_looking!==2){
      initial_state.current="next";
      prev_what.current=what_im_looking;//값의 변경전에 이전값을 복사해둠
      set_what_im_looking(prev=>prev+1);
    }
  }

  const gotoPrev=()=>{//이전페이지로 가는 버튼기능을 의미
    if(what_im_looking!==0){
        initial_state.current="prev";
        prev_what.current=what_im_looking;//값의 변경전에 이전값을 복사해둠
        set_what_im_looking(prev=>prev-1);
        
    }

  }

  const sendInfo=async () => {//api로 사용자한테 받은 입력값 보내주기
     await axios.post(`http://127.0.0.1:8000/api/user/userInfo/${id}`,{
      height:each_value_list.height,
      weight:each_value_list.weight,
      activation_level:each_value_list.activation_level,
      target_weight:each_value_list.goal_answer
     })
        .then(res => {
            console.log(res.data);
            
        })
        .catch((err)=>{
            console.log(err)
        })

      handleClose();//정보 보냈으니 창을 닫아주기
}
  useEffect(()=>{
    handleClickOpen();//다이얼로그 열어주기
    return ()=>setOpen(false);
  },[]);

  useEffect(()=>{
    if(count.current===1){
      return;
    }
    if(what_im_looking===1){
      initial_state.current="next";
      prev_what.current=what_im_looking;
      set_what_im_looking(prev=>prev+1);//each_value_list에 값이 업데이트가 생기면 다음 질문으로 이동
    }
    if(what_im_looking===2){
      ///완료보여주기
      initial_state.current="end";
      prev_what.current=what_im_looking;
      set_what_im_looking("end");//끝까지 질문에 대하여 답을 다했다는 뜻
    }
  },[each_value_list])

  useEffect(()=>{

    let tmp=initial_state.current==="next"?what_im_looking-1:(initial_state.current==="prev"?what_im_looking+1:0);//이니셜 인덱스값
    if(count.current===1){
      count.current+=1;
      return;
    }
    if(what_im_looking==="end"){
      console.log("끝");
      setShowChecked(true);//완료 alert 띄우기
      sleep(1500).then(()=>setShowChecked(false));//다시 닫아주기
    }

    else if(what_im_looking>prev_what.current){//다음슬라이드로 이동하는 버튼을 누른것을 의미
      console.log("다음슬라이드로");
      sleep(500).then(()=>slider.current.slickGoTo(tmp+1,false));//each_value_list에 값이 업데이트가 생기면 다음 질문으로 이동
    }
    else{//이전슬라이드로 이동하는 버튼을 누른것을 의미
      console.log("이전슬라이드로");
      sleep(1000).then(()=>slider.current.slickGoTo(tmp-1,false));//each_value_list에 값이 업데이트가 생기면 이전 질문으로 이동
    }
    

  },[what_im_looking])

  console.log(each_value_list);
  return (
    <div>
      
      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              신체정보기입
            </Typography>
            <Button  autoFocus sx={{fontSize:"0.975rem",fontFamily:"Noto Sans KR",fontWeight:"lighter"}} color="inherit" onClick={sendInfo}>
              저장하기
            </Button>
          </Toolbar>
        </AppBar>
        {/* 여기다가 신체,체중입력 */}

        <StyledSlider {...settings} ref={slider}>
          <HeightAndWeight value_list={each_value_list} update_func={set_each_value_list} />
          <Goal value_list={each_value_list} update_func={set_each_value_list}/>
          <ActivationLevel value_list={each_value_list} update_func={set_each_value_list}/>
          {/* 밑으로 각 질문들의 답을 담아줄 state와 setter를 내려줌 */}
        </StyledSlider>

          <Fab color="primary" aria-label="add" sx={FabStyle} onClick={what_im_looking===0?gotoNext:gotoPrev}>
            {
              what_im_looking===0
              ?
              <ArrowForwardIcon/>
              :
              <ArrowBackIcon/>
            }
          </Fab>

        <div style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              }}>

            <Slide  mountOnEnter unmountOnExit direction="up"  in={showChecked}>
                          <span className="badge badge-primary" style={finishAlertStyle}>
                              <CheckCircleIcon sx={{color:"white",fontSize:"1.5em"}}/>저장하기를<br></br>눌러주세요
                          </span>
            </Slide>
         </div>
        
        
      </Dialog>
    </div>
  );
}
