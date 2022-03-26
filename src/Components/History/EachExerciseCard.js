import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

export default function EachExerciseCard() {
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
      <Box sx={{ m: 2 }}>
        <Typography gutterBottom variant="body1">
          최근운동일 
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="3/07" />
          <Chip  label="3/10" />
          <Chip  label="3/13"/>
          <Chip label="3/16" color="primary" />
        </Stack>
      </Box>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
            <Button variant="outlined" startIcon={<PlayCircleIcon />} sx={{color:"#5e72e4",border: "1px solid #f7fafc",fontFamily:"Noto Sans KR",marginTop:"2rem"}}>
                최근중량변화
            </Button>
      </Box>
    </Box>
  );
}
