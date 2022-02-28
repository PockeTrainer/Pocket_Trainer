import React,{useRef,useState} from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
function PartStepper({where}){
    const steps ={
      BodyPart:{
        series:["가슴","삼두","복근"],
        size:"big"
      },
      set_progress:{
        series:["1세트","2세트","3세트","4세트","5세트"],
        size:"small"
      }
    };

    const howmanySet=useSelector(state=>state.change_set_reducer.current_set)//운동진행세트 수

      const StepLabelStyle=styled(StepLabel)((props)=>({
          ".MuiStepLabel-label":{fontFamily:"Noto Sans KR",fontWeight:"600",fontSize:props.size==="big"?"1.575rem":"1.075rem"},
          ".MuiStepLabel-label.Mui-active":{color:"#ffc107"},
          ".MuiStepLabel-labelContainer":{color:"#5e72e4"},
          ".MuiStepLabel-label.Mui-completed":{color:"#2dce89"}
        })
      )

      const StepLabelStyle_={
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
                              <Stepper activeStep={howmanySet} alternativeLabel>
                                  {steps[where].series.map((label) => (
                                  <Step key={label}>
                                          <StepLabelStyle size={steps[where].size}  StepIconProps={{sx:stepIconStyle}}>{label}</StepLabelStyle>

                                  </Step>
                                  ))}
                              </Stepper>
          </Box>
          </> 
      );
    
    
}
export default PartStepper