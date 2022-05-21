import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import {bench_press} from "../../ExercisesInfo/ExerciseInfo";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


export default function EachExerciseClear(){//메인페이지에서 각 위의 맨 상단 운동클리어여부도 보내줌

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

    return(
        <>
            <Widget>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CoverImage>
                    <img
                      alt="벤치프레스"
                      src={bench_press.image_url}
                    />
                    {/* <span className="text-success" style={{fontSize:"0.8rem"}}><i className="fas fa-arrow-down" />5세트 클리어</span> */}
                  </CoverImage>
                  <Box sx={{ ml: 1.5, minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      05/21가슴
                    </Typography>
                    <Typography  sx={{fontWeight:"600",color:"white",fontSize:"30px"}}>
                      벤치프레스
                    </Typography>
                    <CheckCircleIcon sx={IconStyle}/>
                    {/* <span className="text-success" style={{fontSize:"0.8rem"}}><i className="fas fa-arrow-down" />5세트 클리어</span> */}
                    <span className="badge badge-success" style={{fontSize:"0.7rem"}}><i className="fas fa-arrow-up" />5세트 클리어</span>
                  </Box>
                </Box>
              
          </Widget>
       
        </>
    );
}