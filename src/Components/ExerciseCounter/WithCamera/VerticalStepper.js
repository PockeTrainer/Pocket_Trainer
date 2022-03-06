import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import StepConnector from '@mui/material/StepConnector';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styles from '../../../CustomCss/ExerciseCounter/WithCamera/Instruction.module.css'
import '../../../CustomCss/ExerciseCounter/WithCamera/Instruction_material.css'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

const steps = [
  {
    label: '많은 사람이 카메라에 같이 있나요?',
    description: `질 좋은 체력측정을 위해서는 카메라 앞에 여러사람이 아닌 회원님만이 카메라에 잡혀야
    정확도 높은 측정이 가능해요! `,
  },
  {
    label: '가능하다면 밝은 배경에 앞에 있으신가요?',
    description:
      '꼭 그러실 필요는 없지만 우리 카메라는 되도록이면 회원님이 밝은색 배경 (예시:벽)에 있을 때 좀 더 정확도 높은 측정이 가능해요!'
  },
  {
    label: '회원님의 전신이 나오게 카메라를 거치하셨나요?',
    description: `부위 측정을 위해서는 해당 부위만이 나오는게 아니예요.전신을 카메라 앞에 나오게 해주세요!`,
  },
];

export default function VerticalStepper({link}) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const label = { inputProps: { 'aria-label': 'Checkbox' } };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical" connector={<StepConnector sx={{".MuiStepConnector-line":{minHeight:"0px"}}}/>} >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">마지막단계</Typography>
                ) : null
              }

              sx={{".MuiStepIcon-root.Mui-active":{color:"#5e72e4"},".MuiStepIcon-root.Mui-completed":{color:"#2dce89"}}}
            >
              <div className={"alert"+" "+styles[`alert-warning`]} role="alert">
                <span className={"alert-text"+" "+styles.alert_message}><strong><i className="ni ni-like-2"></i>주의:</strong><br></br>{step.label}</span>
              </div>
            </StepLabel>
            <StepContent sx={{paddingLeft:"15px",paddingRight:"15px",borderLeft:"4px solid #5e72e4"}}>
              <Typography>{step.description}</Typography>
              <Box>
                <div>
                  
                  {index === steps.length - 1 ? <button type="button" onClick={handleNext} className="btn btn-primary btn-lg btn-block"><i className="ni ni-check-bold"></i>체크완료</button> : <IconButton color="success" aria-label="ok" onClick={handleNext} size='large'>
                    <CheckCircleIcon/>
                  </IconButton> }
                  
                  
                  {index === 0 ? <IconButton disabled color="error" aria-label="ok" size='large'>
                    <HighlightOffTwoToneIcon/>
                  </IconButton>: <IconButton color="error" aria-label="ok" onClick={handleBack} size='large'>
                    <HighlightOffTwoToneIcon/>
                  </IconButton>}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper  elevation={0} sx={{ p: 3 }}>
          <Typography>이제 진짜 모든 준비가 완료되었군요?부위별 평가방법을 알아볼까요?</Typography>
          <Link to={link}>
            <button type="button"  className="btn btn-primary btn-lg btn-block"><i className="ni ni-bullet-list-67"></i>평가순서</button>
          </Link>
            
        </Paper>
      )}
    </Box>
  );
}
