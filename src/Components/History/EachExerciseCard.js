import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ChartGraph from './Chart';
import { styled } from '@mui/system';
import Collapse from '@mui/material/Collapse';
import ErrorIcon from '@mui/icons-material/Error';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import BoltIcon from '@mui/icons-material/Bolt';

import axios from 'axios';

export default function EachExerciseCard({exercise_obj,clicked_date}) {
  

  const id=sessionStorage.getItem("user_id");
  const [checked, setChecked] = useState(false);//밑에 그래프 여는용도
  const [result_obj,set_result_obj]=useState({
    target_value:"",
    start_datetime:new Date(),
    end_datetime:new Date(),
    unit_name:""
  });//최종적으로 보여주는 중량,개수,시간+운동시작시간+끝시간

  const [latest_info,set_latest_info]=useState({//api로부터 받아온 최근날짜 및 타겟값들을 가져옴
    date_list:[],
    target_list:[]
  })

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const Pstyled=styled('p')((props)=>({
    fontSize:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
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
        lineHeight:"1.535",
        fontWeight:"600",
        color:"white"
    }

    const ButtonStyle={
        fontFamily:"Noto Sans KR",
        fontSize:"0.975rem",
        fontWeight:"600",
        color:"#5e72e4"
    }

    const get_latest_workout_info=async()=>{//서버로부터 운동정보 가져오기
      await axios.get(`/history/day/${clicked_date.year+"-"+clicked_date.month+"-"+clicked_date.days}/${exercise_obj.eng_name}/${id}`)
        .then((res) => {
         
          console.log(res.data);

          set_latest_info({
            ...latest_info,
            date_list:res.data.workout_graph.clearworkout_date_lst,
            target_list:res.data.workout_graph.clearworkout_target_lst
          })
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
      let unit_name;
      let result;
      let target_value;
      let start_datetime;
      let end_datetime;

      get_latest_workout_info();//서버로부터 누른 해당일을 기준으로 최근운동일 4일치 가져오기

      if(exercise_obj.eng_name==="plank"){
        if(exercise_obj.Info_from_api.target_time===null){
          result="미정";
        }
        else{
          target_value=exercise_obj.Info_from_api.target_time;
          let tmp_list=target_value.split(":");
          
          result=tmp_list[1]+"분"+tmp_list[2]+"초";
          unit_name="시간";
        }
      }
      else if(exercise_obj.eng_name==="seated_knees_up"||exercise_obj.eng_name==="crunch"){
        if(exercise_obj.Info_from_api.target_cnt===null){
          result="미정";
        }
        else{
          target_value=exercise_obj.Info_from_api.target_cnt;
          result=target_value+"개";
          unit_name="개수"
        }
      }
      else if(exercise_obj.eng_name==="pec_dec_fly"||exercise_obj.eng_name==="lat_pull_down"||exercise_obj.eng_name==="seated_row"||exercise_obj.eng_name==="reverse_pec_dec_fly"||exercise_obj.eng_name==="cable_push_down"||exercise_obj.eng_name==="arm_curl"||exercise_obj.eng_name==="leg_extension"){
        if(exercise_obj.Info_from_api.target_kg===0){
          result="미정";
        }
        else{
          target_value=exercise_obj.Info_from_api.target_kg;
          result=target_value+"Lbs";
          unit_name="중량";
        }
      }
      else{//벤치프레스같은 운동 중량
        if(exercise_obj.Info_from_api.target_kg===0){
          result="미정";
        }
        else{
          target_value=exercise_obj.Info_from_api.target_kg;
          result=target_value+"Kg";
          unit_name="중량";
        }
      }

      if(exercise_obj.Info_from_api.start_datetime===null){//운동시작시간이 없다면
        start_datetime=null;
        end_datetime=null;
      }
      else{
        start_datetime=new Date(exercise_obj.Info_from_api.start_datetime);
        end_datetime=new Date(exercise_obj.Info_from_api.end_datetime);
      }
      set_result_obj({
        ...result_obj,
        target_value:result,
        start_datetime:start_datetime,
        end_datetime:end_datetime,
        unit_name:unit_name
      })

    },[exercise_obj])

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#2dce89b3',marginTop:"2rem"}}>
      <Box sx={{ my: 1, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div" sx={BigTitle}>
              {exercise_obj.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div" sx={{fontWeight:"lighter"}}>
              {result_obj.target_value}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
            {exercise_obj.musclePart} 발달 운동
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ m: 2,mb:0 }}>
        <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em",textAlign:"center"}}>
          {
            result_obj.start_datetime===null
            ?
              <>
                <Pstyled bold="etc">
                  <ErrorIcon />운동을 한 기록이 없습니다
                </Pstyled>
              </>
            :
              <>
                <span className="badge badge-default btn-lg" style={spanStyle}><WatchLaterIcon />시작시간:{result_obj.start_datetime.getHours()}시 {result_obj.start_datetime.getMinutes()}분</span>
                <span className="badge badge-default btn-lg" style={{...spanStyle,marginBottom:"1.5rem"}}><WatchLaterIcon />종료시간:{result_obj.end_datetime.getHours()}시 {result_obj.end_datetime.getMinutes()}분</span>
                {
                  exercise_obj.Info_from_api.workout_kcal_consumption===null
                  ?
                  <>
                    <Pstyled bold="lighter">
                      <BoltIcon sx={{color:"#ffc107"}}/>1세트 시작 전에 종료..
                    </Pstyled>
                  </>
                  :
                  <>
                    <Pstyled bold="lighter">
                      <BoltIcon sx={{color:"#ffc107"}}/>{exercise_obj.Info_from_api.workout_kcal_consumption}Kcal 소모
                    </Pstyled>
                  </>
                }
                
              </>
          }
          
        </div>
        <Typography gutterBottom variant="body1">
          최근운동일 
        </Typography>
        <Stack direction="row" spacing={1}>
          {
            latest_info.date_list.length>0
            ?
              latest_info.date_list.map((date,index)=>{
                let tmp_date=new Date(date);//날짜 객체로 선언
                return(
                  <>
                    <Chip label={parseInt(tmp_date.getMonth()+1)+"/"+tmp_date.getDate()} />
                  </>
                );
              })
            :
              <Chip label={"최근운동일 없음"} /> 
            
          }
        </Stack>
        <Collapse in={checked}>
          <div>
            {
              latest_info.target_list.length===0 && result_obj.target_value==="미정"
              ?
              <>
                 <div className="alert alert-warning" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                    <Pstyled bold="ligther">
                      <ErrorIcon/>해당 운동 데이터가 없습니다
                    </Pstyled>
                  </div>
              </>
              :
              <>
                <ChartGraph unit_name={result_obj.unit_name}  clicked_date={clicked_date} target_list={latest_info.target_list} date_list={latest_info.date_list} today_target_value={result_obj.target_value}/>
              </>
            }
            
          </div>
        </Collapse>
        
      </Box>
      <Box sx={{ ml: 1, mb: 1 }}>
            <Button variant="outlined" onClick={handleChange} startIcon={<PlayCircleIcon />} sx={{color:"#5e72e4",border: "1px solid #f7fafc",fontFamily:"Noto Sans KR",marginTop:"2rem"}}>
                최근{result_obj.unit_name}변화
            </Button>
      </Box>
    </Box>
  );
}
