import React,{useState} from "react";
import { styled } from "@mui/system";
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import PoolIcon from '@mui/icons-material/Pool';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60';
import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging90';

import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';


function ActivationLevel({update_func,value_list}){//활동량 파트
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
            activation_level:value
        });
    }

    return(
        <div className="card" style={{textAlign:"center"}} >
        <div className="card-body">
            <span className="badge badge-success" style={{fontSize:"1em",}}>활동수준</span>,
            <Pstyled bold="etc">
                당신의 평소 활동수준은 어떤가요?
            </Pstyled>

            <PoolIcon sx={{fontSize:"3rem",color:"#5e72e4 !important",margin:"1rem 0"}}/>

            

            <Stack direction="column" spacing={3}>
                <Button variant="contained" onClick={()=>handleClick(0)}
                sx={
                    popoverStyle
                }>
                    <Alert severity="error" sx={{backgroundColor:"rgb(255 152 152) !important",padding:"6px 40px "}}>
                        <AlertTitle sx={{color:"rgb(95, 33, 32) !important",fontWeight:"600"}}>쉬기</AlertTitle>
                        <span style={{color:"rgb(95, 33, 32)"}}>일상생활에는 거의 업무와 쉬기등 앉아있는 활동만 합니다 <BatteryAlertIcon/></span>
                    </Alert>
                </Button>


                <Button variant="contained"  onClick={()=>handleClick(1)}
                sx={
                    popoverStyle
                }>
                     <Alert severity="warning" sx={{backgroundColor:"rgb(255, 244, 229) !important",padding:"6px 40px "}}>
                        <AlertTitle sx={{color:"rgb(102, 60, 0) !important",fontWeight:"600"}}>낮은 활동적</AlertTitle>
                        <span style={{color:"rgb(102, 60, 0)"}}>일상생활에는 단시간 서있기 집안일 정도만 합니다<BatteryCharging20Icon/></span>
                    </Alert>
                </Button>
               


                <Button variant="contained" onClick={()=>handleClick(2)}
                sx={
                    popoverStyle
                }>
                     <Alert severity="info" sx={{backgroundColor:"rgb(181 234 255) !important",padding:"6px 40px "}}>
                        <AlertTitle sx={{color:"rgb(1, 67, 97) !important",fontWeight:"600"}}>평균적</AlertTitle>
                        <span style={{color:"rgb(1, 67, 97)"}}>일상생활에는 그래도 외부활동을 화면서 산책하는 활동을 합니다<BatteryCharging50Icon/></span>
                    </Alert>
                </Button>

                <Button variant="contained" onClick={()=>handleClick(3)}
                sx={
                    popoverStyle
                }>
                     <Alert severity="success" sx={{backgroundColor:"rgb(180 217 180) !important",padding:"6px 40px "}}>
                        <AlertTitle sx={{color:"rgb(30, 70, 32) !important",fontWeight:"600"}}>활동적</AlertTitle>
                        <span style={{color:"rgb(30, 70, 32)"}}>일상생활에는 근육운동,걷기,서있기 등을  합니다<BatteryCharging60Icon/></span>
                    </Alert>
                </Button>

                <Button variant="contained" onClick={()=>handleClick(4)}
                sx={
                    popoverStyle
                }>
                     <Alert icon={<LibraryAddCheckIcon/>} severity="success" sx={{backgroundColor:"rgb(198 255 198) !important",padding:"6px 40px "}}>
                        <AlertTitle sx={{color:"rgb(30, 70, 32) !important",fontWeight:"600"}}>매우 활동적</AlertTitle>
                        <span style={{color:"rgb(30, 70, 32)"}}>일상생활에는 신체를 이용한 일을 하거나 매우 활발한 운동등을 합니다<BatteryCharging90Icon/></span>
                    </Alert>
                </Button>
               

            </Stack>
            

            

        </div>
  </div>     
    );
  }
export default ActivationLevel