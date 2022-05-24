import React,{useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import DiningIcon from '@mui/icons-material/Dining';

export default function HeaderTab({change_click_func}) {
  const [value, setValue] = useState("recommend");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    change_click_func(newValue);//부모컴포넌트에 상단 state변경
  };

  const TabStyle={
      fontFamily:"Noto Sans KR",
      fontWeight:"600",
      "&.MuiTab-root.Mui-selected":{
          color:"#2dce89"
      },
      "&.MuiTab-root":{
          minHeight:"48px"
      },
      "&.MuiTab-root>.MuiTab-iconWrapper":{
          marginRight:"0px"
      }
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        centered
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        sx={{".MuiTabs-flexContainer":{justifyContent:"space-around"}}}
      >
        <Tab sx={TabStyle} value="recommend" icon={<RamenDiningIcon/>} iconPosition='start' label="오늘의 추천양" />
        <Tab sx={TabStyle} value="record" icon={<DiningIcon/>} iconPosition='start' label="식단기록" />
      </Tabs>
    </Box>
  );
}
