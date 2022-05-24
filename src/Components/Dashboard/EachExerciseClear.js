import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


export default function EachExerciseClear({exercise_obj}){//메인페이지에서 각 위의 맨 상단 운동클리어여부도 보내줌

    const today=new Date();
    const today_month=today.getMonth()+1;
    const today_date=today.getDate();

    const today_data=today_month+"/"+today_date;

    const Widget = styled('div')(({ theme }) => ({
        padding: 16,
        borderRadius: 16,
        width: "100%",
        maxWidth: '100%',
        margin: 'auto',
        position: 'relative',
        zIndex: 1,
        backgroundColor:
          theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
        backdropFilter: 'blur(40px)',
        marginBottom:"1rem"
      }));
      
      const CoverImage = styled('div')({
        width: "8rem",
        height: "8rem",
        objectFit: 'cover',
        overflow: 'hidden',
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: 'rgb(0 0 0 / 5%)',
        '& > img': {
          width: '100%',
        },
      });

      const IconStyle={
          fontSize:"2.5rem"
      }

      // console.log("하이:",exercise_obj);

    return(
        <>
            <Widget>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CoverImage>
                    <img
                      alt={exercise_obj.name}
                      src={exercise_obj.image_url}
                      style={{height:"100%"}}
                    />
                  </CoverImage>
                  <Box sx={{ ml: 1.5, minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary" sx={{fontWeight:"600",color:"white"}}>
                      {today_data}{exercise_obj.part}
                    </Typography>
                    <Typography  sx={{fontWeight:"600",color:"white",fontSize:"30px"}}>
                      {exercise_obj.name}
                    </Typography>
                    {
                      exercise_obj.Info_from_api.is_clear//풀세트 클리어
                      ?
                        <>
                          <CheckCircleIcon sx={{...IconStyle,color:"#2dce89"}}/>
                          <span className="badge badge-success" style={{fontSize:"0.7rem",color:"#198754"}}><i className="fas fa-arrow-up" />5세트 클리어</span>
                        </>
                      :(
                        exercise_obj.Info_from_api.workout_time!==null//일부세트 클리어
                        ?
                          <>
                            <ReportProblemIcon sx={{...IconStyle,color:"#fb6340"}} />
                            <span className="badge badge-danger" style={{fontSize:"0.7rem"}}><i className="fas fa-arrow-right" />일부 클리어</span>
                          </>
                        :
                        <>
                          <CancelIcon sx={{...IconStyle,color:"#dc3545"}} />
                          <span className="badge badge-warning" style={{fontSize:"0.7rem"}}><i className="fas fa-arrow-down" />올Fail</span>
                        </>
                      )
                    }
                    
                    
                  </Box>
                </Box>
              
          </Widget>
       
        </>
    );
}