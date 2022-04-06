import React,{useState} from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import IconButton from '@mui/material/IconButton';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import { TextField } from '@mui/material';
import koLocale from "date-fns/locale/ko";
import { choose_meal_date } from '../../modules/action';
import { useDispatch, useSelector } from 'react-redux';

function CalandarPicker() {
    const [isOpen, setIsOpen] = useState(false);
    const selectedDate=useSelector(state=>state.update_choose_meal_date_reducer.date);
    const dispatch=useDispatch();
  
    const buttonStyle={
        position:"absolute",
        left:"6.0rem",
        top:"-0.7rem",
        color:"#607d8b"
    };
    
    const paperStyle={
        sx:{
            backgroundColor:"white !important",
            color:"#212529 !important"
        }
    }
    const handleDateChange=(newValue)=>{
        dispatch(choose_meal_date(newValue));//리덕스도에도 올려놓음
    }

    console.log(selectedDate)

    return (
      <div>
        <IconButton sx={buttonStyle} onClick={() => setIsOpen(true)}>
            <WatchLaterRoundedIcon/>
        </IconButton>
        
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
            <DatePicker
            DialogProps={{PaperProps:paperStyle}}
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            value={selectedDate}
            onChange={(newValue)=>handleDateChange(newValue)}
            renderInput={params => <TextField sx={{display:"none"}} {...params} />}
            cancelText="취소"
            clearText="완료"
            toolbarTitle="날짜선택"
            toolbarFormat='yyyy/MM/dd'
            okText="완료"
            />
        </LocalizationProvider>
      </div>
    );
}
export default CalandarPicker;