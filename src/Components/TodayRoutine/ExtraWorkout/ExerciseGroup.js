import * as React from 'react';
import Grid from '@mui/material/Grid';
import {
    bench_press,
    seated_row,
    dumbbell_shoulder_press,
    incline_press
} from "../../../ExercisesInfo/ExerciseInfo";

import EachExerciseCard from './EachExerciseCard';


export default function ExerciseGroup() {

  return (
    <>
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
