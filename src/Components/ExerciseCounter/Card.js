import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,CardActions} from '@mui/material';

import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';


export default function ExerciseCard({exercise}) {
  return (
    <Card sx={{ maxWidth: 345 ,marginBottom:"1em",marginRight:"1em"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={exercise.image_url}
          alt={exercise.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {exercise.name}
          </Typography>
          <Typography variant="body1" sx={{color:"white"}}>
            {exercise.instruction}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
            <Button variant="outlined" startIcon={<PlayCircleIcon />} sx={{color:"white",border: "1px solid #f7fafc",fontFamily:"Noto Sans KR"}}>
                연습해보기
            </Button>
      </CardActions>
    </Card>
  );
}
