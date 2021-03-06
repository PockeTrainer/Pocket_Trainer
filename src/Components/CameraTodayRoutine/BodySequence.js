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
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';

import Grow from '@mui/material/Grow';
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";


function sleep(ms){
  return new Promise((r)=>setTimeout(r,ms));
}

function BodySequence(){

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] =useState(false);
    const timer = useRef();

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const page_info=useSelector(state=>state.update_page_progress_reducer);//운동부위와 운동명 정보를 불러옴
    const{bodypart,part1}=routine_info;//부위정보 담아주기
    const first_exercise_eng_part=part1[0].eng_part;//영어부위명 하나 가져와서 url에서 쓸 예정

    

      const AvatarStyle=styled(Avatar)((props)=>({
        width:"4rem",
        height:"4rem",
        fontSize:"1.65rem",
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
        width:"5rem",
        height:"5rem"

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
            navigate("/routine/series/"+first_exercise_eng_part)
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
              <i className={"fas fa-clipboard-list fa-4x"+" "+styles.alert_mark}></i>
                        <div className={styles[`card-profile-stats`]+" "+"d-flex justify-content-center mt-md-5"}>
                          <h1 className= {"display-4"} style={{color:"black"}}><i className="ni ni-bold-right"></i>부위별순서</h1>
                        </div>
                        <hr/>
                    <Stack direction="row" spacing={4} sx={{marginTop:"3.5em",justifyContent:"center"}}>
                            <Stack direction="column">
                                <AvatarStyle color="#5e72e4" >{bodypart[0]}</AvatarStyle>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>{bodypart[0]}운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <AvatarStyle color="#2dce89" >{bodypart[1]}</AvatarStyle>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>{bodypart[1]}운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <AvatarStyle color="#ffc107" >{bodypart[2]}</AvatarStyle>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>{bodypart[2]}운동</Typography>
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
                    size={"5.2rem"}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: "0rem",
                        bottom:"0rem",
                        left: "0rem",
                        right:"0rem",
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