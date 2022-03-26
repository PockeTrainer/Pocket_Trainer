import React,{useState,useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

import ListBox from './ListBox';
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import EachExerciseCard from './EachExerciseCard';

import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

export default function HeaderInSwipeTab() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //위에까지는 탭메뉴 관련 state변수들

  const [showList,setShowList]=useState(true);//밑에 리스트에 주는 zoom transition 
  const [showSpecific,setShowSpecific]=useState(true);//구체적 운동 카드 보여주는 transition
  const [list_clicked_button,set_list_clicked_button]=useState("");//리스트에서 어떤 버튼이 눌렸는지에 대한 것
  const [tmp_list_clicked_button,set_tmp_list_clicked_button]=useState("");//리스트에서 어떤 버튼이 눌렸는지에 대한 임시 알림용
  const [clicked_button,set_Clicked_button]=useState("part1");//몇번째 버튼을 눌렀는지에 대한 state
  const [tmp_clicked_part,setTmpClicked_part]=useState("part1");//각 부위별 무엇을 눌렀는지 임시저장 버튼state
  const count1=useRef(1);
  const count2=useRef(1);

  const handleShowList=()=>{
      setShowList(prev=>!prev);
  }
  const handleShowSpecific=()=>{
      setShowSpecific(prev=>!prev);
  }
  useEffect(()=>{
    if(count1.current===1){
        count1.current+=1;
        return;
    }
    handleShowList();//닫아주기
    sleep(500).then(()=>set_Clicked_button(tmp_clicked_part));
    setTimeout(handleShowList,500);//열어주기
    set_list_clicked_button("hi");//여기다가 각 부위의 첫번째 운동을 담아주자
  },[tmp_clicked_part])

  useEffect(()=>{
    if(count2.current===1){
        count2.current+=1;
        return;
    }
    handleShowSpecific();//화면닫아주기
    sleep(500).then(()=>set_list_clicked_button(tmp_list_clicked_button));
    setTimeout(handleShowSpecific,500);//열어주기
  },[tmp_list_clicked_button])

  const StyleTab={
      fontFamily:"Noto Sans KR",
      fontWeight:"600"
  }

  const RecordBadgeStyle={
    fontWeight:"lighter",
    lineHeight:"2",
    color:"white",
    backgroundColor:"#2dce89",
    marginBottom:"1rem"
    
}

  const badgeStyle={
      display:"block",
      margin:"0 6rem"
  }

  const totalKcalStyle={
      margin:"auto",
      marginTop:"3rem",
      display:"block",
      color:"#6c757d",

  }

  const AvatarStyle=styled(Avatar)((props)=>({
    width:"4rem",
    height:"4rem",
    fontSize:"1.55rem",
    fontFamily:"Nanum Gothic",
    fontWeight:"500",
    backgroundColor:props.color,
    margin:"auto"
  }));

  const PartButtonStyle={
    "&.MuiButton-root":{
        padding:"0px",
        boxShadow:"",
        backgroundColor:"transparent",
        color:"#2dce89"
    },
    "&.MuiButton-root:hover":{
        backgroundColor:"transparent"
    }
}

  return (
    <Box sx={{ bgcolor: 'background.paper'}}>
      <AppBar position="static" sx={{backgroundColor:"#2dce89 !important" ,color:"white !important"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab sx={StyleTab} label="신체" {...a11yProps(0)} />
          <Tab sx={StyleTab} label="운동" {...a11yProps(1)} />
          <Tab sx={StyleTab} label="식단" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel  value={value} index={0} dir={theme.direction}>
        <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                                    <i className="ni ni-single-02" style={{color:"#212529cf",fontSize:"3em",textAlign:"center"}}></i>
                                    <span className="badge badge-primary btn-lg" style={badgeStyle}>신체정보</span>
                                    <h2 style={{color:"black",textAlign:"center"}}><strong>2022/03/22</strong></h2>
                                    <Stack direction="column" spacing={2}>
                                        <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>BMI지수:20.9</span> 
                                        <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>체중:67kg</span> 
                                        <Stack direction="row" spacing={1} style={{justifyContent:"center"}}>
                                                <>
                                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>섭취열량:2400Kcal</span> 
                                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>소모열량:2000Kcal</span> 
                                                </>
                                                
                                        </Stack>
                                    </Stack>

                                    <span className="badge badge-secondary btn-lg" style={totalKcalStyle} >+잉여400Kcal 남음</span>
                                </div>

                                <div className="modal-footer" style={{padding:"0rem",marginTop:"1em",justifyContent:"center"}}>
                                    <button  type="button" className="btn btn-primary"><i className="ni ni-settings"></i>신체정보수정</button>
                                </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
           <>

           <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                <i className="ni ni-chart-bar-32" style={{color:"#212529cf",fontSize:"3em",textAlign:"center"}}></i>
                <span className="badge badge-primary btn-lg" style={badgeStyle}>3부위 클리어</span>
                <h2 style={{color:"black",textAlign:"center"}}><strong>2022/03/22</strong></h2>
                <Stack direction="row" spacing={4} sx={{marginBottom:"1rem",justifyContent:"center"}}>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part1")}>
                                    <AvatarStyle color="#5e72e4" >어깨</AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>어깨운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part2")}>
                                    <AvatarStyle color="#2dce89" >하체</AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>하체운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part3")}>
                                    <AvatarStyle color="#ffc107" >복근</AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>복근운동</Typography>
                            </Stack>
                </Stack>
                <Zoom in={showList}>
                    <div>
                        <ListBox where="exercise_calander" set_tmp_list={set_tmp_list_clicked_button}/>
                    </div>
                </Zoom>

                <Slide  mountOnEnter unmountOnExit direction="up"  in={showSpecific}>
                    <div>
                        <EachExerciseCard/>
                    </div>
                </Slide>
            </div>
          </>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                                    <i className="ni ni-cart" style={{color:"#212529cf",fontSize:"3em",textAlign:"center"}}></i>
                                    <span className="badge badge-primary btn-lg" style={badgeStyle}>식단정보</span>
                                    <h2 style={{color:"black",textAlign:"center"}}><strong>2022/03/22</strong></h2>
                                    <Stack direction="column" spacing={2}>
                                        <div className="progress-wrapper">
                                            <div className="progress-info">
                                                <div className="progress-label">
                                                    <span style={{fontSize:"0.925rem"}}>탄수화물(g)</span>
                                                </div>
                                                <div className="progress-percentage">
                                                    <span>60%</span>
                                                </div>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: '60%'}} />
                                            </div>
                                        </div>

                                        <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom><RamenDiningIcon/>칼로리:1440Kcal/2400Kcal</Typography>
                                        <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom><LunchDiningIcon/>양:90g/150g</Typography>

                                        <div className="progress-wrapper">
                                            <div className="progress-info">
                                                <div className="progress-label">
                                                    <span style={{fontSize:"0.925rem"}}>단백질(g)</span>
                                                </div>
                                                <div className="progress-percentage">
                                                    <span>80%</span>
                                                </div>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{width: '80%'}} />
                                            </div>
                                        </div>

                                        <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom><RamenDiningIcon/>칼로리:1440Kcal/2400Kcal</Typography>
                                        <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom><LunchDiningIcon/>양:90g/150g</Typography>

                                        <div className="progress-wrapper">
                                            <div className="progress-info">
                                                <div className="progress-label">
                                                    <span style={{fontSize:"0.925rem"}}>지방(g)</span>
                                                </div>
                                                <div className="progress-percentage">
                                                    <span>40%</span>
                                                </div>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar bg-danger" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{width: '40%'}} />
                                            </div>
                                        </div>

                                        <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom><RamenDiningIcon/>칼로리:1440Kcal/2400Kcal</Typography>
                                        <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom><LunchDiningIcon/>양:90g/150g</Typography>
                                    </Stack>

                                    
                                </div>

                                <div className="modal-footer" style={{padding:"0rem",marginTop:"1em",justifyContent:"center"}}>
                                    <button  type="button" className="btn btn-primary"><i className="ni ni-chart-pie-35"></i>자세히보기</button>
                                </div>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
