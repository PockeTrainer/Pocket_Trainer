import React from "react";
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';
import EachExerciseMainPhoto from "./EachExerciseMainPhoto";

import { bench_press } from "../../../ExercisesInfo/ExerciseInfo";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { styled } from "@mui/system";

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

import Checkbox from '@mui/material/Checkbox';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const label = { inputProps: { 'aria-label': '즐겨찾기 추가' } };


export default function ExerciseDetails(){

    const Pstyled=styled('p')((props)=>({
        fontSize:props.size==="normal"?"1.0rem":"1.5rem",
        fontWeight:props.bold=="lighter"?"lighter":"600",
        lineWeight:"1.0",
        marginBottom:"0",
        display:props.display==="flex"?"flex":"",
        alignItems:props.display==="flex"?"center":""
    }));

    const AvatarStyleCss={
        fontFamily:"Noto Sans KR !important",
        backgroundColor:"#5e72e4",
        "&.MuiChip-avatar":{
            color:"white",
            fontWeight:"600"
        }
    }

    const AvatarBesideExercsieNameStyle={
        backgroundColor:"#2dce89",
        color:"black",
        width:"2rem",
        height:"2rem"
    }

    return(
        <>
            <EachExerciseMainPhoto exercise_obj={bench_press} where="Details"/>
            <Chip avatar={<Avatar sx={AvatarStyleCss}>가</Avatar>} label="가슴운동" sx={{".MuiChip-label":{fontWeight:"600"},marginBottom:"1.0rem"}} />

            <Stack direction="row" justifyContent={"space-between"}>
                <Pstyled bold="etc" display="flex" size="big">
                    <Avatar sx={AvatarBesideExercsieNameStyle}>
                        <FitnessCenterIcon sx={{color:"black"}}/>
                    </Avatar>
                    벤치프레스
                </Pstyled>
                <Stack direction="row" >
                    <Checkbox sx={{padding:"0"}} {...label} icon={<CheckCircleOutlineIcon sx={{fontSize:"2.5rem",margin:"0.1rem",color:"#7d7d7d"}}/>} checkedIcon={<CheckCircleIcon sx={{fontSize:"2.5rem",color:"#2dce89"}} />} />
                    <Checkbox {...label} icon={<BookmarkBorderIcon sx={{fontSize:"2.5rem"}}/>} checkedIcon={<BookmarkAddedIcon sx={{fontSize:"2.5rem",color:"#2dce89"}}/>} />
                </Stack>
                
            </Stack>
            
            <div className="alert alert-secondary" role="alert" style={{padding:"0.5em 0.5em",marginBottom:"0em",backgroundColor:"#f5f5f5"}}>
                <Pstyled bold="lighter" size="normal">
                    {bench_press.instruction}
                </Pstyled>
            </div>

            <Pstyled bold="etc" size="normal" display="flex">
                <WrongLocationIcon sx={{fontSize:"1.5rem",color:"#5e72e4"}}/>잘못된 경우
            </Pstyled>
            <div className="alert alert-primary" role="alert" style={{padding:"0.5em 0.5em",marginBottom:"0em"}}>
                <Pstyled bold="lighter" size="normal">
                    {
                        bench_press.wrong_pose_1
                    }
                </Pstyled>
                <Pstyled bold="lighter" size="normal">
                    {
                        bench_press.wrong_pose_2
                    }
                </Pstyled>
            </div>

        </>
    );
}