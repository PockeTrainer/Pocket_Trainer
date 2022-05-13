import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Demo from './Chart';
import { styled } from '@mui/system';
import Collapse from '@mui/material/Collapse';

export default function EachExerciseCard() {

  const [checked, setChecked] = React.useState(false);//밑에 그래프 여는용도

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const Pstyled=styled('p')((props)=>({
    fontSize:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0"
}));

  const spanStyle={
    fontWeight:"600",
    lineHeight:"2",
    color:"white",
    backgroundColor:"rgb(126 126 126)",
    padding:"0.35rem 2.375rem",
    marginBottom:"0.5rem"
  }

    const BigTitle={
        fontSize:"1.925rem",
        lineHeight:"1.535"
    }

    const ButtonStyle={
        fontFamily:"Noto Sans KR",
        fontSize:"0.975rem",
        fontWeight:"600",
        color:"#5e72e4"
    }
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#2dce89b3',marginTop:"2rem"}}>
      <Box sx={{ my: 1, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div" sx={BigTitle}>
              덤벨숄더프레스
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div" sx={{fontWeight:"lighter"}}>
              5kg
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
            전면+측면 삼각근 발달 운동
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ m: 2,mb:0 }}>
        <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em",textAlign:"center"}}>
          <span className="badge badge-default btn-lg" style={spanStyle}>시작운동시간:3시 50분</span>
          <span className="badge badge-default btn-lg" style={spanStyle}>시작운동시간:3시 50분</span>
        </div>
        <Typography gutterBottom variant="body1">
          최근운동일 
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="3/07" />
          <Chip  label="3/10" />
          <Chip  label="3/13"/>
          <Chip label="3/16" color="primary" />
        </Stack>
        <Collapse in={checked}>
          <div>
            <Demo/>
          </div>
        </Collapse>
        
      </Box>
      <Box sx={{ ml: 1, mb: 1 }}>
            <Button variant="outlined" onClick={handleChange} startIcon={<PlayCircleIcon />} sx={{color:"#5e72e4",border: "1px solid #f7fafc",fontFamily:"Noto Sans KR",marginTop:"2rem"}}>
                최근중량변화
            </Button>
      </Box>
    </Box>
  );
}
