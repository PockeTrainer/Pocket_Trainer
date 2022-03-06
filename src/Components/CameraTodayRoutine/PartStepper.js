import React,{useRef,useState} from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function PartStepper({where}){

  const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
  const{bodypart,part1,part2,part3}=routine_info;//부위정보 담아주기

  const part=useParams();//지금은 어떤 부위페이지에서 부르는지 파악하는 것
    const steps ={
      //부위
      BodyPart:{
        series:bodypart,
        size:"big"
      },//진행세트
      set_progress:{
        series:["1세트","2세트","3세트","4세트","5세트"],
        size:"small"
      },//운동
      part1:{
        series:part1,
        size:"x-small"
      },
      part2:{
        series:part2,
        size:"x-small"
      },
      part3:{
        series:part3,
        size:"x-small"
      },
      part2_3:{
        series:[...part2,...part3],
        size:"x-small"
      }
    };

      const howmanySet=useSelector(state=>state.change_set_reducer.current_set)//운동진행세트 수

      const StepLabelStyle=styled(StepLabel)((props)=>({
          ".MuiStepLabel-label":{fontFamily:"Noto Sans KR",fontWeight:"600",fontSize:props.size==="big"?"1.575rem":(props.size==="small"?"1.075rem":"0.875rem")},
          ".MuiStepLabel-label.Mui-active":{color:"#ffc107"},
          ".MuiStepLabel-labelContainer":{color:"#5e72e4"},
          ".MuiStepLabel-label.Mui-completed":{color:"#2dce89",fontWeight:"600"}
        })
      )

      const stepIconStyle={
        "&.MuiStepIcon-root":{color:"#8898aa"},
        "&.Mui-active":{color:"orange"},
        "&.Mui-completed":{color:"#2dce89"}
      }


      const isAllClear=(part)=>{//해당부위의 모든 운동들이 끝이 실행이 완료됐는지를 알려준다.
        part.foreach((exercise)=>{
          if(!exercise.Info_from_api.is_clear){
            return false;
          }
        })
        return true;
      }

      const isActive=(label,index)=>{
        if(where==="BodyPart"){
          if(part.bodypart==="chest"||part.bodypart==="back"||part.bodypart==="shoulder"){//1등인 운동들
            if(label==="가슴"||label==="등"||label==="어깨"){//첫번째 운동
              return true
            }
            else if(label==="삼두"||label==="이두"||label==="하체"){//두번째 운동
              return false;
            }
            else{//복근운동은 상황상 항상 마지막운동
              return false;
            }
          }
          else if(part.bodypart==="tricep"||part.bodypart==="bicep"||part.bodypart==="leg"){//2등인 운동들
            if(label==="가슴"||label==="등"||label==="어깨"){//첫번째 운동
              return false
            }
            else if(label==="삼두"||label==="이두"||label==="하체"){//두번째 운동
              return true;
            }
            else{//복근운동은 상황상 항상 마지막운동
              return false;
            }
          }
          else{//마지막 부위스텝일때
            if(label==="가슴"||label==="등"||label==="어깨"){//첫번째 운동
              return false
            }
            else if(label==="삼두"||label==="이두"||label==="하체"){//두번째 운동
              return false;
            }
            else{//복근운동은 상황상 항상 마지막운동
              return true;
            }
          }
         
        }
        else if(where==="set_progress"){
          if(howmanySet===1){
            if(index===1){
              return true;
            }
            else{
              return false;
            }
          }
          else if(howmanySet===2){
            if(index===2){
              return true;
            }
            else{
              return false;
            }
          }
          else if(howmanySet===3){
            if(index===3){
              return true;
            }
            else{
              return false;
            }

          }
          else if(howmanySet===4){
            if(index===4){
              return true;
            }
            else{
              return false;
            }

          }
          else if(howmanySet===5){
            if(index===5){
              return true;
            }
            else{
              return false;
            }

          }
        }
        else{//각 운동별 실행여부
          return false;
        }
      };

      const isCompleted=(label,index)=>{
        if(where==="BodyPart"){
          if(part.bodypart==="chest"||part.bodypart==="back"||part.bodypart==="shoulder"){//1등인 운동들
            if(label==="가슴"||label==="등"||label==="어깨"){//첫번째 운동
              return false;
            }
            else if(label==="삼두"||label==="이두"||label==="하체"){//두번째 운동
              return false;
            }
            else{//복근운동은 상황상 항상 마지막운동
              return false;
            }
          }
          else if(part.bodypart==="tricep"||part.bodypart==="bicep"||part.bodypart==="leg"){//2등인 운동들
            if(label==="가슴"||label==="등"||label==="어깨"){//첫번째 운동
              let result=isAllClear();
              return result;
            }
            else if(label==="삼두"||label==="이두"||label==="하체"){//두번째 운동
              return false;
            }
            else{//복근운동은 상황상 항상 마지막운동
              return false;
            }
          }
          else{//마지막 부위스텝일때
            if(label==="가슴"||label==="등"||label==="어깨"){//첫번째 운동
              let result=isAllClear();
              return result;
            }
            else if(label==="삼두"||label==="이두"||label==="하체"){//두번째 운동
              let result=isAllClear();
              return result;
            }
            else{//복근운동은 상황상 항상 마지막운동
              return false;
            }
          }
         
        }
        else if(where==="set_progress"){
          if(howmanySet===1){
            if(index===0){
              return true;
            }
            else{
              return false;
            }
          }
          else if(howmanySet===2){
            if(index<=1){
              return true;
            }
            else{
              return false;
            }
          }
          else if(howmanySet===3){
            if(index<=2){
              return true;
            }
            else{
              return false;
            }

          }
          else if(howmanySet===4){
            if(index<=3){
              return true;
            }
            else{
              return false;
            }

          }
          else if(howmanySet===5){
            return true;
          }
        }
        else{//각 운동별 실행여부
          if(label.Info_from_api.is_clear){//운동을 완료했으면 당연히 completed는 true
            return true;
          }
          else{
            return false;
          }
        }
      };

      const isError=(label,index)=>{
        if(where==="BodyPart"){
          if(part.bodypart==="chest"||part.bodypart==="back"||part.bodypart==="shoulder"){//1등인 운동들
            if(label==="가슴"||label==="등"||label==="어깨"){//첫번째 운동
              return false;
            }
            else if(label==="삼두"||label==="이두"||label==="하체"){//두번째 운동
              return false;
            }
            else{//복근운동은 상황상 항상 마지막운동
              return false;
            }
          }
          else if(part.bodypart==="tricep"||part.bodypart==="bicep"||part.bodypart==="leg"){//2등인 운동들
            if(label==="가슴"||label==="등"||label==="어깨"){//첫번째 운동
              let result=!isAllClear();
              return result;
            }
            else if(label==="삼두"||label==="이두"||label==="하체"){//두번째 운동
              return false;
            }
            else{//복근운동은 상황상 항상 마지막운동
              return false;
            }
          }
          else{//마지막 부위스텝일때
            if(label==="가슴"||label==="등"||label==="어깨"){//첫번째 운동
              let result=!isAllClear();
              return result;
            }
            else if(label==="삼두"||label==="이두"||label==="하체"){//두번째 운동
              let result=!isAllClear();
              return result;
            }
            else{//복근운동은 상황상 항상 마지막운동
              return false;
            }
          }
         
        }
        else if(where==="set_progress"){//세트 진행에 있어서 오류라는 상황은 존재하지 않음
         return false;
        }
        else{//각 운동별 실행여부
          if(label.Info_from_api.is_clear){//운동을 완료했으면 당연히 error는 false
            return false;
          }
          else{
            return true;
          }
        }
      }

        return(
          <>
          <Box sx={{ width: '100%' }}>
                              <Stepper alternativeLabel>
                                  {steps[where].series.map((label,index) => (
                                  <Step key={index} active={isActive(label,index)} completed={isCompleted(label,index)}>
                                          <StepLabelStyle error={isError(label,index)} size={steps[where].size}  StepIconProps={{sx:stepIconStyle}}>{where==="BodyPart"||where==="set_progress"?label:label.name}</StepLabelStyle>

                                  </Step>
                                  ))}
                              </Stepper>
          </Box>
          </> 
      );
    
    
}
export default PartStepper