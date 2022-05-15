import React,{useState} from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Checkbox from '@mui/material/Checkbox';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch,useSelector } from 'react-redux';
import { next_extra_tab_page,clicked_part_name,push_what_i_want_exercise,pop_what_i_want_exercise } from '../../../modules/action';

export default function EachExerciseCard({exercise_obj}) {

  const dispatch=useDispatch();

  const extra_routine=useSelector(state=>state.update_extra_exercise_reducer);//추가운동 페이지의 전체 정보가져오기
  const {what_i_want_exercise,favorite}=extra_routine;

  const goto_detail=()=>{
    dispatch(clicked_part_name(exercise_obj));
    dispatch(next_extra_tab_page());
  };

  const label = { inputProps: { 'aria-label': '루틴에 담을 여부' } };

  const ItemListTitle={
    ".MuiImageListItemBar-title":{fontWeight:"600"}
  }

  const [checked,set_checked]=useState(what_i_want_exercise.indexOf(exercise_obj)>=0);//운동체크여부
  const handleChange=()=>{
    if(checked){//체크된 상태에서->안된상태
      let tmp_list=[...what_i_want_exercise];
      tmp_list.splice(what_i_want_exercise.indexOf(exercise_obj),1)
      dispatch(pop_what_i_want_exercise(tmp_list)) 
    }
    else{//체크 안된상태에서->된상태
      dispatch(push_what_i_want_exercise(exercise_obj))//운동객체 담기
    }
    set_checked(prev=>!prev);
  }

  return (
        <ImageListItem >
          <img
            src={exercise_obj.image_url}
            alt={exercise_obj.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={exercise_obj.name}
            subtitle={exercise_obj.part+"운동"}
            actionIcon={
                <>
              <Checkbox checked={checked} onChange={handleChange} sx={{padding:"0"}} {...label} icon={<CheckCircleOutlineIcon sx={{margin:"0.1rem",color:"white"}}/>} checkedIcon={<CheckCircleIcon sx={{color:"#2dce89"}} />} />
              <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)',padding:"0" }}
              aria-label={`info about `}
              onClick={goto_detail}
            >
              <ContactSupportIcon sx={{margin:"0.1rem",color:"white"}} />
            </IconButton>
            </>
            }
            sx={ItemListTitle}
          />
        </ImageListItem>
  );
}


