import React,{useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

import HeightRoundedIcon from '@mui/icons-material/HeightRounded';
import ScaleIcon from '@mui/icons-material/Scale';


function HeightAndWeight({update_func,value_list}){
    const [InputState,setInputState]=useState({
      height:value_list.height,
      weight:value_list.weight
    });
  
    const handleChange = (event,child) => {
      console.log(child.props.select)
      setInputState({
        ...InputState,
        [child.props.select]:event.target.value
      });
      update_func({
        ...value_list,
        [child.props.select]:event.target.value
      });
    };
  
    const rendering=(end,select_id,unit)=>{//몸무게와 체중을 쭈욱 랜더링해줌
      const result=[];
      let i=1;
      for(let i=30;i<=end;i++){
        result.push(<MenuItem select={select_id} key ={i} value={i}>{i+unit}</MenuItem>)
      }
      return result;
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
  
    return(
      <div className="card" style={{textAlign:"center"}} >
              <div className="card-body">
                  <i className="fas fa-id-card" style={{fontSize:"3rem",color:"#5e72e4"}}></i>
                  <h2 className="text-gray-dark display-4" >신체정보입력</h2>
                  <hr></hr>
                  <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em",backgroundColor:"#rgb(213 213 213 / 55%)"}}>
                      <span className="badge badge-pill badge-secondary" style={{color:"black"}}>cm단위</span>
                      <h2 style={{color:"black",fontWeight:"600"}}><HeightRoundedIcon/>신장</h2>
                      <FormControl sx={{  minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-autowidth-label" sx={InputLabelStyle}>신장입력</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={InputState.height}
                          onChange={handleChange}
                          autoWidth
                          label="Height"
                          inputProps={{sx:OutlinedLabelStyle}}
                          MenuProps={{sx:{".MuiMenu-paper":{backgroundColor:"#2dce89 !important"}}}}
                        >
                        {rendering(200,"height","cm")}
                        </Select>
                        <FormHelperText sx={HelperStyle}>회원님의 신장을 입력해주세요</FormHelperText>
                      </FormControl>
                  </div>
                  
  
                  <hr></hr>
                  <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em",backgroundColor:"rgb(213 213 213 / 55%)"}}>
                    <span className="badge badge-pill badge-secondary" style={{color:"black"}}>kg단위</span>
                    <h2 style={{color:"black",fontWeight:"600"}}><ScaleIcon/>체중</h2>
                    <FormControl sx={{  minWidth: 80 }}>
                      <InputLabel id="demo-simple-select-autowidth-label_1" sx={InputLabelStyle}>체중입력</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label_1"
                        id="demo-simple-select-autowidth_1"
                        value={InputState.weight}
                        onChange={handleChange}
                        autoWidth
                        label="weight"
                        inputProps={{sx:OutlinedLabelStyle}}
                        MenuProps={{sx:{".MuiMenu-paper":{backgroundColor:"#2dce89 !important"}}}}
                      >
  
                        {rendering(150,"weight","kg")}
                      </Select>
                      <FormHelperText sx={HelperStyle}>회원님의 현재체중을 입력해주세요</FormHelperText>
                    </FormControl>
                  </div>
                 
  
              </div>
        </div>
    );
  }
  export default HeightAndWeight