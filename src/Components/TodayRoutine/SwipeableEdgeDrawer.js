import  React,{useEffect,useRef,useState} from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';



import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Slider from "react-slick";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import EachExerciseInstruction from './EachExerciseInstruction';


import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { change_clicked_button } from '../../modules/action';

import { useDispatch,useSelector } from 'react-redux';

//한글 바이트 별로 잘라는 함수
String.prototype.cut = function(len) {

  var str = this;
  var s = 0;
  for (var i=0; i<str.length; i++) {
  s += (str.charCodeAt(i) > 128) ? 2 : 1;
  if (s > len) return str.substring(0,i);
  }
  return str;

}
//SnackBar용
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  


//Drawer용 
const drawerBleeding = 40;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = useState(false);
  const count=useRef(1);//랜더링 카운트용
  const ref=useRef("");//drawer여는 버튼용
  const slider=useRef("");//Slider용
  const dispatch=useDispatch();//디스패치용
  const [initialIndex,set_InitialIndex]=useState(0);//슬라이드의 시작 인덱스 값




   //아바타버튼 디자인


   const AvatarStyle=styled(Avatar)((props)=>({
    width:"60px",
    height:"60px",
    fontFamily:"Nanum Gothic",
    fontWeight:"700",
    backgroundColor:props.color,
    margin:"auto"
  }));

  
 

  const routine_info=useSelector(state=>state.update_routineInfo_reducer);//루틴정보들 싹 가져오기
  const{bodypart,part1,part2,part3}=routine_info;
  const which_part=useRef(part1);//어디파트를 보여줄지

  if(props.select_button==="button1"){
    which_part.current=part1;
  }
  else if(props.select_button==="button2"){
    which_part.current=part2;
  }
  else{
    which_part.current=part3;
  }
  
  const dispatch_change=(exercise,index)=>{
    let tmp_part;
    let tmp_idx;
    if(exercise.part==="가슴"||exercise.part==="등"||exercise.part==="어깨"){
      tmp_part="button1";
    }
    else if(exercise.part==="이두"||exercise.part==="삼두"||exercise.part==="하체"){
      tmp_part="button2";
    }
    else{
      tmp_part="button3";
    }
    dispatch(change_clicked_button(tmp_part));
    
    if(index>=0&&index<=2){
      tmp_idx=index;
    }
    else if(tmp_idx>=3&&tmp_idx<=5){
      tmp_idx=index-3;
    }
    
    if(bodypart.indexOf("어깨")>0){
      if(index===6){
        tmp_idx=index-6
      }
      
    }
    set_InitialIndex(tmp_idx);//슬라이드의 시작 인덱스 값을 설정
    

  }

  const todayRoutineListImage=()=>{
    
      const result=[];
      for(let i=1;i<=3;i++){
        result.push(eval("part"+i).map((exercise,index)=>(
          <Card key={index} sx={{ maxWidth: 345 ,marginTop:"1em"}}>
            <CardActionArea onClick={()=>dispatch_change(exercise,index)} >
                    <CardMedia
                                component="img"
                                height="250"
                                image={exercise.image_url}
                                alt={exercise.name}
                              />
                              <CardContent sx={{"&.MuiCardContent-root":{padding:"6px",paddingBottom:"0px"}}}>
                                <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:"Nanum Gothic",fontWeight:"600"}}>
                                {exercise.name}(5set)
                              </Typography>
                              </CardContent>
              </CardActionArea>
          </Card>
        ))
        )
      }
      return result;
  
   
   
  }
    
  const sliderGoto=(part,index)=>{//슬라이더 이동시키는 함수 인덱스 재조정
    let tmp_idx;
    if(part===part1){
      tmp_idx=index;
    }
    else if(part===part2){
      tmp_idx=index+3;
    }
    else{
      if(bodypart.indexOf("어깨")>0){
        tmp_idx=index+6;
      }
      else{
        tmp_idx=index+4
      }
      
    }
    slider.current.slickGoTo(tmp_idx,false)
  }

  const todayRoutineListButton=(part,color)=>{

    let list=part.map((exercise,index)=>(
    <Button key={index} sx={{padding:"0px 0px"}} onClick={()=>sliderGoto(part,index)}>
              <Stack direction="column">
                <AvatarStyle color={color} >{(exercise.name).cut(2)}</AvatarStyle>
                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>{exercise.name}</Typography>
              </Stack>
            </Button>
            
  ))
  return list;
}


  //Drawer용
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;


  useEffect(()=>{
      if(count.current==1||count.current==2){//위에 setAfterLogin의 변화로 다시 리랜더링이 이미 두번은 먹고 들어가서 그렇다.
          console.log("첫번째 컴");
          count.current+=1;
          return
      }
      //toggleDrawer(true)
      if(props.select_button!=="total"){
        ref.current.click();//버튼클릭해서 열어주기
      }
  },[props])

