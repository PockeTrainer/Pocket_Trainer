import React, { useState } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";



function ExerciseRoutine(){
  const[clickedButton,setClickedButton]=useState("total");
  const styleButton={
    "&.MuiButton-root:hover":{
      backgroundColor:"#2dce89"
    },
    "&.MuiButton-root":{
      padding:"25px 70px",
      backgroundColor:"#5e72e4",
      display:"inline"
    }
  }
  
  const handleClick=(select)=>{
    setClickedButton(select);
  }
  const buttons = [
    <Button key="one" onClick={()=>handleClick("button1")}  sx={styleButton} ><h2 className="display-3" >가슴루틴</h2><i class="fas fa-arrow-circle-down" style={{fontSize:"4em",color:"white"}}></i></Button>,
    <Button key="two" onClick={()=>handleClick("button2")} sx={styleButton}><h2 className="display-3" >삼두루틴</h2><i class="fas fa-arrow-circle-down" style={{fontSize:"4em",color:"white"}}></i></Button>,
    <Button key="three" onClick={()=>handleClick("button3")}  sx={styleButton}><h2 className="display-3" >복근루틴</h2><i class="fas fa-arrow-circle-down" style={{fontSize:"4em",color:"white"}}></i></Button>,
  ];

    return(
        <div className="card bg-secondary shadow mb-3" data-component="AccountInformationCard">
      
          <div className="card-body">
            <i class="fas fa-flag-checkered" style={{fontSize:"4em",color:"#5e72e4"}}></i>
            <h2 className="text-gray-dark display-4" >오늘의루틴</h2>
            <hr></hr>

                {/* <h2 className="display-2" style={{marginTop:"1em"}} >가슴루틴</h2>
                <i class="fas fa-arrow-circle-down" style={{fontSize:"3em",color:"b"}}></i>
                <hr></hr> */}
            <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="text"
          >
            {buttons}
          </ButtonGroup>    
            


          <SwipeableEdgeDrawer select_button={clickedButton}/>


             
          </div>
      </div>
    );
}
export default ExerciseRoutine;