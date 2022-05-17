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
import ErrorIcon from '@mui/icons-material/Error';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useSelector } from 'react-redux';

import Grow from '@mui/material/Grow';




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

export default function HeaderInSwipeTab({clicked_date}) {
  const theme = useTheme();
  const [value, setValue] = useState(0);//Tab페이지

  const handleChange = (event, newValue) => {//Tab이동
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {//Tab이동
    setValue(index);
  };

  //위에까지는 탭메뉴 관련 state변수들

  const [showList,setShowList]=useState(true);//밑에 리스트에 주는 zoom transition 
  const [showSpecific,setShowSpecific]=useState(true);//구체적 운동 카드 보여주는 transition
  const [list_clicked_button,set_list_clicked_button]=useState(0);//리스트에서 어떤 버튼이 눌렸는지에 대한 것
  const [tmp_list_clicked_button,set_tmp_list_clicked_button]=useState("");//리스트에서 어떤 버튼이 눌렸는지에 대한 임시 알림용
  const [clicked_button,set_Clicked_button]=useState("part1");//몇번째 버튼을 눌렀는지에 대한 state
  const [tmp_clicked_part,setTmpClicked_part]=useState("part1");//각 부위별 무엇을 눌렀는지 임시저장 버튼state
  const count1=useRef(1);
  const count2=useRef(1);

  const [arrange_data,set_arrange_data]=useState({//리덕스로부터 가져온 값들을 운동페이지에서 쓰기 용이하게 바꿈
    part1:[],
    part2:[],
    part3:[],
    bodypart:[],
    how_many_clear:0
  })

  //위에는 다 운동관련페이지용도

  const dayInfo=useSelector(state=>state.update_day_info_obj_reducer);//해당 눌린날의 api정보 객체 불러오기
  const {
    day_bmi,
    day_history_diet,
    day_history_workout,
    day_weight,
    nutrient,
    today_kcal_consumption
  }=dayInfo

  //위에는 데이터 불러오기

  const [result_kcal,set_result_kcal]=useState({//그냥 디폴트로 막 해준거임 어차피 랜더링되서 바뀔거니까
    state:"same",
    result:0
  });//섭취칼로리-소모칼로리의 값을 담음

  const count_bmi=useRef(1);
  //위에는 bmi쪽

  const handleShowList=()=>{
      setShowList(prev=>!prev);
  }
  const handleShowSpecific=()=>{
      setShowSpecific(prev=>!prev);
  }

  const isAllClear=(part)=>{//해당부위가 클리어 됐는지 확인해줌
    for(let exercise of part){
        if(!exercise.is_clear){
            return false
        }
    }
    return true;
}
  const arrangeData=()=>{//각 부위별로 데이터를 정리
    let bodypart=new Set();//부위는 중복되는게 있기에 set 선택-중복안되도록
    let part1=[];
    let part2=[];
    let part3=[];
    let where_to_put;
    let how_many_clear=0;
    let module= require("../../ExercisesInfo/ExerciseInfo.js");
    let Exercise=module.Exercise;

    day_history_workout.map((exercise,index)=>{
      bodypart.add(exercise.workout_name.body_part);

      if(0<=index<=2){
          where_to_put=part1;
      }

      if(exercise.workout_name.body_part==="하체"){
          where_to_put=part2;
      }
      else if(index===3){
          where_to_put=part2
      }

      if(exercise.workout_name.body_part==="복근"){
          where_to_put=part3
      }
      window[exercise.workout_name.workout_name]=new Exercise(exercise,module[exercise.workout_name.workout_name]);//각각의 api결과+상수정보까지 합침
      where_to_put.push(eval(exercise.workout_name.workout_name));
    })

    for(let i=1;i<=3;i++){//각 파트별로 성공여부를 따지는데 클리어한 부위개수를 파악
      let tmp=isAllClear(eval("part"+i));
      if(tmp){
          how_many_clear+=1;//각 파트별 성공여부 넣어줌
      }
   }

    set_arrange_data({
      ...arrange_data,
      part1:part1,
      part2:part2,
      part3:part3,
      bodypart:[...bodypart],
      how_many_clear:how_many_clear
    })
      
  } 

  useEffect(()=>{
    if(count1.current===1){
        count1.current+=1;

        return;
    }
    handleShowList();//닫아주기
    sleep(500).then(()=>set_Clicked_button(tmp_clicked_part));
    setTimeout(handleShowList,500);//열어주기
    set_list_clicked_button(0);//부위가 바뀌면 다시 각 부위의 첫번째 운동을 가리키도록 초기화
  },[tmp_clicked_part])

  useEffect(()=>{
    if(count2.current===1){
        count2.current+=1;
        return;
    }
    handleShowSpecific();//화면닫아주기
    sleep(500).then(()=>set_list_clicked_button(tmp_list_clicked_button));//이 때 진짜 클릭된 리스트 상태에 기입
    setTimeout(handleShowSpecific,500);//열어주기
  },[tmp_list_clicked_button])

  //위에는 운동관련

  useEffect(()=>{
    if(count_bmi.current===1){
      count_bmi.current+=1;
      return
    }
    if(nutrient.total_kcal!==0&&today_kcal_consumption.workout_kcal_consumption__sum!==null){
      let tmp_result=nutrient.total_kcal-today_kcal_consumption.workout_kcal_consumption__sum;//섭취-소모

      if(nutrient.total_kcal-today_kcal_consumption.workout_kcal_consumption__sum>0){//먹은게 더 많을 때-잉여
        set_result_kcal({
          ...result_kcal,
          state:"more",
          result:tmp_result
        });
      }
      else if(nutrient.total_kcal-today_kcal_consumption.workout_kcal_consumption__sum===0){//섭취칼로리=소모칼로리 같다-유지
        set_result_kcal({
          ...result_kcal,
          state:"same",
          result:tmp_result
        });
      }
      else{//소모칼로리가 더 많을 때-소모
        set_result_kcal({
          ...result_kcal,
          state:"less",
          result:tmp_result
        });
      }
    }
    else{
      set_result_kcal({
        ...result_kcal,
        state:"except",
        result:0
      })
    }

    arrangeData();//받은 데이터 정리
   
  },[dayInfo])

  const StyleTab={
      fontFamily:"Noto Sans KR",
      fontWeight:"600"
  }

  const Pstyled=styled('p')((props)=>({
    fontSize:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0"
}))

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


  let messageForKcalResult={
    more:<span className="badge badge-secondary btn-lg" style={totalKcalStyle} >+잉여{result_kcal.result}Kcal 남음</span>,
    same:<span className="badge badge-secondary btn-lg" style={totalKcalStyle} >섭취=소모 (칼로리 유지)</span>,
    less:<span className="badge badge-secondary btn-lg" style={totalKcalStyle} >-소모{result_kcal.result}Kcal 부족</span>,
    except:null
  }

  const exercise_clear_css={
    3:"badge badge-success btn-lg",
    2:"badge badge-primary btn-lg",
    1:"badge badge-warning btn-lg",
    0:"badge badge-danger btn-lg"
  }

  console.log("arrange된값:",arrange_data)

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
                                    <h2 style={{color:"black",textAlign:"center"}}><strong>{clicked_date.year+"년"+clicked_date.month+"월"+clicked_date.days+"일"}</strong></h2>
                                    <Stack direction="column" spacing={2}>
                                      {
                                        (day_bmi===null || day_weight===null)
                                        ?
                                          <>
                                             <div className="alert alert-danger" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                                              <Pstyled bold="ligther">
                                                <WarningAmberIcon/>해당 날짜에 업데이트된 체중정보가 없습니다
                                              </Pstyled>
                                            </div>
                                          </>
                                        :
                                          <>
                                            <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>BMI지수:{day_bmi}</span> 
                                            <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>체중:{day_weight}kg</span> 

                                  
                                            
                                          </>
                                       

                                      }

                                      {
                                        (nutrient.total_kcal===0&&today_kcal_consumption.workout_kcal_consumption__sum===null)
                                        ?
                                          <>
                                            <div className="alert alert-warning" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                                              <Pstyled bold="ligther">
                                                <ErrorIcon/>해당 날에 운동과 식단기록 데이터가 없습니다
                                              </Pstyled>
                                            </div>
                                          </>
                                        :(
                                          nutrient.total_kcal===0
                                          ?
                                            <>
                                              <div className="alert alert-warning" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                                                <Pstyled bold="ligther">
                                                  <ErrorIcon/>해당 날에 식단기록 데이터가 없습니다
                                                </Pstyled>
                                              </div>
                                              <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>소모열량:{today_kcal_consumption.workout_kcal_consumption__sum+"Kcal"}</span> 
                                            </>
                                          :(
                                            today_kcal_consumption.workout_kcal_consumption__sum===null
                                            ?
                                              <>
                                                <div className="alert alert-danger" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                                                <Pstyled bold="ligther">
                                                  <WarningAmberIcon/>해당 날에 운동을 통한 소모한 칼로리가 없습니다
                                                </Pstyled>
                                              </div>
                                              <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>섭취열량:{nutrient.total_kcal+"Kcal"}</span> 
                                              </>
                                            :
                                            <>
                                              <Stack direction="row" spacing={1} style={{justifyContent:"center"}}>
                                                
                                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>섭취열량:{nutrient.total_kcal+"Kcal"}</span> 
                                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>소모열량:{today_kcal_consumption.workout_kcal_consumption__sum+"Kcal"}</span> 
                                                
                                                
                                              </Stack>
                                              
                                            </>
                                          )
                                        )
                                      }
                                      
                                        
                                    </Stack>
                                    {/* 여기다가 잉여칼로리 */}
                                    {messageForKcalResult[result_kcal.state]}

                                    
                                </div>

                                <div className="modal-footer" style={{padding:"0rem",marginTop:"1em",justifyContent:"center"}}>
                                    <button  type="button" className="btn btn-primary"><i className="ni ni-settings"></i>신체정보수정</button>
                                </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
           <>

           <div className="alert alert-secondary" role="alert" style={{padding:"0em 0em",marginBottom:"0em"}}>
                <i className="ni ni-chart-bar-32" style={{color:"#212529cf",fontSize:"3em",textAlign:"center"}}></i>
                <span className={exercise_clear_css[arrange_data.how_many_clear]} style={badgeStyle}>{arrange_data.how_many_clear===0?"올Fail":arrange_data.how_many_clear+"부위 클리어!"}</span>
                <h2 style={{color:"black",textAlign:"center"}}><strong>{clicked_date.year+"년"+clicked_date.month+"월"+clicked_date.days+"일"}</strong></h2>
                <Stack direction="row" spacing={4} sx={{marginBottom:"1rem",justifyContent:"center"}}>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part1")}>
                                    <AvatarStyle color="#5e72e4" >{arrange_data.bodypart[0]}</AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>{arrange_data.bodypart[0]}운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part2")}>
                                    <AvatarStyle color="#2dce89" >{arrange_data.bodypart[1]}</AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>{arrange_data.bodypart[1]}운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part3")}>
                                    <AvatarStyle color="#ffc107" >{arrange_data.bodypart[2]}</AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>{arrange_data.bodypart[2]}운동</Typography>
                            </Stack>
                </Stack>
                <Zoom in={showList}>
                    <div>
                        <ListBox where="exercise_calander" exercise_list={eval("arrange_data"+"."+clicked_button)}  set_tmp_list={set_tmp_list_clicked_button}/>
                    </div>
                </Zoom>

                <Slide  direction="left"  in={showSpecific}>
                    <div>
                        <EachExerciseCard exercise_obj={eval("arrange_data"+"."+clicked_button+"["+list_clicked_button+"]")} clicked_date={clicked_date}/>
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
