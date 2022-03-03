import React,{useState} from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";


import NavigationIcon from '@mui/icons-material/Navigation';
import { useDispatch, useSelector } from "react-redux";
import { change_clicked_button_reducer } from "../../modules/action";
import { change_clicked_button } from "../../modules/action";
import ScrollTriggerButton from "../SameLayout/ScrollTriggerButton";

import PartStepper from "../CameraTodayRoutine/PartStepper";
import SelectBar from "../SameLayout/SelectBar";




function TodaySummary(){

    const clickedButton=useSelector(state=>state.change_clicked_button_reducer.clickedButton);
    const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const{bodypart,part1,part2,part3}=routine_info;//부위정보 담아주기

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
    
    
    return(
        <div className="card bg-secondary shadow mb-3" data-component="AccountInformationCard">
      
        <div className="card-body" style={{padding:"1rem"}}>
            <i className="far fa-clipboard" style={{fontSize:"3.5em",color:"#5e72e4"}}></i>
            <h2 className="text-gray-dark display-4" >오늘의부위</h2>
            <hr></hr>

            

            <Button variant="contained" onClick={()=>handleClick("button1")}
            sx={
                popoverStyle
            }>
                <Avatar sx={avatarStyle}>{bodypart[0]}</Avatar>
            </Button>
            

            <span className="badge badge-primary btn-lg" style={{fontWeight:"lighter"}}>{part1.length}종목</span>
            
            <Stack direction="row" spacing={2}>
                <Button  variant="contained"  onClick={()=>handleClick("button2")}
                sx={
                    popoverStyle
                }>
                    <Avatar sx={avatarStyle}>{bodypart[1]}</Avatar>
                </Button>
               
                <Button  variant="contained" onClick={()=>handleClick("button3")}
                sx={
                    popoverStyle
                }>
                    <Avatar sx={avatarStyle}>{bodypart[2]}</Avatar>
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
                        <PartStepper where="Finish"/>
                        <PartStepper where="etc"/>
                    </Stack>
                </div>
        </div>
        <SwipeableEdgeDrawer select_button={clickedButton} />

        <ScrollTriggerButton content={"운동준비"}/>
       
    </div>
    );

}
export default TodaySummary;