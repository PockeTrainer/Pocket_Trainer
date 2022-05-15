import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Grow } from '@mui/material';

import { clicked_part_name,next_extra_tab_page } from '../../../modules/action';

import {
    bench_press,
    seated_row,
    dumbbell_shoulder_press,
    cable_push_down,
    easy_bar_curl,
    seated_knees_up,
    squat
} from "../../../ExercisesInfo/ExerciseInfo"
import { useDispatch } from 'react-redux';

const images = [
  {
    url: bench_press.image_url,
    title: '가슴',
    width: '30%'
  },
  {
    url: seated_row.image_url,
    title: '등',
    width: '30%',
  },
  {
    url: dumbbell_shoulder_press.image_url,
    title: '어깨',
    width: '30%',
  },
  {
    url: cable_push_down.image_url,
    title: '삼두',
    width: '30%',
  },
  {
    url: easy_bar_curl.image_url,
    title: '이두',
    width: '30%',
  },
  {
    url: seated_knees_up.image_url,
    title: '복근',
    width: '30%',
  },
  {
    url: squat.image_url,
    title: '하체',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

export default function BodyPartButton() {

    const dispatch=useDispatch();

    const show_exercise_group=(title)=>{//운동그룹으로 보여주는페이지로 이동
        dispatch(clicked_part_name(title));
        dispatch(next_extra_tab_page());
        
    };

    const [checked, setChecked] = useState(false);


    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    useEffect(()=>{
        sleep(1000).then(()=>handleChange());
    },[])


  return (

    <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
    {...(checked ? { timeout: 1000 } : {})}>
    <div>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        {images.map((image) => (
            <ImageButton
            focusRipple
            key={image.title}
            style={{
                width: image.width,
                marginBottom:"0.3rem"
            }}
            onClick={()=>show_exercise_group(image.title)}
            >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
                <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
                >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
                </Typography>
            </Image>
            </ImageButton>
        ))}
        </Box>
    </div>
    
    </Grow>
  );
}
