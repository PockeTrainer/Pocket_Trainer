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




function TodaySummary(){

    const clickedButton=useSelector(state=>state.change_clicked_button_reducer.clickedButton);
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

    
    
    return(
        <div className="card bg-secondary shadow mb-3" data-component="AccountInformationCard">
      
        <div className="card-body" style={{padding:"1rem"}}>
            <i className="far fa-clipboard" style={{fontSize:"4em",color:"#5e72e4"}}></i>
            <h2 className="text-gray-dark display-4" >오늘의부위</h2>
            <hr></hr>

            

            <Button variant="contained" onClick={()=>handleClick("button1")}
            sx={
                popoverStyle
            }>
                <Avatar sx={avatarStyle}>가슴</Avatar>
            </Button>
            

            <span className="badge badge-primary btn-lg" style={{fontWeight:"lighter"}}>3종목</span>
            
            <Stack direction="row" spacing={2}>
                <Button  variant="contained"  onClick={()=>handleClick("button2")}
                sx={
                    popoverStyle
                }>
                    <Avatar sx={avatarStyle}>삼두</Avatar>
                </Button>
               
                <Button  variant="contained" onClick={()=>handleClick("button3")}
                sx={
                    popoverStyle
                }>
                    <Avatar sx={avatarStyle}>복근</Avatar>
                </Button>
               
                
            </Stack>
            <Stack direction="row" spacing={2}>
                <span className="badge badge-primary btn-lg" style={{margin:"auto",fontWeight:"lighter"}}>1종목</span> 
                <span className="badge badge-primary btn-lg" style={{margin:"auto",fontWeight:"lighter"}}>1종목</span> 
            </Stack>
          <p className='card-text' style={{marginTop:"30px"}}>마지막 해당루틴날짜:2022/01/18</p>
          <div className="alert alert-warning" role="alert" style={{padding:"1.5em 1.5em"}}>
                <i class="ni ni-like-2"></i>
                <h2><strong>부위별 평균등급</strong></h2>
                <Stack direction="row" spacing={0}>
                <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",lineHeight:"2",color:"white"}}>가슴:3등급</span> 
                <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",color:"white",lineHeight:"2"}}>팔(삼두):2등급</span> 
                <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",color:"white",lineHeight:"2"}}>복근:5등급</span> 
                </Stack>
          </div>
          
        </div>
        <SwipeableEdgeDrawer select_button={clickedButton} />

        <ScrollTriggerButton content={"운동준비"}/>
       
    </div>
    );

}
export default TodaySummary;