import React,{useState,useRef,useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";


import { useDispatch, useSelector } from "react-redux";
import { change_clicked_button_reducer } from "../../modules/action";
import { change_clicked_button } from "../../modules/action";
import ScrollTriggerButton from "../SameLayout/ScrollTriggerButton";

import PartStepper from "../CameraTodayRoutine/PartStepper";
import KeepGoingModal from "./KeepGoingModal";
import { Grow } from "@mui/material";


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

function TodaySummary(){

    const [checked, setChecked] = useState(false);//transition

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const clickedButton=useSelector(state=>state.change_clicked_button_reducer.clickedButton);
    const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const{bodypart,part1,part2,part3,fail_list}=routine_info;//부위정보 담아주기
    const modalRef=useRef();//이어서 진행하기 알림창
    const dispatch=useDispatch();
    const handleClick=(select)=>{
        dispatch(change_clicked_button(select))
      }
    const avatarStyle={
        "&.MuiAvatar-root":{
            margin:"auto",
            width: "60px",
            height:"60px",
            backgroundColor:"#5e72e4",
            fontFamily:"Nanum Gothic",
            fontWeight:"bold"

        }
    }

    const AvatarStyle=styled(Avatar)((props)=>({
        margin:"auto",
        width: "4rem",
        height:"4rem",
        backgroundColor:props.color,
        fontFamily:"Nanum Gothic",
        fontWeight:"bold",
        fontSize:"1.55rem"
      }));

      
    const popoverStyle={
        "&.MuiButton-root":{
            display:"flex",
            margin:"auto",
            boxShadow:"0",
            backgroundColor:"rgb(50 50 93 / 0%) "
        }
    }

    const SpanStyle={
        backgroundColor:"#f7fafc",
        borderColor:"#2dce89",
        color:"white",
        padding:"0.5rem 0.5rem",
        fontSize:"1.375rem",
        marginTop:"0.9em"
    }

    const ProgressSpanStyle={
        fontSize:"1.0em",
        color:"white",
        marginTop:"1em",
        backgroundColor:"#2dce89"
    }

    const openKeepGoingModal=()=>{//이어서 진행하기 모달창
        modalRef.current.click();
    };

    useEffect(()=>{
        sleep(1000).then(()=>handleChange());
        if(fail_list.length>0){//만약에 남은 운동들이 존재한다면
            setTimeout(openKeepGoingModal,1000);
        }
    },[])
    
    
    return(
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout: 1000 } : {})}>

      
        <div className="card bg-secondary shadow mb-3" data-component="AccountInformationCard" style={{marginTop:"1.0rem"}}>
      
        <div className="card-body" style={{padding:"1rem"}}>
            <i className="far fa-clipboard" style={{fontSize:"3.5em",color:"#5e72e4"}}></i>
            <h2 className="text-gray-dark display-4" >오늘의부위</h2>
            <hr></hr>

            

            <Button variant="contained" onClick={()=>handleClick("button1")}
            sx={
                popoverStyle
            }>
                <AvatarStyle color="#5e72e4">{bodypart[0]}</AvatarStyle>
            </Button>
            

            <span className="badge badge-primary btn-lg" style={{fontWeight:"lighter"}}>{part1.length}종목</span>
            
            <Stack direction="row" spacing={2}>
                <Button  variant="contained"  onClick={()=>handleClick("button2")}
                sx={
                    popoverStyle
                }>
                    <AvatarStyle color="#2dce89">{bodypart[1]}</AvatarStyle>
                </Button>
               
                <Button  variant="contained" onClick={()=>handleClick("button3")}
                sx={
                    popoverStyle
                }>
                    <AvatarStyle color="#ffc107">{bodypart[2]}</AvatarStyle>
                </Button>
               
                
            </Stack>
            <Stack direction="row" spacing={2}>
                <span className="badge badge-primary btn-lg" style={{margin:"auto",fontWeight:"lighter"}}>{part2.length}종목</span> 
                <span className="badge badge-primary btn-lg" style={{margin:"auto",fontWeight:"lighter"}}>{part3.length}종목</span> 
            </Stack>
          <p className='card-text' style={{marginTop:"30px",marginBottom:"0px"}}>마지막 해당루틴날짜:2022/01/18</p>
        {/* 여기다가 진행수준 삽입 */}
                <span className="badge badge-secondary" style={ProgressSpanStyle}>진행정도</span>
                <div className="alert alert-warning" role="alert" style={SpanStyle} >
                    <Stack direction="column">
                        {
                            bodypart[0]==="어깨"
                            ?
                            <>
                            <PartStepper where="part1"/>
                            <PartStepper where="part2"/>
                            <PartStepper where="part3"/>
                            </>
                            :
                            <>
                            <PartStepper where="part1"/>
                            <PartStepper where="part2_3"/>
                            </>
                        }
                    </Stack>
                </div>
        </div>

        <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-keep-going-alert">Default</button>
        <KeepGoingModal/>
        <SwipeableEdgeDrawer select_button={clickedButton} />

        <ScrollTriggerButton content={fail_list.length>0?"이어하기":"운동준비"} css_bottom={'3em'}/>
       
    </div>
    </Grow>
    );

}
export default TodaySummary;