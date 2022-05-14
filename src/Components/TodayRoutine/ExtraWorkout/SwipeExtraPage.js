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

import { useDispatch,useSelector } from 'react-redux';


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

  //Drawer용
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
 const container = window !== undefined ? () => window().document.body : undefined;





  
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
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
            <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                
            </div>
         
        </StyledBox>
      </SwipeableDrawer>
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
