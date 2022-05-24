import React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import Stack from '@mui/material/Stack';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

import { styled } from "@mui/system";

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EachDialog({open_state,open_state_func,clicked_idx,clicked_food_when_list,clicked_food_func,how_many_people_default}) {//열리는 여부,부모 state를 바꿔주는 함수,눌린음식의 객체정보,디폴트 인분수
  const [open, setOpen] = useState(false);
  const [how_many_people,set_how_many_people]=useState(how_many_people_default);//인분을 담당
  const [gram_mode,set_gram_mode]=useState(false);//그램모드로 입력을 할지 나눠줌

  const [gram_weight, set_gram_weight] = useState(0);//몇 그램인지를 나타냄

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGramWeight=(event)=>{//입력된 그램 
      set_gram_weight(event.target.value);

  }

  const Pstyled=styled('p')((props)=>({
    fontSize:props.size==="big"?"1.5rem":"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0"
}))

const handleGramMode=()=>{
    set_gram_mode(prev=>!prev);
}

const handle_howMany=(where)=>{

    if(where==="increase"){
        set_how_many_people(prev=>prev+1);
    }
    else{
        if(how_many_people!=1){
            set_how_many_people(prev=>prev-1);

        }
    }
}

const update_info=()=>{
    if(gram_mode){
        let tmp=[...clicked_food_when_list];
        tmp[clicked_idx].gram=gram_weight;
        tmp[clicked_idx].how_many_people=Math.round(gram_weight/parseInt(tmp[clicked_idx].Info_from_api.SERVING_SIZE));//인분수는 그램수를 기본단위량으로 나눈 값을 반올림시킴
        clicked_food_func(tmp);
    }
    else{
        let tmp=[...clicked_food_when_list];
        tmp[clicked_idx].how_many_people=how_many_people;
        tmp[clicked_idx].gram=parseInt(tmp[clicked_idx].Info_from_api.SERVING_SIZE)*how_many_people;//기본단위그램*인분수
        clicked_food_func(tmp);
    }
    open_state_func(false);//다시 닫아주게 만든다
}


useEffect(()=>{
    if(open_state){
        console.log("hi")
        handleClickOpen();
        set_how_many_people(clicked_food_when_list[clicked_idx].how_many_people);//따로 디폴트값의 변경이 없다면 원래 저잗되어 있던 인분 수로 세팅
        set_gram_weight(clicked_food_when_list[clicked_idx].gram);//원래 저장되어 있던 그램수로 세팅
    }
    else{
        handleClose();
        set_gram_mode(false);
        set_gram_weight(0);
    }
},[open_state])



const paperStyle={
    backgroundColor:"white !important",
    color:"#212529 !important"
};

const FormControllStyle={
    position:"absolute",
    right:"0",
    bottom:"7rem"
}

const gramStyle={
    margin:"0px 1rem"
}

const how_many_Style={
    margin:"0px 5rem"
}

console.log(how_many_people_default);
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="섭취변경모달창"
        PaperProps={{sx:paperStyle}}
      >
        <DialogTitle sx={{color:"#212529",fontWeight:"600"}}>섭취양 변경</DialogTitle>
        <DialogContent sx={gram_mode?gramStyle:how_many_Style}>
            <Stack direction="column" spacing={3} sx={{alignItems:"center"}}>
                <Stack direction="row" spacing={1}>
                    <Pstyled  bold="etc">{gram_mode===true?"그램":"인분"}</Pstyled>
                    <FormControlLabel
                        control={<Switch color="default" />}
                        label="그램입력"
                        checked={gram_mode}
                        onChange={handleGramMode}
                        sx={FormControllStyle}
                    />
                </Stack>
  
                {
                    gram_mode===true
                    ?
                        <>
                            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                                <Input
                                    id="standard-adornment-weight"
                                    value={gram_weight}
                                    onChange={handleGramWeight}
                                    endAdornment={<InputAdornment position="end">g</InputAdornment>}
                                    aria-describedby="그램입력"
                                    inputProps={{
                                    'aria-label': 'weight',
                                    }}
                                />
                                <FormHelperText sx={{fontFamily:"Noto Sans KR"}} id="standard-weight-helper-text">섭취그램(g)</FormHelperText>
                            </FormControl>
                        </>
                    :
                    <>
                            <Stack direction="row" spacing={1} sx={{justifyContent:"center"}}>
                                    <IconButton aria-label="decrease" onClick={()=>handle_howMany("decrease")} >
                                        <RemoveCircleIcon sx={{fontSize:"1.5rem"}}/>
                                    </IconButton>
                                    <Pstyled size="big" bold="etc">{how_many_people}</Pstyled>
                                    <IconButton aria-label="increase" onClick={()=>handle_howMany("increase")}  >
                                        <AddCircleIcon sx={{fontSize:"1.5rem"}}/>
                                    </IconButton>
                    
                            </Stack>
                    </>

                }
            </Stack>


        </DialogContent>
        <DialogActions>
          <Button onClick={()=>open_state_func(false)}>취소</Button>
          <Button onClick={update_info}>완료</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
