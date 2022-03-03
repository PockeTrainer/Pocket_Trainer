import React,{useState} from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";
import Popover from '@mui/material/Popover';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';

import NavigationIcon from '@mui/icons-material/Navigation';
import { useDispatch, useSelector } from "react-redux";
import { change_clicked_button_reducer } from "../../modules/action";
import { change_clicked_button } from "../../modules/action";


function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 50,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        '#back-to-top-anchor',
      );
  
      if (anchor) {
        anchor.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
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

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });
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

        <ScrollTop>
            <button type="button"
             className="btn btn-primary btn-lg btn-block"
             style={{padding:"0.475rem 0.7rem",borderRadius:"1.4375rem",boxShadow:"0 15px 6px #21252975, 0 5px 3px #5e72e4"
}}><h2><i className="ni ni-button-play"></i>운동시작</h2></button>
      </ScrollTop>
       
    </div>
    );

}
export default TodaySummary;