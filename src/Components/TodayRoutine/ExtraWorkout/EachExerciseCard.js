import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Checkbox from '@mui/material/Checkbox';

import { bench_press } from '../../../ExercisesInfo/ExerciseInfo';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function EachExerciseCard() {

  const label = { inputProps: { 'aria-label': '루틴에 담을 여부' } };

  const ItemListTitle={
    ".MuiImageListItemBar-title":{fontWeight:"600"},

}
  return (
        <ImageListItem >
          <img
            src={bench_press.image_url}
            alt={bench_press.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={bench_press.name}
            subtitle="가슴운동"
            actionIcon={
                <>
              <Checkbox sx={{padding:"0"}} {...label} icon={<CheckCircleOutlineIcon sx={{margin:"0.1rem",color:"white"}}/>} checkedIcon={<CheckCircleIcon sx={{color:"#2dce89"}} />} />
              <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)',padding:"0" }}
              aria-label={`info about `}
            >
              <ContactSupportIcon sx={{margin:"0.1rem",color:"white"}} />
            </IconButton>
            </>
            }
            sx={ItemListTitle}
          />
        </ImageListItem>
  );
}


