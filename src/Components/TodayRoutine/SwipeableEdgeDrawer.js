import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Stack from '@mui/material/Stack';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea, CardActions } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


//SnackBar용
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  


//Drawer용 
const drawerBleeding = 56;

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
  const [open, setOpen] = React.useState(false);
  const count=React.useRef(1);//랜더링 카운트용
  const ref=React.useRef("");//drawer여는 버튼용


  //Drawer용
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  if(props.select_button=="total"){

  }
  React.useEffect(()=>{
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

  const [openSnackbar, setOpenSnackBar] = React.useState(false);

  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };
//
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
          <Typography sx={{ p: 2, color: 'text.secondary' }}>{props.select_button}</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={handleClick}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="../assets/img/theme/benchPress.gif"
                      alt="벤치프레스"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:"Nanum Gothic"}}>
                        벤치프레스(5set)
                      </Typography>
                      <Typography variant="body2" color="white">
                        벤치프레스는 대표적인 3대운동으로서 대흉근을 키워준다(불라불라부라)
                      </Typography>
                      
                      <div className="alert alert-warning" role="alert" style={{padding:"1em 1em",marginTop:"2em",marginBottom:"0em"}}>
                                <i class="ni ni-like-2"></i>
                                <h2><strong>벤치프레스 레코드</strong></h2>
                                <Stack direction="column" spacing={2}>
                                <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",lineHeight:"2",color:"white"}}>세트당 개수:12개</span> 
                                <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",color:"white",lineHeight:"2"}}>세트당 휴식시간:1분40초</span> 
                                <Stack direction="row" spacing={1}>
                                    <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",lineHeight:"2",color:"white",margin:"auto"}}>마지막중량:50kg</span> 
                                    <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",color:"white",lineHeight:"2",margin:"auto"}}>추천중량:60kg</span> 
                                </Stack>
                                </Stack>
                        </div>
                        
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked sx={{color:"white",'&.Mui-checked':{color:"#fc7c5f"}}} />} label="해당 운동을 숙지하였습니다" />
                    </FormGroup>
                  </CardActions>
              </Card>


              <Card sx={{ maxWidth: 345,marginTop:"1em"}}>
                  <CardActionArea onClick={handleClick}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="../assets/img/theme/InclinedPress.gif"
                      alt="인클라인프레스"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:"Nanum Gothic"}}>
                        인클라인프레스(5set)
                      </Typography>
                      <Typography variant="body2" color="white">
                        플랫벤치가 아닌 45정도 세워진 벤치에서 실시하여 가슴 상부 근육을 좀 더 집중적으로 발달시키는 운동입니다.
                      </Typography>
                      
                      <div className="alert alert-warning" role="alert" style={{padding:"1em 1em",marginTop:"2em",marginBottom:"0em"}}>
                                <i class="ni ni-like-2"></i>
                                <h2><strong>인클라인프레스 레코드</strong></h2>
                                <Stack direction="column" spacing={2}>
                                <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",lineHeight:"2",color:"white"}}>세트당 개수:12개</span> 
                                <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",color:"white",lineHeight:"2"}}>세트당 휴식시간:1분40초</span> 
                                <Stack direction="row" spacing={1}>
                                    <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",lineHeight:"2",color:"white",margin:"auto"}}>마지막중량:50kg</span> 
                                    <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",color:"white",lineHeight:"2",margin:"auto"}}>추천중량:60kg</span> 
                                </Stack>
                                </Stack>
                        </div>
                        
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked sx={{color:"white",'&.Mui-checked':{color:"#fc7c5f"}}} />} label="해당 운동을 숙지하였습니다" />
                    </FormGroup>
                  </CardActions>
              </Card>
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
