import * as React from 'react';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import {
    bench_press,
    seated_row,
    dumbbell_shoulder_press,
    incline_press
} from "../../../ExercisesInfo/ExerciseInfo";

import EachExerciseCard from './EachExerciseCard';
import { Stack } from '@mui/material';
import { IconButton } from '@mui/material';


export default function ExerciseGroup() {

    const popoverStyle={
        "&.MuiButton-root":{
            display:"flex",
            margin:"auto",
            boxShadow:"0",
            backgroundColor:"rgb(50 50 93 / 0%) "
        }
    }

    const IconButtonStyle={
        "&.MuiIconButton-root":{
            padding:"0px",
            backgroundColor:"transparent",
            fontSize:"1em"
        },
        "&.MuiIconButton-root:hover":{
            backgroundColor:"transparent"
        }

    };

    const Pstyled=styled('p')((props)=>({
        fontSize:props.size==="big"?"1.5rem":"1.0rem",
        fontWeight:props.bold=="lighter"?"lighter":"600",
        lineWeight:"1.0",
        marginBottom:"0"
    }))

  return (
    <>
        <Stack direction={"row"} spacing={2} sx={{justifyContent:"space-between",alignItems:"center"}}>
            <IconButton sx={IconButtonStyle}>
                <ArrowCircleLeftIcon sx={{fontSize:"2.5rem"}}/>
            </IconButton>
            <Pstyled bold="etc">
                가슴
            </Pstyled>
            <IconButton sx={IconButtonStyle}>
                <Button variant="contained" 
                sx={
                    popoverStyle
                }>
                    <Avatar sx={{width:"2rem",height:"2rem",backgroundColor:"#2dce89"}}>
                        <FitnessCenterIcon/>
                    </Avatar>
                </Button>

            </IconButton>
        </Stack>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <EachExerciseCard/>
            </Grid>
            <Grid item xs={6}>
                <EachExerciseCard/>
            </Grid>
            <Grid item xs={6}>
                <EachExerciseCard/>
            </Grid>
        </Grid>
        <div className="alert alert-secondary" role="alert" style={{marginBottom:"0em",padding:"0.5rem 0.5rem",marginTop:"2rem"}}>
            <span className="badge badge-success" style={{fontSize:"1em",display:"block",margin:"0rem 4rem"}}><ShoppingCartIcon sx={{color:"#4c4c4c"}}/> 담은 운동들</span>
            <div style={{padding:"0.3rem"}}>
                <Chip
                    label={"벤치프레스"}
                />
                <Chip
                    label={"벤치프레스"}
                />
                <Chip
                    label={"벤치프레스"}
                />
                <Chip
                    label={"벤치"}
                />
            </div>
        </div>
    </>
  );
}

const itemData = [
  {
    img: bench_press.image_url,
    title: '벤치프레스',
    featured: true,
  },
  {
    img: incline_press.image_url,
    title: '인클라인프레스',
  },
  {
    img: seated_row.image_url,
    title: '시티드로우',
  }
];
