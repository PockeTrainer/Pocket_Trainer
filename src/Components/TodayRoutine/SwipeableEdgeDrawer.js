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


import { BenchPress,InclinedBenchPress,DumbbelFly,Crunch,CablePushDown } from '../../ExercisesInfo/ExerciseInfo';
import { useDispatch } from 'react-redux';

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

   //아바타버튼 디자인


   const AvatarStyle=styled(Avatar)((props)=>({
    width:"60px",
    height:"60px",
    fontFamily:"Nanum Gothic",
    fontWeight:"700",
    backgroundColor:props.color,
    margin:"auto"
  }));

  const todayRoutine=[BenchPress,InclinedBenchPress,DumbbelFly];//오늘 운동 전체 종류
  const todayPart1=[BenchPress,InclinedBenchPress,DumbbelFly];//오늘 할 운동 부위1
  const todayPart2=[CablePushDown];//오늘 할 운동 부위2
  const todayPart3=[Crunch];//오늘 할 운동 부위3

  const todayRoutineListImage=todayRoutine.map((exercise,index)=>(
    <Card key={index} sx={{ maxWidth: 345 ,marginTop:"1em"}}>
      <CardActionArea onClick={()=>dispatch(change_clicked_button("button1"))} >
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

  const todayRoutineListButton=(part,color)=>{
    let list=part.map((exercise,index)=>(
    <Button key={index} sx={{padding:"0px 0px"}} onClick={()=>slider.current.slickGoTo(index,false)}>
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
      ref.current.click();//버튼클릭해서 열어주기
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
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };




  const sub_title={
    total:"오늘의 전체루틴",
    button1:"오늘의 가슴루틴",
    button2:"오늘의 삼두루틴",
    button3:"오늘의 복근루틴"
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
          props.select_button=="total"&&
           <>
           
            <Slider {...settings_for_total} ref={slider}>
              {todayRoutineListImage}
            </Slider>
            <h2 className="text-gray-dark display-4" style={{textAlign:"center"}} >가슴</h2>
            <Stack direction="row" spacing={2} sx={{marginTop:"0.5em",justifyContent:"center"}}>
              {todayRoutineListButton(todayPart1,"#fc7c5f")}
            </Stack>
            <Stack direction="row" spacing={2} sx={{marginTop:"0.5em",justifyContent:"center"}}>
              <h2 className="text-gray-dark display-4">삼두</h2>
              <h2 className="text-gray-dark display-4" >복근</h2>
            </Stack>
            <Stack direction="row" spacing={2} sx={{marginTop:"0.5em",justifyContent:"center"}}>
              {todayRoutineListButton(todayPart2,"#2dce89")}
              {todayRoutineListButton(todayPart3,"#ffc107")}
            </Stack>
            
            

           </>
          }
          {
          props.select_button=="button1"&&
          <>
          <Slider {...settings_for_exercises} ref={slider}>
            <EachExerciseInstruction exercise={BenchPress} />
            <EachExerciseInstruction exercise={InclinedBenchPress} />
            <EachExerciseInstruction exercise={DumbbelFly}/>
          </Slider>

     <Stack direction="row" spacing={2} sx={{marginTop:"0.5em",justifyContent:"center"}}>
       <Button sx={{padding:"0px 0px"}} onClick={()=>slider.current.slickGoTo(0,false)}>
         <Stack direction="column">
           <AvatarStyle color="#fc7c5f">벤</AvatarStyle>
           <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>벤치프레스</Typography>
         </Stack>
       </Button>

       <Button sx={{padding:"0px 0px"}} onClick={()=>slider.current.slickGoTo(1,false)}>
         <Stack direction="column">
            <AvatarStyle color="#fc7c5f">인</AvatarStyle>
           <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>인클라인프레스</Typography>
         </Stack>
       </Button>

       <Button sx={{padding:"0px 0px"}} onClick={()=>slider.current.slickGoTo(2,false)}>
         <Stack direction="column">
            <AvatarStyle color="#fc7c5f">플</AvatarStyle>
           <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500"}}>덤벨플라이</Typography>
         </Stack>
       </Button>
       
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
