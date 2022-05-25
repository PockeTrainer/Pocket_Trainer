import React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import Stack from '@mui/material/Stack';


import { styled } from "@mui/system";

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ScaleIcon from '@mui/icons-material/Scale';

import axios from 'axios';

import { set_info_from_dayinfo } from '../../modules/action';
import { useDispatch } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const rendering=(start,end,unit)=>{//체중을 쭈욱 랜더링해줌
    const result=[];
    let i=1;
    for(let i=start;i<=end;i++){
      result.push(<MenuItem  key ={i+unit} value={i}>{i+unit}</MenuItem>)
    }
    return result;
  };

export default function UpdateWeight({open_state,set_open_state,current_day_weight,clicked_date}) {
  const dispatch=useDispatch();
  const id=sessionStorage.getItem("user_id");
  const [open, setOpen] = useState(false);//모달창 열고 닫기

  const [weight,setWeight]=useState(current_day_weight===null?30:current_day_weight);//최근 몸무게로 설정해줌
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    set_open_state(false);
  };


  const handleChange = (event) => {//체중업데이트
    setWeight(event.target.value);
  };
 

  const Pstyled=styled('p')((props)=>({
    fontSize:props.size==="big"?"1.5rem":"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0"
}))

const update_weight_info=async()=>{
    await axios.post(`
    http://127.0.0.1:8000/user/dayInfo/${clicked_date.year+"-"+clicked_date.month+"-"+clicked_date.days}/${id}`,
    {
        weight:weight
    })//새롭게 업데이트 된 무게를 api로 전송
        .then((res) => {
            console.log(res.data);

      
        }).catch((err) => {
            console.log(err)
        })
    handleClose();//업데이트가 됐으면 다시 닫아주기
    get_today_info();//신상정보를 다시 가져와 리덕스에 올리기
}

const get_today_info=async()=>{//체중정보를 보냈으면 새롭게 온 서버결과를 다시 리덕스에 올려놓자
    await axios.get(`/history/day/${clicked_date.year+"-"+clicked_date.month+"-"+clicked_date.days}/${id}`)//클릭한 날짜의 오늘날의 최신정보를 가져와준다
    .then((res) => {
        console.log(res.data);

        dispatch(set_info_from_dayinfo(res.data));//받은 정보를 리덕스에 올리자
    }).catch((err) => {
        console.log(err)
    })
}   

const paperStyle={
    backgroundColor:"white !important",
    color:"#212529 !important"
};


const InputLabelStyle={
    color:"rgb(0 0 0 / 75%)",
    fontWeight:"600",
    fontFamily:"Noto Sans KR"
  }

  const OutlinedLabelStyle={
    fontFamily:"Noto Sans KR"
  }

  const HelperStyle={
    fontFamily:"Noto Sans KR",
    fontWeight:"500",
    color:"black"
  };

const how_many_Style={
    margin:"0px 5rem"
}



useEffect(()=>{
    if(open_state){
        handleClickOpen();
    }
},[open_state])

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
        <DialogTitle sx={{color:"#212529",fontWeight:"600"}}>체중변경</DialogTitle>
        <DialogContent >
            <Stack direction="column" spacing={3} sx={{alignItems:"center"}}>

            <div className="alert alert-secondary" role="alert" style={{padding:"1rem 1rem",marginBottom:"0em",backgroundColor:"rgb(213 213 213 / 55%)"}}>
                    <span className="badge badge-pill badge-secondary" style={{color:"black"}}>kg단위</span>
                    <h2 style={{color:"black",fontWeight:"600",marginBottom:"2rem"}}><ScaleIcon/>체중</h2>
                    <FormControl sx={{  minWidth: 80 }}>
                      <InputLabel id="demo-simple-select-autowidth-label_1" sx={InputLabelStyle}>체중입력</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label_1"
                        id="demo-simple-select-autowidth_1"
                        value={weight}
                        onChange={handleChange}
                        autoWidth
                        label="weight"
                        inputProps={{sx:OutlinedLabelStyle}}
                        MenuProps={{sx:{".MuiMenu-paper":{backgroundColor:"#2dce89 !important"}}}}
                      >
  
                        {rendering(30,150,"kg")}
                      </Select>
                      <FormHelperText sx={HelperStyle}>회원님의 현재체중을 입력해주세요</FormHelperText>
                    </FormControl>
            </div>
                 
               
            </Stack>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >취소</Button>
          <Button onClick={update_weight_info} >완료</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