//Snackbar용
  const handleTest=()=>{
      alert("hi");
  }

  const [openSnackbar, setOpenSnackBar] = useState(false);

  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };
//슬라이더용

  const settings_for_total={
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const settings_for_exercises = {
    initialSlide:initialIndex,//시작 슬라이드 값을 설정해줌
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };




  const sub_title={
    total:"오늘의 전체루틴",
    button1:`오늘의 ${bodypart[0]}루틴`,
    button2:`오늘의 ${bodypart[1]}루틴`,
    button3:`오늘의 ${bodypart[2]}루틴`
  }

  
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      {/* Drawer여는 버튼은 숨김 */}
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button ref={ref}  onClick={toggleDrawer(true)} sx={{display:"none"}}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 1, color: 'text.secondary' }}>{sub_title[props.select_button]}</Typography>
        </StyledBox>

        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >

          {
            props.select_button==="total"&& bodypart[0]!=="어깨"
            ?
            <>
            
              <Slider {...settings_for_total} ref={slider}>
                {todayRoutineListImage()}
              </Slider>
              <h2 className="text-gray-dark display-4" style={{textAlign:"center"}} >{bodypart[0]}</h2>
              <Stack direction="row" spacing={2} sx={{marginTop:"0.5em",justifyContent:"center"}}>
                {todayRoutineListButton(part1,"#fc7c5f")}
              </Stack>
              <Stack direction="row" spacing={2} sx={{marginTop:"0.5em",justifyContent:"center"}}>
                <h2 className="text-gray-dark display-4">{bodypart[1]}</h2>
                <h2 className="text-gray-dark display-4" >{bodypart[2]}</h2>
              </Stack>
              <Stack direction="row" spacing={2} sx={{marginTop:"0.5em",justifyContent:"center"}}>
                {todayRoutineListButton(part2,"#2dce89")}
                {todayRoutineListButton(part3,"#ffc107")}
              </Stack>
              
            </>
            :
            (
              props.select_button==="total"&& bodypart[0]==="어깨"?
              <>
            
              <Slider {...settings_for_total} ref={slider}>
                {todayRoutineListImage()}
              </Slider>
              <h2 className="text-gray-dark display-4"  >{bodypart[0]}</h2>
              <Stack direction="row" spacing={1} sx={{marginTop:"0.5em",justifyContent:"center"}}>
                {todayRoutineListButton(part1,"#fc7c5f")}
              </Stack>

              <h2 className="text-gray-dark display-4">{bodypart[1]}</h2>
              <Stack direction="row" spacing={4} sx={{marginTop:"0.5em",justifyContent:"center"}}>
                {todayRoutineListButton(part2,"#2dce89")}
              </Stack>
              
              <h2 className="text-gray-dark display-4">{bodypart[2]}</h2>
              <Stack direction="row" spacing={2} sx={{marginTop:"0.5em",justifyContent:"center"}}>
                {todayRoutineListButton(part3,"#ffc107")}
              </Stack>
              
            </>
            :null
            )

          }

         
          {
          props.select_button!=="total"&&
          <>
          <Slider {...settings_for_exercises} ref={slider}>
            {
              which_part.current.map((exercise,index)=>(
                <EachExerciseInstruction key={index} exercise={exercise} />
              ))
            }
          </Slider>

     <Stack direction="row" spacing={2} sx={{marginTop:"0.5em",justifyContent:"center"}}>

       {
      which_part.current.map((exercise,index)=>(
          <Button sx={{padding:"0px 0px"}} onClick={()=>slider.current.slickGoTo(index,false)}>
            <Stack direction="column">
              <AvatarStyle color="#fc7c5f">{(exercise.name).cut(2)}</AvatarStyle>
              <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>{exercise.name}</Typography>
            </Stack>
        </Button>
       ))
       }

       
     </Stack>
     </>}
          


              <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%',"&.MuiAlert-root":{backgroundColor:"#ed6c02 !important",fontFamily:"Nanum Gothic"} }}>
                    대흉근+삼각근+상완삼두근
                    </Alert>
            </Snackbar>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
    
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
