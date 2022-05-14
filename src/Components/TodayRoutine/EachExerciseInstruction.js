import React,{useState,useEffect, useRef} from 'react';
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
import ErrorIcon from '@mui/icons-material/Error';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';

import { styled } from "@mui/system";






function EachExerciseInstruction({openSnackBar,exercise}){//스낵바 여는 함수는 넘겨줄것

  const [result_value,set_result_value]=useState({//최종적으로 보여주는 것
    last:"",
    new:"",
    gap:""
  });

  const key_for_unit=useRef();//단위 보여주는 용도의 키값
  const key_for_gap=useRef();//근손실 증량 메세지 보여주는 용도 키값
  const tmp_sign=useRef();//근손실 여부 부호 + -

  const[break_time,set_break_time]=useState({//휴식시간용
    min:"",
    sec:""
  });


  const spanStyle={
    fontWeight:"lighter",
    lineHeight:"2",
    color:"white",
    backgroundColor:"#5e72e4"
  }

  const unit={
    weight_demand:{
      unit:"kg",
      message:"중량",
    },
    count_demand:{
      unit:"개",
      message:"개수"
    },
    pound_demand:{
      unit:"lbs",
      message:"중량"
    },
    etc:{
      unit:"",
      message:"시간"
    }
  };

  const gap_message={
    weight_lose:{
      message:"근손실",
      css_style:"badge badge-danger",
      icon:<PersonRemoveAlt1Icon/>
    },
    weight_same:{
      message:"근유지",
      css_style:"badge badge-primary",
      icon:<PersonIcon/>
    },
    weight_increase:{
      message:"근증가",
      css_style:"badge badge-success",
      icon:<PersonAddAlt1Icon/>
    }
  }

  const Pstyled=styled('p')((props)=>({
    fontSize:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0"
}))

  useEffect(()=>{
    set_break_time({
      ...break_time,
      min:parseInt(exercise.break_time/60),
      sec:exercise.break_time%60
    });
    let exercise_info_storage=localStorage.getItem(exercise.eng_name);
    let tmp;//뽑아올 대상-정보로부터
    let last_from_storage;
    let new_from_storage;
    let gap;

    if(JSON.parse(exercise_info_storage)===null){//금일 해당 운동을 시작 안 했을때-기존데이터 유무에따라서 데이터 없음 및 마지막 중량,개수,시간만 보여줌
      if(exercise.eng_name==="plank"){
        tmp=exercise.Info_from_api.target_time;//시간

        if(tmp===null){//즉 애초에 아무데이터가 없는 첫 운동일 경우-데이터가 없습니다
          set_result_value({
            ...result_value,
            last:"",
            new:"",
            gap:""
          });//보여줄 수 있는 데이터가 없음
        }
        else{//해보긴 해서 마지막 기록 데이터 있을 때
          key_for_unit.current="etc";

          let format=tmp.split(":");
            if(format[1]==="00"){
                set_result_value({
                  ...result_value,
                  last:format[2]+"초",
                  new:"",
                  gap:""
                })
            }
            else{
                set_result_value({
                  ...result_value,
                  last:format[1]+"분"+format[2]+"초",
                  new:"",
                  gap:""
                })
            }
        }
        
      }
      else if(exercise.eng_name==="seated_knees_up"||exercise.eng_name==="crunch"){
        tmp=exercise.Info_from_api.target_cnt;//개수
        if(tmp===null){//즉 애초에 아무데이터가 없는 첫 운동일 경우-데이터가 없습니다
          set_result_value({
            ...result_value,
            last:"",
            new:"",
            gap:""
          });//보여줄 수 있는 데이터가 없음
        }
        else{
          key_for_unit.current="count_demand";
          set_result_value({
            ...result_value,
            last:tmp,
            new:"",
            gap:""
          })
        }
      }
      else{
        tmp=exercise.Info_from_api.target_kg;//중량
        if(tmp===0){//중량 정보가 없다
          set_result_value({
            ...result_value,
            last:"",
            new:"",
            gap:""
          });//보여줄 수 있는 데이터가 없음
        }
        else{
          if(exercise.eng_name==="pec_dec_fly"||exercise.eng_name==="lat_pull_down"||exercise.eng_name==="seated_row"||exercise.eng_name==="reverse_pec_dec_fly"||exercise.eng_name==="cable_push_down"||exercise.eng_name==="arm_curl"||exercise.eng_name==="leg_extension"){
            key_for_unit.current="pound_demand";
          }
          else{
            key_for_unit.current="weight_demand";
          }
          set_result_value({
            ...result_value,
            last:tmp,
            new:"",
            gap:""
          })
        }
      }

      
    }
    else{//금일 운동을 해서 신상 데이터가 있을 때-localstorage에서 가져와 쓴다
      last_from_storage=JSON.parse(exercise_info_storage).last;
      new_from_storage=JSON.parse(exercise_info_storage).new;

      gap=parseInt(new_from_storage)-parseInt(last_from_storage);//전과 현재의 차

      if(gap>0){//근증가
        key_for_gap.current="weight_increase";
        tmp_sign.current="+";
      }
      else if(gap===0){//근유지
        key_for_gap.current="weight_same";
        tmp_sign.current="";
      }
      else{//근손실
        key_for_gap.current="weight_lose";
        tmp_sign.current="-";
      }

      if(exercise.eng_name==="plank"){
        let last_tmp_min=parseInt(last_from_storage)/60;
        let last_tmp_sec=parseInt(last_from_storage)%60;
        let new_tmp_min=parseInt(new_from_storage)/60;
        let new_tmp_sec=parseInt(new_from_storage)%60;

        key_for_unit.current="etc";

        set_result_value({
          ...result_value,
          late:last_tmp_min+"분"+last_tmp_sec+"초",
          new:new_tmp_min+"분"+new_tmp_sec+"초",
          gap:gap
        })
      }
      
      else if(exercise.eng_name==="seated_knees_up"||exercise.eng_name==="crunch"){
        key_for_unit.current="count_demand";
        set_result_value({
          ...result_value,
          last:last_from_storage,
          new:new_from_storage,
          gap:gap
        })
      }
      else{
        if(exercise.eng_name==="pec_dec_fly"||exercise.eng_name==="lat_pull_down"||exercise.eng_name==="seated_row"||exercise.eng_name==="reverse_pec_dec_fly"||exercise.eng_name==="cable_push_down"||exercise.eng_name==="arm_curl"||exercise.eng_name==="leg_extension"){
          key_for_unit.current="pound_demand";
        }
        else{
          key_for_unit.current="weight_demand";
        }
        set_result_value({
          ...result_value,
          last:last_from_storage,
          new:new_from_storage,
          gap:gap
        })
      }
    }


  },[])

    return(
        <>
        <Card sx={{ maxWidth: 400 ,marginTop:"1em"}}>
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
                                <Typography sx={{fontWeight:"600"}}>운동레코드</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{"&.MuiAccordionDetails-root":{padding: "0px 2px 2px"}}}>
                                <div className="alert alert-warning" role="alert" style={{padding:"1em 1em",marginTop:"2em",marginBottom:"0em",backgroundColor:"white",borderColor:"white"}}>
                                    <i style={{color:"black"}} className="ni ni-like-2"></i>
                                    <h2 style={{color:"black"}}><strong>{exercise.name} 레코드</strong></h2>
                                    <Stack direction="column" spacing={2}>
                                      {
                                        exercise.eng_name==="side_lateral_raise"
                                        ?
                                          <span className="badge badge-default btn-lg" style={spanStyle}>세트당 개수:20개</span>
                                        :(exercise.eng_name==="plank"
                                          ?
                                          null
                                          :
                                          <span className="badge badge-default btn-lg" style={spanStyle}>세트당 개수:12개</span>
                                        )
                                      }
                 
                                    <span className="badge badge-default btn-lg" style={spanStyle}>세트당 휴식시간:{break_time.min}분{break_time.sec}초</span> 

                
                                    {
                                      result_value.last===""
                                      &&
                                      <div className="alert alert-danger" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                                        <Pstyled bold="ligther">
                                          <WarningAmberIcon/>해당 운동을 한 데이터가 없습니다
                                        </Pstyled>
                                      </div>
                                    }
                                    {
                                      (result_value.last!==""&&result_value.new===""&&result_value.gap==="")
                                      &&
                                      <>
                                        <Stack direction="row" spacing={1} sx={{justifyContent:"space-around"}}>
                                          <span className="badge badge-default btn-lg" style={spanStyle}>마지막{unit[key_for_unit.current].message}:{result_value.last}{unit[key_for_unit.current].unit}</span>  
                                        </Stack>
                                        <div className="alert alert-warning" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                                          <Pstyled bold="ligther">
                                            <ErrorIcon/>금일 운동을 실시하지 않았습니다
                                          </Pstyled>
                                        </div>
                                      </>
                                    }
                                    {
                                      (result_value.last!==""&&result_value.new!==""&&result_value.gap!=="")
                                      &&
                                      <>
                                        <Stack direction="row" spacing={1} sx={{justifyContent:"space-around"}}>
                                          <span className="badge badge-default btn-lg" style={spanStyle}>마지막{unit[key_for_unit.current].message}:{result_value.last}{unit[key_for_unit.current].unit}</span> 
                                          <span className="badge badge-default btn-lg" style={spanStyle}>오늘{unit[key_for_unit.current].message}:{result_value.new}{unit[key_for_unit.current].unit}</span> 
                                        </Stack>

                                        <span className={gap_message[key_for_gap.current].css_style} style={{fontSize:"1.5em",marginTop:"2em"}}>{gap_message[key_for_gap.current].icon}{gap_message[key_for_gap.current].message}{result_value.gap===0?null:tmp_sign.current+result_value.gap+unit[key_for_unit.current].unit}</span>
                                      </>
                                    }
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