import React,{useState,useEffect} from 'react';
import Grid from '@mui/material/Grid';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


import { styled } from '@mui/system';
import { Grow } from '@mui/material';
import { useSelector,useDispatch } from "react-redux";

import { exercise_classfication } from '../../../ExercisesInfo/ExerciseInfo';
import EachExerciseCard from './EachExerciseCard';


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

export default function ExerciseGroup() {


    const extra_routine=useSelector(state=>state.update_extra_exercise_reducer);//추가운동 페이지의 전체 정보가져오기
    const {page,what_i_want_exercise,favorite,clicked_part}=extra_routine;

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

    const [checked, setChecked] = useState(false);


    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    useEffect(()=>{
        sleep(1000).then(()=>handleChange());
    },[])


  return (
    <>

    <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
        {...(checked ? { timeout: 1000 } : {})}>
        <div>

        <Grid container spacing={1}>
            <Grid item xs={12}>
                <EachExerciseCard exercise_obj={exercise_classfication[clicked_part][0]}/>
            </Grid>
            <Grid item xs={6}>
                <EachExerciseCard exercise_obj={exercise_classfication[clicked_part][1]}/>
            </Grid>
            <Grid item xs={6}>
                <EachExerciseCard exercise_obj={exercise_classfication[clicked_part][2]}/>
            </Grid>
        </Grid>
        
        </div>
        </Grow>
    </>
  );
}

