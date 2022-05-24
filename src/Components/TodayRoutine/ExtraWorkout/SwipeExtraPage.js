import  React,{useEffect,useRef,useState} from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { useDispatch,useSelector } from 'react-redux';
import BodyPartButton from './BodyPartButton';
import ExerciseGroup from './ExerciseGroup';

import ExerciseDetails from './ExerciseDetails';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { clicked_part_name, prev_extra_tab_page } from '../../../modules/action';
import { Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AskingToStart from './AskingToStart';
//Drawer용 
const drawerBleeding = 60;

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

function SwipeExtraPage(props) {
  const { window } = props;
  const [open, setOpen] = useState(false);
  const count=useRef(1);//랜더링 카운트용
  const ref=useRef("");//drawer여는 버튼용

  const dispatch=useDispatch();//디스패치용

  const modalRef=useRef();//모달창 여는 버튼

  const extra_routine=useSelector(state=>state.update_extra_exercise_reducer);//추가운동 페이지의 전체 정보가져오기
  const {page,what_i_want_exercise,favorite,clicked_part}=extra_routine;

  //Drawer용
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
 const container = window !== undefined ? () => window().document.body : undefined;

 const IconButtonStyle={
    "&.MuiIconButton-root":{
        padding:"0px",
        backgroundColor:"transparent",
        fontSize:"1em"
    },
    "&.MuiIconButton-root:hover":{
        backgroundColor:"transparent"
    }

};

const Pstyled=styled('p')((props)=>({
    fontSize:props.size==="big"?"1.5rem":"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0",
    textAlign:"center"
}));

const openAskingStartModal=()=>{//이어서 진행하기 모달창
    modalRef.current.click();
};

const handleModalOpen=()=>{
    setTimeout(openAskingStartModal,1000);
}


const goto_back=()=>{//뒤로가기 버튼
    
    if(page===2){//상세페이지에서 뒤로가기를 눌렀음을 의미
        dispatch(clicked_part_name(clicked_part.part));//다시 뒤로 갈 것이니까 부위명으로 다시 업데이트
    }
    else{//부위선택페이지에서 뒤로가기를 눌렀을 때
        dispatch(clicked_part_name(""));//다시 초기화 시키기
    }
    dispatch(prev_extra_tab_page());
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
      <Box sx={{ textAlign: 'center', pt: 1,display:"none" }}>
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
            top: "-3rem",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            minHeight:"5rem"
          }}
        >
          <Puller />
          <Typography sx={{ p: 1, color: 'black',fontWeight:"600" }}>부위별 전체운동</Typography>
        </StyledBox>

        <StyledBox
          sx={{
            paddingRight:"0.2rem",
            paddingLeft:"0.2rem",
            paddingBottom:"0.2rem",
            height: '100%',
            overflow: 'auto',
          }}
        >
            <div className="alert alert-secondary" role="alert" style={{padding:"0.5em 0.5em",marginBottom:"0em",backgroundColor:"#f5f5f5"}}>

               
                    {
                        page!==0
                        &&
                        <>
                            <Stack direction={"row"} spacing={2} sx={{justifyContent:"space-between",alignItems:"center"}}>
                                <IconButton sx={IconButtonStyle} onClick={goto_back}>
                                    <ArrowCircleLeftIcon sx={{fontSize:"2.5rem"}}/>
                                </IconButton>
                                <Pstyled bold="etc">
                                    {
                                        typeof clicked_part==='object'//객체 형태일경우 운동이 클릭되었음을 의미함
                                        ?
                                        clicked_part.name
                                        :
                                        clicked_part
                                    }
                                </Pstyled>
                                <IconButton sx={IconButtonStyle} onClick={handleModalOpen}>
                                        <Avatar sx={{width:"2rem",height:"2rem",backgroundColor:"#2dce89"}}>
                                            <FitnessCenterIcon/>
                                        </Avatar>
                                
                                </IconButton>
                            </Stack>
                        </>
                    }
                    {
                        page===0
                        &&
                        <>
                            <BodyPartButton/>
                        </>
                    }
                    {
                        page===1
                        &&
                        <>
                            <ExerciseGroup/>
                        </>
                    }
                    {
                        page===2
                        &&
                        <>
                            <ExerciseDetails/>
                        </>
                    }
                    {
                         page!==0
                         &&
                         <div className="alert alert-secondary" role="alert" style={{marginBottom:"0em",padding:"0.5rem 0.5rem",marginTop:"2rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1em",display:"block",margin:"0rem 4rem"}}><ShoppingCartIcon sx={{color:"#4c4c4c"}}/> 담은 운동들</span>
                            <div style={{padding:"0.3rem"}}>
                                {
                                    what_i_want_exercise.length===0
                                    ?
                                        <Pstyled bold="etc" size="small">
                                        선택한 운동이 없습니다
                                        </Pstyled>
                                    :
                                    <>
                                        {
                                            what_i_want_exercise.map((exercise,index)=>(
                                                <Chip key={index}
                                                label={exercise.name}
                                            />
                                            ))
                                        }
                                           
                                            
                                    </>
                                }
                               
                            </div>
                        </div>
                    }
                    
                
                
            </div>
         
        </StyledBox>
      </SwipeableDrawer>
      <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-asking-start">Default</button>
      <AskingToStart/>
    </Root>
    
  );
}

SwipeExtraPage.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

export default SwipeExtraPage;
