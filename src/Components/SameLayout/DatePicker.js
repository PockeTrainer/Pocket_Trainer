import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import koLocale from "date-fns/locale/ko";

export default function ResponsiveDatePickers({changeBirth}) {
  const [value, setValue] = useState(new Date());

  const paperStyle={
    sx:{
        backgroundColor:"white !important",
        color:"#212529 !important"
    }
}

const InputLabelStyle={
  ".MuiInputLabel-root":{
     color:"rgb(0 0 0 / 75%)",
    fontWeight:"600",
    fontFamily:"Noto Sans KR"
  }
 
}

const InputStyle={
  sx:{
     InputLabelStyle
  }
}

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
        <MobileDatePicker
          DialogProps={{PaperProps:paperStyle}}
          label="생년월일"
          value={value}
          cancelText="취소"
          clearText="완료"
          toolbarTitle="날짜선택"
          toolbarFormat='yyyy/MM/dd'
          okText="완료"
          onChange={(newValue) => {
            setValue(newValue);
            console.log(newValue)
            changeBirth(newValue);//부모컴포넌트로 올림
          }}
          renderInput={(params) => <TextField {...params} InputLabelProps={InputStyle} />}
        />
        
    </LocalizationProvider>
  );
}
