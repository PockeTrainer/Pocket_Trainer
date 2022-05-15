import React,{useState,useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';
import EachExerciseMainPhoto from "./EachExerciseMainPhoto";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { styled } from "@mui/system";

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

import Checkbox from '@mui/material/Checkbox';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Grow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { push_what_i_want_exercise,pop_what_i_want_exercise } from '../../../modules/action';

const label = { inputProps: { 'aria-label': '즐겨찾기 추가' } };

function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

String.prototype.cut = function(len) {

    var str = this;
    var s = 0;
    for (var i=0; i<str.length; i++) {
    s += (str.charCodeAt(i) > 128) ? 2 : 1;
    if (s > len) return str.substring(0,i);
    }
    return str;
  
  }


export default function ExerciseDetails(){

    const extra_routine=useSelector(state=>state.update_extra_exercise_reducer);//추가운동 페이지의 전체 정보가져오기
    console.log(extra_routine);
    const {what_i_want_exercise,favorite,clicked_part}=extra_routine;

    const [checked, setChecked] = useState(false);//transition

    const dispatch=useDispatch();


    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    useEffect(()=>{
        sleep(1000).then(()=>handleChange());
    },[])


    const [checkbox_checked,set_checkbox_checked]=useState(what_i_want_exercise.indexOf(clicked_part)>=0);//운동체크여부
    const handleCheckBox=()=>{
        if(checkbox_checked){//체크된 상태에서->안된상태
            let tmp_list=[...what_i_want_exercise];
            tmp_list.splice(what_i_want_exercise.indexOf(clicked_part),1)
            dispatch(pop_what_i_want_exercise(tmp_list)) 
          }
          else{//체크 안된상태에서->된상태
            dispatch(push_what_i_want_exercise(clicked_part))//운동객체 담기
          }
          set_checkbox_checked(prev=>!prev);
    }

    const Pstyled=styled('p')((props)=>({
        fontSize:props.size==="normal"?"1.0rem":"1.5rem",
        fontWeight:props.bold=="lighter"?"lighter":"600",
        lineWeight:"1.0",
        marginBottom:"0",
        display:props.display==="flex"?"flex":"",
        alignItems:props.display==="flex"?"center":""
    }));

    const AvatarStyleCss={
        fontFamily:"Noto Sans KR !important",
        backgroundColor:"#5e72e4",
        "&.MuiChip-avatar":{
            color:"white",
            fontWeight:"600"
        }
    }

    const AvatarBesideExercsieNameStyle={
        backgroundColor:"#2dce89",
        color:"black",
        width:"2rem",
        height:"2rem"
    }

    console.log(clicked_part)

    return(
        <>

        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}>
            <div>
            <EachExerciseMainPhoto exercise_obj={clicked_part} where="Details"/>
            <Chip avatar={<Avatar sx={AvatarStyleCss}>{clicked_part.part.cut(2)}</Avatar>} label={clicked_part.part+"운동"} sx={{".MuiChip-label":{fontWeight:"600"},marginBottom:"1.0rem"}} />

            <Stack direction="row" justifyContent={"space-between"}>
                <Stack direction="row" sx={{alignItems:"center"}} >
                    <Avatar sx={AvatarBesideExercsieNameStyle}>
                            <FitnessCenterIcon sx={{color:"black"}}/>
                        </Avatar>
                    <Pstyled bold="etc" display="etc" size="big">
                        {clicked_part.name}
                    </Pstyled>
                </Stack>
                <Stack direction="row" >
                    <Checkbox checked={checkbox_checked} onChange={handleCheckBox} sx={{padding:"0"}} {...label} icon={<CheckCircleOutlineIcon sx={{fontSize:"2.5rem",margin:"0.1rem",color:"#7d7d7d"}}/>} checkedIcon={<CheckCircleIcon sx={{fontSize:"2.5rem",color:"#2dce89"}} />} />
                    <Checkbox {...label} icon={<BookmarkBorderIcon sx={{fontSize:"2.5rem"}}/>} checkedIcon={<BookmarkAddedIcon sx={{fontSize:"2.5rem",color:"#2dce89"}}/>} />
                </Stack>
                
            </Stack>
            
            <div className="alert alert-secondary" role="alert" style={{padding:"0.5em 0.5em",marginBottom:"0em",backgroundColor:"#f5f5f5"}}>
                <Pstyled bold="lighter" size="normal">
                    {clicked_part.instruction}
                </Pstyled>
            </div>

            <Pstyled bold="etc" size="normal" display="flex">
                <WrongLocationIcon sx={{fontSize:"1.5rem",color:"#5e72e4"}}/>잘못된 경우
            </Pstyled>
            <div className="alert alert-primary" role="alert" style={{padding:"0.5em 0.5em",marginBottom:"0em"}}>
                <Pstyled bold="lighter" size="normal">
                    {
                        clicked_part.wrong_pose_1
                    }
                </Pstyled>
                <Pstyled bold="lighter" size="normal">
                    {
                        clicked_part.wrong_pose_2
                    }
                </Pstyled>
            </div>
            </div>
        </Grow>
        </>
    );
}