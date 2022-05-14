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

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];
