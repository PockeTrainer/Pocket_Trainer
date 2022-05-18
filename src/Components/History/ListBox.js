import React,{useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import {pop_breakfast,pop_dinner,pop_lunch} from "../../modules/action"
import { useDispatch, useSelector } from 'react-redux';
import { styled } from "@mui/system";


//한글 바이트 별로 잘라는 함수
String.prototype.cut = function(len) {

    var str = this;
    var s = 0;
    for (var i=0; i<str.length; i++) {
    s += (str.charCodeAt(i) > 128) ? 2 : 1;
    if (s > len) return str.substring(0,i);
    }
    return str;
  
  }
export default function ListBox(props) {

  const dispatch=useDispatch();
  let foods=useSelector(state=>state.update_meals_reducer);//음식정보 가져오기

//   const [foods,setFoods]=useState([
//     "현미밥",
//     "닭가슴살",
//     "사과",
//     "오리구이",
//     "빵"
//   ]);

if(props.where==="exercise_calander"){

  let target_value;//타겟값
  let result;

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.exercise_list.map((value,index) => {
        if(value.eng_name==="plank"){
          if(value.Info_from_api.target_time===null){
            result="데이터 미설정";
          }
          else{
            target_value=value.Info_from_api.target_time;
            let tmp_list=target_value.split(":");
            
            result="기본시간:"+tmp_list[1]+"분"+tmp_list[2]+"초";
          }
        }
        else if(value.eng_name==="seated_knees_up"||value.eng_name==="crunch"){
          if(value.Info_from_api.target_cnt===null){
            result="데이터 미설정";
          }
          else{
            target_value=value.Info_from_api.target_cnt;
            result="기본개수:"+target_value+"개";
          }
        }
        else if(value.eng_name==="pec_dec_fly"||value.eng_name==="lat_pull_down"||value.eng_name==="seated_row"||value.eng_name==="reverse_pec_dec_fly"||value.eng_name==="cable_push_down"||value.eng_name==="arm_curl"||value.eng_name==="leg_extension"){
          if(value.Info_from_api.target_kg===0){
            result="데이터 미설정";
          }
          else{
            target_value=value.Info_from_api.target_kg;
            result="기본중량:"+target_value+"Lbs";
          }
        }
        else{//벤치프레스같은 운동 중량
          if(value.Info_from_api.target_kg===0){
            result="데이터 미설정";
          }
          else{
            target_value=value.Info_from_api.target_kg;
            result="기본중량:"+target_value+"Kg";
          }
        }

        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value.eng_name}
            secondaryAction={
              value.Info_from_api.is_clear
              ?
              <>
                <CheckCircleIcon sx={{color:"#2dce89"}}/>
              </>
              :
                <>
                  <CancelIcon sx={{color:"#5e72e4"}}/>
                </>
                
            }

            disablePadding
          >
            <ListItemButton onClick={()=>props.set_tmp_list(index)}>
              <ListItemAvatar>
                <Avatar>{value.name.cut(2)}</Avatar>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={value.name} secondary={result} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

else{
  // const popFood=(index)=>{
  //   copy_foods.splice(index,1);
  //   setFoods([...copy_foods]);
  // }


  const meal=props.meal;//아침,점심,저녁
  const change_searchModal_submit_clicked=props.change_searchModal_submit_clicked;//쓰레기통 버튼을 눌렀을 때에만 제거후 서버로 전송되도록

  const Pstyled=styled('p')((props)=>({
    fontSize:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0"
}))
  
  if(meal==="아침"){
    foods=foods.breakfast
  }
  else if(meal==="점심"){
    foods=foods.lunch
  }
  else{
    foods=foods.dinner
  }

  const copy_foods=foods;

  const pop_Food=(index)=>{
    copy_foods.splice(index,1);
    if(meal==="아침"){
      dispatch(pop_breakfast(copy_foods));
    }
    else if(meal==="점심"){
      dispatch(pop_lunch(copy_foods));
    }
    else{
      dispatch(pop_dinner(copy_foods));
    }

    change_searchModal_submit_clicked(true);//눌렀다를 위로 알림

  }
  
console.log("음식정보들:",foods)
;
  return (
    <>
      <span className="badge badge-secondary" style={{fontSize:"1.5em",marginTop:"0.5em",backgroundColor:"#dee2e6",color:"black"}}>{meal}</span>

      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          foods.length===0
          ?
            <Pstyled>
              추가된 음식이 없습니다
            </Pstyled>
          :
            foods.map((value,index) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton aria-label="delete" onClick={pop_Food}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton >
                    <ListItemAvatar>
                      <Avatar>{value.Info_from_api.DESC_KOR.cut(2)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value.Info_from_api.DESC_KOR} secondary={"1회제공량:"+value.Info_from_api.SERVING_SIZE+"g"} />
                  </ListItemButton>
                </ListItem>
              );
            })
        }
      </List>

      
    </>
  );
}
  
}
