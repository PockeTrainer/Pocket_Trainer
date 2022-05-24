import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CloseIcon from '@mui/icons-material/Close';

import { very_hard } from '../../modules/action';
import { hard } from '../../modules/action';
import { proper } from '../../modules/action';
import { easy } from '../../modules/action';
import { very_easy } from '../../modules/action';
import { error } from '../../modules/action';

import { useDispatch,useSelector } from 'react-redux';


const first_actions = [
  { icon: <LooksOneIcon sx={{"&.MuiSvgIcon-root":{fontSize:"2.0rem"}}}/>, name: '매우쉬움' },
  { icon: <LooksTwoIcon sx={{"&.MuiSvgIcon-root":{fontSize:"2.0rem"}}}/>, name: '쉬움' },
  { icon: <Looks3Icon sx={{"&.MuiSvgIcon-root":{fontSize:"2.0rem"}}}/>, name: '적절함' },
  { icon: <Looks4Icon sx={{"&.MuiSvgIcon-root":{fontSize:"2.0rem"}}}/>, name: '무거움' },
  { icon: <Looks5Icon sx={{"&.MuiSvgIcon-root":{fontSize:"2.0rem"}}}/>, name: '매우무거움' }
];

const second_actions = [
  { icon: <LooksTwoIcon sx={{"&.MuiSvgIcon-root":{fontSize:"2.0rem"}}}/>, name: '쉬움' },
  { icon: <Looks3Icon sx={{"&.MuiSvgIcon-root":{fontSize:"2.0rem"}}}/>, name: '적절함' },
  { icon: <Looks4Icon sx={{"&.MuiSvgIcon-root":{fontSize:"2.0rem"}}}/>, name: '무거움' }
];

const actions={
  true:first_actions,
  false:second_actions
}

export default function SpeedDialTooltipOpen({now_exercise,is_First}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const current_info=useSelector(state=>state.change_current_weight_reducer);//현재 체크정보를 가져온다ex)중량,시간,개수
  const {current_weight,current_time,current_cnt}=current_info;
  const dispatch=useDispatch();//현재무게들을 업데이트할 예정

  console.log(now_exercise.name)

  const handleGradeButton=(button_name)=>{
    if(button_name==="매우쉬움"){
      if(now_exercise.eng_name==="plank"){
        dispatch(very_easy(0,10,0));//플랭크는 10초가 단위임
      }
      else if(now_exercise.eng_name==="seated_knees_up"||now_exercise.eng_name==="crunch"){
        dispatch(very_easy(0,0,2));//크런치,싯티드니업은 단위가 2개씩임
      }
      else{
        dispatch(very_easy(now_exercise.unit_kg,0,0));//나머지 운동들은 단위중량이 좀 다를 수 있음
      }
    }
    else if(button_name==="쉬움"){
      if(now_exercise.eng_name==="plank"){
        dispatch(easy(0,10,0));//플랭크는 10초가 단위임
      }
      else if(now_exercise.eng_name==="seated_knees_up"||now_exercise.eng_name==="crunch"){
        dispatch(easy(0,0,2));//크런치,싯티드니업은 단위가 2개씩임
      }
      else{
        dispatch(easy(now_exercise.unit_kg,0,0));//나머지 운동들은 단위중량이 좀 다를 수 있음
      }
    }
    else if(button_name==="적절함"&&current_weight>0&&current_time>0&&current_cnt>0){//0키로 일때에 운동을 진행하는 건 좀 이상하자나,,,
      dispatch(proper());
    }
    else if(button_name==="무거움"&& current_weight-(now_exercise.unit_kg)>0&&current_time-10>0&&current_cnt-2>0){
      if(now_exercise.eng_name==="plank"){
        dispatch(hard(0,10,0));//플랭크는 10초가 단위임
      }
      else if(now_exercise.eng_name==="seated_knees_up"||now_exercise.eng_name==="crunch"){
        dispatch(hard(0,0,2));//크런치,싯티드니업은 단위가 2개씩임
      }
      else{
        dispatch(hard(now_exercise.unit_kg,0,0));//나머지 운동들은 단위중량이 좀 다를 수 있음
      }
    }
    else if(button_name==="매우무거움" && current_weight-(now_exercise.unit_kg)*2>0&&current_time-20>0&&current_cnt-4>0){
      if(now_exercise.eng_name==="plank"){
        dispatch(very_hard(0,10,0));//플랭크는 10초가 단위임
      }
      else if(now_exercise.eng_name==="seated_knees_up"||now_exercise.eng_name==="crunch"){
        dispatch(very_hard(0,0,2));//크런치,싯티드니업은 단위가 2개씩임
      }
      else{
        dispatch(very_hard(now_exercise.unit_kg,0,0));//나머지 운동들은 단위중량이 좀 다를 수 있음
      }
    }
    else{
      // 무게가 뺄 수 없는 상황일때의 오류상황
      dispatch(error());
    }
    handleClose();
  }

  const boxStyle={
    height: 330,
    transform: 'translateZ(0px)',
    flexGrow: 1,
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "100%",
    zIndex:"99999999"

  }

  const speedDialStyle={
    ".MuiSpeedDial-fab:hover":{backgroundColor:"#5e72e4"},
    ".MuiSpeedDial-fab":{backgroundColor:"#5e72e4"},
    position: 'absolute',
    bottom: 16,
    right: 16 
  }
  const speedDialActionStyle={
    ".MuiSpeedDialAction-fab":{backgroundColor:"#5e72e4",color:"white",width:"45px",height:"45px"},
    ".MuiSpeedDialAction-staticTooltipLabel":{backgroundColor:"#5e72e4b8",color:"white",fontFamily:"Noto Sans KR",fontWeight:"600"}
  }

  return (
    <Box sx={boxStyle}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={speedDialStyle}
        icon={<SpeedDialIcon icon={<MonitorHeartIcon/>} openIcon={<CloseIcon/>} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions[is_First].map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={()=>handleGradeButton(action.name)}
            sx={speedDialActionStyle}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
