import React,{useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function InfoTab({change_click_func}) {
  const [value, setValue] = useState("today_routine");

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
        <Tab sx={TabStyle} value="today_routine" icon={<SportsScoreIcon/>} iconPosition='start' label="오늘의 루틴" />
        <Tab sx={TabStyle} value="extra_routine" icon={<AddShoppingCartIcon/>} iconPosition='start' label="추가운동" />
      </Tabs>
    </Box>
  );
}
