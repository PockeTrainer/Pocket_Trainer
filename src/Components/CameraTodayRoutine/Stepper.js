import React,{useRef,useState} from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function PartStepper(){
    const steps = [
        '가슴',
        '삼두',
        '복근',
      ];

      const stepLabelStyle={
        ".MuiStepLabel-label":{fontFamily:"Noto Sans KR",fontWeight:"600",fontSize:"1.575rem"},
        ".MuiStepLabel-label.Mui-active":{color:"#ffc107"},
        ".MuiStepLabel-labelContainer":{color:"#5e72e4"},
        ".MuiStepLabel-label.Mui-completed":{color:"#2dce89"}
      }

      const stepIconStyle={
        "&.MuiStepIcon-root":{color:"#8898aa"},
        "&.Mui-active":{color:"orange"},
        "&.Mui-completed":{color:"#2dce89"}
      }
    return(
        <>
        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={0} alternativeLabel>
                                {steps.map((label) => (
                                <Step key={label}>
                                        <StepLabel sx={stepLabelStyle} StepIconProps={{sx:{stepIconStyle}}}>{label}</StepLabel>
                                </Step>
                                ))}
                            </Stepper>
         </Box>
        </> 
    );
}
export default PartStepper