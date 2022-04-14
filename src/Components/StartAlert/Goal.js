import React,{useState} from "react";
import { styled } from "@mui/system";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import PersonIcon from '@mui/icons-material/Person';
import { Stack } from "@mui/material";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import Button from '@mui/material/Button';

function Goal({update_func,value_list}){//목표설정 파트

    const Pstyled=styled('p')((props)=>({
        fontSize:"1.0rem",
        fontWeight:props.bold=="lighter"?"lighter":"600",
        lineWeight:"1.0",
        marginBottom:"0",
        color:'black'
      }));

      const popoverStyle={
        "&.MuiButton-root":{
            display:"flex",
            boxShadow:"0",
            backgroundColor:"rgb(50 50 93 / 0%) ",
            padding:"0 0"
        }
    }


    const handleClick=(value)=>{//눌린 버튼 값을 가지고 처리-부모로 값을 업데이트 시켜줌
        update_func({
            ...value_list,
            goal_answer:value
        });
    }
    return(
      <div className="card" style={{textAlign:"center"}} >
            <div className="card-body">
                <span className="badge badge-success" style={{fontSize:"1em",}}>목표</span>,
                <Pstyled bold="etc">
                    당신의 목표는 무엇인가요?
                </Pstyled>

                <SportsScoreIcon sx={{fontSize:"3rem",color:"#5e72e4 !important",margin:"2rem 0"}}/>

                

                <Stack direction="column" spacing={3}>
                    <Button variant="contained" onClick={()=>handleClick(0)}
                    sx={
                        popoverStyle
                    }>
                        <Alert severity="error" sx={{backgroundColor:"rgb(255 152 152) !important",padding:"6px 40px "}}>
                            <AlertTitle sx={{color:"rgb(95, 33, 32) !important",fontWeight:"600"}}>체중감소</AlertTitle>
                            <span style={{color:"rgb(95, 33, 32)"}}>저는 체중감소가 목적이에요<PersonRemoveAlt1Icon/></span>
                        </Alert>
                    </Button>


                    <Button variant="contained" onClick={()=>handleClick(1)}
                    sx={
                        popoverStyle
                    }>
                         <Alert severity="info" sx={{backgroundColor:"rgb(181 234 255) !important",padding:"6px 40px "}}>
                            <AlertTitle sx={{color:"rgb(1, 67, 97) !important",fontWeight:"600"}}>체중유지</AlertTitle>
                            <span style={{color:"rgb(1, 67, 97)"}}>저는 체중유지가 목적이에요<PersonIcon/></span>
                        </Alert>
                    </Button>
                   


                    <Button variant="contained"  onClick={()=>handleClick(2)}
                    sx={
                        popoverStyle
                    }>
                         <Alert severity="success" sx={{backgroundColor:"rgb(198 255 198) !important",padding:"6px 40px "}}>
                            <AlertTitle sx={{color:"rgb(30, 70, 32) !important",fontWeight:"600"}}>체중증가</AlertTitle>
                            <span style={{color:"rgb(30, 70, 32)"}}>저는 체중증가가 목적이예요<PersonAddAlt1Icon/></span>
                        </Alert>
                    </Button>
                   

                </Stack>
                

                

            </div>
      </div>        
    );
};
export default Goal
  