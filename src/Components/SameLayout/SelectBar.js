import React,{useState,useEffect, useRef} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectBar(){
    const [age, setAge] = useState('');

    const handleChange = (event) => {//셀렉트바
        setAge(event.target.value);
      };

    const SelectStyle={
        "&.MuiInput-root":{
            fontFamily:"Noto Sans KR",
            fontWeight:"600"
        },
        "&.MuiInput-root:after":{
            borderBottom: "2px solid #2dce89"
        }
    }

    const InputLabelStyle={
        "&.MuiInputLabel-root":{
            fontFamily:"Noto Sans KR",
            fontWeight:"600"
        }
    }
    return(
        <>
               <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="exercises" sx={InputLabelStyle}>Today운동종류</InputLabel>
                                        <Select
                                        labelId="exercises"
                                        id="demo-simple-select-standard"
                                        value={age}
                                        onChange={handleChange}
                                        label="Today운동종류"
                                        sx={SelectStyle}
                                        >
                                        <MenuItem value={10}>벤치프레스</MenuItem>
                                        <MenuItem value={20}>인클라인프레스</MenuItem>
                                        <MenuItem value={30}>펙덱플라이</MenuItem>
                                        </Select>
                </FormControl>
        </>
    );
}
export default SelectBar;