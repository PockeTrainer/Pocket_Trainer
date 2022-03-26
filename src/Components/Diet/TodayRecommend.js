import React,{useState,useEffect, useRef} from 'react';
import CardWrapper from '../CameraTodayRoutine/CardWrapper';
import Stack from '@mui/material/Stack';
import FastfoodIcon from '@mui/icons-material/Fastfood';

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Zoom from '@mui/material/Zoom';



function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

function TodayRecommend(){

    const [clicked_button,set_Clicked_button]=useState("part1");//몇번째 버튼을 눌렀는지에 대한 state
    const [tmp_clicked_part,setTmpClicked_part]=useState("part1");//각 부위별 무엇을 눌렀는지 임시저장 버튼state
    const count1=useRef(1);
    const [showList,setShowList]=useState(true);//밑에 리스트에 주는 zoom transition 

    const handleShowList=()=>{
        setShowList(prev=>!prev);
    }

    useEffect(()=>{
        if(count1.current===1){
            count1.current+=1;
            return;
        }
        handleShowList();//닫아주기
        sleep(500).then(()=>set_Clicked_button(tmp_clicked_part));
        setTimeout(handleShowList,500);//열어주기
      },[tmp_clicked_part])

    const SpanStyle={
        backgroundColor:"#2dce89",
        borderColor:"#2dce89",
        color:"white",
        padding:"0.5rem 0.5rem",
        fontSize:"1.375rem",
        marginTop:"0.3em"
    }
    const badgeStyle={
        backgroundColor:"white"
    }

    const PartButtonStyle={
        "&.MuiButton-root":{
            padding:"0px",
            boxShadow:"",
            backgroundColor:"transparent",
            color:"#2dce89"
        },
        "&.MuiButton-root:hover":{
            backgroundColor:"transparent"
        }
    }

    const AvatarStyle=styled(Avatar)((props)=>({
        width:"4rem",
        height:"4rem",
        fontSize:"1.55rem",
        fontFamily:"Nanum Gothic",
        fontWeight:"600",
        backgroundColor:props.color,
        margin:"auto"
      }));

    const nutritionStyle={
        fontSize:"0.9rem",
        marginTop:"0.5rem"
    } 

    const foodNameStyle={
        color:"white",
        fontWeight:"600",
        lineHeight:"1.0",

    }
   
    return(
        <>
            <CardWrapper time={1000}>
                    <FastfoodIcon sx={{fontSize:"3.5em",color:"#5e72e4",marginTop:"0.2em"}}/>
                    <h4 className="heading" style={{fontSize:"1.5rem"}}>영양소별 추천양</h4>
                    <span className="badge badge-success" style={{fontSize:"1em",margin:"1em",marginBottom:"2rem"}}>03/23목표량</span>
                    <br></br>

                    <Stack direction="row" spacing={4} sx={{marginBottom:"1rem",justifyContent:"center"}}>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part1")}>
                                    <Badge color="success" badgeContent={"150g"} >
                                        <AvatarStyle src='../assets/img/theme/carbo.png' color="#5e72e4"  ></AvatarStyle>
                                    </Badge>
                                </Button>
                                 <span className="badge badge-default" style={nutritionStyle}>탄수화물</span>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part2")} >
                                    <Badge color="success" badgeContent={"150g"} >
                                        <AvatarStyle src='../assets/img/theme/protein.jpg' color="#2dce89"  ></AvatarStyle>
                                    </Badge>
                                </Button>
                                 <span className="badge badge-primary" style={nutritionStyle}>단백질</span>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part3")}>
                                    <Badge color="success" badgeContent={"150g"} >
                                        <AvatarStyle src='../assets/img/theme/fat.jpg'  color="#ffc107"  ></AvatarStyle>
                                    </Badge>
                                </Button>
                                <span className="badge badge-info" style={nutritionStyle}>지방</span>
                            </Stack>
                    </Stack>

                    <Zoom in={showList}>
                        <div className="alert alert-warning" role="alert" style={SpanStyle} >
                            <Stack direction="column">
                                <span className="badge badge-primary btn-lg" style={badgeStyle}>탄수화물</span> 
                                <span className="alert-text" style={{fontSize:"1rem",marginTop:"1rem"}}>탄수화물 150g을 채울려면?</span>
                            
                                <Stack direction="row" spacing={4} sx={{marginTop:"1rem",justifyContent:"center"}}>
                                <Stack direction="column">
                                    <Button sx={PartButtonStyle}>
                                        <Badge color="success" badgeContent={"1+1/3개"} >
                                            <AvatarStyle src='../assets/img/theme/carbo.png' color="#5e72e4"  ></AvatarStyle>
                                        </Badge>
                                    </Button>
                                    <Typography sx={foodNameStyle}>고구마<br></br>(163g)</Typography>
                                </Stack>
                                <Stack direction="column">
                                    <Button sx={PartButtonStyle} >
                                        <Badge color="success" badgeContent={"2/3공기"} >
                                            <AvatarStyle src='../assets/img/theme/protein.jpg' color="#2dce89"  ></AvatarStyle>
                                        </Badge>
                                    </Button>
                                    <Typography sx={foodNameStyle}>현미밥<br></br>(154g)</Typography>
                                </Stack>
                                <Stack direction="column">
                                    <Button sx={PartButtonStyle} >
                                        <Badge color="success" badgeContent={"2/3인분"} >
                                            <AvatarStyle src='../assets/img/theme/fat.jpg'  color="#ffc107"  ></AvatarStyle>
                                        </Badge>
                                    </Button>
                                    <Typography sx={foodNameStyle}>오트밀<br></br>(74g)</Typography>
                                </Stack>
                            </Stack>
                            
                            </Stack>

                        
                        </div>
                    </Zoom>
                    
            </CardWrapper>

           

        </>
    );
}
export default TodayRecommend