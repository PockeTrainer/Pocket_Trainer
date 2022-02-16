import React,{useState,useRef,useEffect} from "react";

import Box from '@mui/material/Box';


import styles from'../../CustomCss/ExerciseCounter/InfoCard.module.css';
import { styled } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Skeleton from '@mui/material/Skeleton';

import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';

import Grow from '@mui/material/Grow';
import { useNavigate, useParams } from "react-router-dom";

function sleep(ms){
  return new Promise((r)=>setTimeout(r,ms));
}

function BodySequence(){

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] =useState(false);
    const timer = useRef();

    const navigate=useNavigate();

      const AvatarStyle=styled(Avatar)((props)=>({
        width:"60px",
        height:"60px",
        fontFamily:"Nanum Gothic",
        fontWeight:"700",
        backgroundColor:props.color,
        margin:"auto"
      }));

      const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
        backgroundColor:"#5e72e4",
        width:"80px",
        height:"80px"

      };

      useEffect(() => {
        if(loading){
          timer.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);
          }, 2000);
        }
        else if(success){
          setTimeout(() => {
            navigate("/routine/series/benchpress")
          }, 2000);
        }
        return () => {
          clearTimeout(timer.current);
        };
      }, [success,loading]);

      const handleButtonClick = () => {
        if (!loading) {
          setLoading(true);

        }
      };


      const [checked, setChecked] = useState(false);


      const handleChange = () => {
          setChecked((prev) => !prev);
      };
  
      useEffect(()=>{
          handleChange();
      },[])
  
      //Transition용
    return(
      <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
                                        {...(checked ? { timeout: 1000 } : {})}>
                                            <div>
        <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0" data-component="ProfileCard" style={{paddingLeft:"1px",paddingRight:"1px"}}>
        <div className={"card-profile"+" "+"shadow"+" "+"card"}>
          

          <div className="card-body pt-4 pt-md-4" style={{padding:"0.5rem"}} >
            <div className="row">
              <div className="col">
              <i class={"fas fa-clipboard-list fa-5x"+" "+styles.alert_mark}></i>
                        <div className={styles[`card-profile-stats`]+" "+"d-flex justify-content-center mt-md-5"}>
                          <h1 className= {"display-4"+" "+styles.alert_title}><i class="ni ni-bold-right"></i>부위별순서</h1>
                        </div>
                        <hr/>
                    <Stack direction="row" spacing={4} sx={{marginTop:"3.5em",justifyContent:"center"}}>
                            <Stack direction="column">
                                <AvatarStyle color="#5e72e4" >가슴</AvatarStyle>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>가슴운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <AvatarStyle color="#2dce89" >삼두</AvatarStyle>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>삼두운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <AvatarStyle color="#ffc107" >복근</AvatarStyle>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>복근운동</Typography>
                            </Stack>
                    </Stack>
                    <Typography variant="h6" gutterBottom sx={{marginTop:"1em",fontWeight:"600",fontSize:"1.35rem"}}>대근육에서 소근육 순서로 진행</Typography>
                    <Skeleton animation="wave" sx={{"&.MuiSkeleton-root::after":{background: "linear-gradient(90deg, transparent, #5e72e4, transparent)"}}} />

            <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"center" }}>
                <Box sx={{ m: 1, position: 'relative' }}>
                <Fab
                    aria-label="save"
                   
                    sx={buttonSx}
                    onClick={handleButtonClick}
                >
                    {success ? <CheckIcon sx={{"&.MuiSvgIcon-root":{fontSize:"2.5rem"}}} /> : <h1 style={{fontWeight:"700"}}>시작</h1>}
                </Fab>
                {loading && (
                    <CircularProgress
                    size={90}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1,
                    }}
                    />
                )}
                </Box>
          </Box>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      </div>
      </Grow>
    );
}
export default BodySequence