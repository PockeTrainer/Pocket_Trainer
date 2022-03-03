import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea, CardActions } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';






function EachExerciseInstruction({openSnackBar,exercise}){//스낵바 여는 함수는 넘겨줄것

    return(
        <>
        <Card sx={{ maxWidth: 345 ,marginTop:"1em"}}>
                  <CardActionArea >
                    <CardMedia
                      component="img"
                      height="200"
                      image={exercise.image_url}
                      alt={exercise.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:"Noto Sans KR",fontWeight:"600"}}>
                        {exercise.name}(5set)
                      </Typography>
                      <Typography variant="body2" color="white" sx={{fontWeight:"lighter"}}>
                       {exercise.instruction}
                      </Typography>
                      
                      <Accordion sx={{marginTop:"1em"}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <Typography>운동레코드</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{"&.MuiAccordionDetails-root":{padding: "0px 2px 2px"}}}>
                                <div className="alert alert-warning" role="alert" style={{padding:"1em 1em",marginTop:"2em",marginBottom:"0em"}}>
                                    <i class="ni ni-like-2"></i>
                                    <h2><strong>벤치프레스 레코드</strong></h2>
                                    <Stack direction="column" spacing={2}>
                                    <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",lineHeight:"2",color:"white"}}>세트당 개수:12개</span> 
                                    <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",color:"white",lineHeight:"2"}}>세트당 휴식시간:1분40초</span> 
                                    <Stack direction="row" spacing={1}>
                                        <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",lineHeight:"2",color:"white",margin:"auto"}}>마지막중량:50kg</span> 
                                        <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",color:"white",lineHeight:"2",margin:"auto"}}>추천중량:60kg</span> 
                                    </Stack>
                                    </Stack>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                     
                        
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked sx={{color:"white",'&.Mui-checked':{color:"#fc7c5f"}}} />} label="해당 운동을 숙지하였습니다" />
                    </FormGroup>
                  </CardActions>
              </Card>


        </>
    );
}
export default EachExerciseInstruction