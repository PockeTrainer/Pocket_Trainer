import React,{useState,useRef} from 'react';
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

import HeaderInSwipeTab from "./HeaderInSwipeTab"
import { Stack } from '@mui/material';
import "../../CustomCss/History/SwipeInfoTab.css"

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

function SwipeInfoTab(props) {

  const { window,clicked_date } = props;
  const [open, setOpen] = useState(false);
  const buttonRef=useRef("");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;
 
  console.log("토글값:",open)
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
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button ref={buttonRef}  onClick={toggleDrawer(true)} sx={{display:"none"}} >Open</Button>
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
          <Stack direction={"row"} sx={{justifyContent:"space-between",alignItems:"center"}}>
              <Typography sx={{ p: 1, color: 'text.secondary' }}>{clicked_date.month+"월"+clicked_date.days+"일 히스토리"}</Typography>
              {
                open
                ?
                <div className="arrow_going_down">
                  <i className="fas fa-arrow-down" style={{fontSize:"2rem",color:"#5e72e4"}}></i>
                </div>
                :
                <div className="arrow_going_up">
                  <i className="fas fa-arrow-up" style={{fontSize:"2rem",color:"#5e72e4"}}></i>
                </div>
              }
             
             
          </Stack>
          
        </StyledBox>
        <StyledBox
          sx={{
            px: 1,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <HeaderInSwipeTab clicked_date={clicked_date}/>
          {/* 실제 위에 해당하는 헤더와 밑에 내용들이 포함되는 컴포넌트 */}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeInfoTab.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeInfoTab;
