import React,{useState,useEffect, useRef} from 'react';
import CardWrapper from "./CardWrapper";
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import ScrollTriggerButton from '../SameLayout/ScrollTriggerButton';
import AlertModal from "../SameLayout/AlertModal";

function Evaluation(){

    const [grade, setGrade] = useState(null);//레이팅용
    const [modalTime,setModalTime]=useState(false);//평가 항목에 점수부여가 없을때 띄우는 알림창
    const modalRef=useRef();

    const openModal=()=>{
        modalRef.current.click()
    }

    useEffect(()=>{
        if(modalTime){
            setTimeout(openModal,500);
        }
    },[modalTime])

    const Pstyle={
        fontSize:"1.0rem",
        fontWeight:"lighter",
        lineWeight:"1.0",
        marginBottom:"0"
    }

    const SpanStyle={
        backgroundColor:"#2dce89",
        borderColor:"#2dce89",
        color:"white",
        padding:"0.5rem 0.5rem",
        fontSize:"1.375rem",
        marginTop:"0.3em"
    }
    const badgeStyle={
        backgroundColor:"white"
    }

    const RatingStyle={
        margin:"auto",
        fontSize:"4.0rem"
    }

    const RecordBadgeStyle={
        fontWeight:"lighter",
        lineHeight:"2",
        color:"white",
        backgroundColor:"#2dce89"
    }
    return(
        <>
            <CardWrapper time={1000}>
                    <i className="far fa-calendar-check" style={{fontSize:"3.5em",color:"#5e72e4",marginTop:"0.2em"}}></i>
                    <h4 className="heading" style={{fontSize:"1.5rem"}}>수고하셨습니다!</h4>
                    <span className="badge badge-success" style={{fontSize:"1em",margin:"1em"}}>벤치프레스완료!</span>
                    <br></br>


                    <div className="alert alert-warning" role="alert" style={SpanStyle} >
                        <Stack direction="column">
                            <span className="badge badge-primary btn-lg" style={badgeStyle}>피드백</span> 
                            <i className="ni ni-air-baloon" style={{margin:"1em"}}></i>
                            <span className="alert-text" style={{fontSize:"1rem"}}>오늘의 벤치프레스의 운동 강도는<br></br> 적절했나요?</span>
                            <Rating
                                name="simple-controlled"
                                value={grade}
                                max={3}
                                onChange={(event, newValue) => {
                                setGrade(newValue);
                                setModalTime(false);
                                }}
                                sx={RatingStyle}
                            />
                            
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{justifyContent:"center"}}>
                                <p style={Pstyle}>어려움</p>
                                <p style={Pstyle}>적절함</p>
                                <p style={Pstyle}>쉬움</p>
                        </Stack>
                    </div>
                    <Accordion sx={{marginTop:"1em",backgroundColor:"#2dce89 !important"}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <Typography sx={{fontWeight:"600"}}>운동레코드</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{"&.MuiAccordionDetails-root":{padding: "0px 0px 0px"}}}>
                                <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                                    <i class="ni ni-like-2" style={{color:"black",fontSize:"3em"}}></i>
                                    <h2 style={{color:"black"}}><strong>벤치프레스 레코드</strong></h2>
                                    <Stack direction="column" spacing={2}>
                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>총운동시간:10분03초</span> 
                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>소모칼로리:200Kcal</span> 
                                    <Stack direction="row" spacing={1} style={{justifyContent:"center"}}>
                                        <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>마지막중량:50kg</span> 
                                        <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>오늘중량:60kg</span> 
                                    </Stack>
                                    </Stack>
                                    <span className="badge badge-success" style={{fontSize:"1em",marginTop:"2em"}}>근성장!(+10kg증량)</span>
                                </div>
                            </AccordionDetails>
                        </Accordion>
            </CardWrapper>

            <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-default">Default</button>
            <AlertModal where="confirm" />

            <ScrollTriggerButton content="다음운동" grade={grade} changeModalTime={setModalTime}/>

        </>
    );
}
export default Evaluation