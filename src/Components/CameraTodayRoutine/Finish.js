import React,{useState,useEffect, useRef} from 'react';
import CardWrapper from "./CardWrapper";
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AlertModal from "../SameLayout/AlertModal";

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PartStepper from './PartStepper';

import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Chip from '@mui/material/Chip';

import SelectBar from "../SameLayout/SelectBar"

function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

function Finish(){
 
    const [modalTime,setModalTime]=useState(false);//평가 항목에 점수부여가 없을때 띄우는 알림창
    const modalRef=useRef();//모달창용
    const [checked, setChecked] = useState(false);//부위별 클리어 기록 부분 transition

    const [clicked_part,setClicked_part]=useState("part1");//각 부위별 무엇을 눌렀는지 버튼state
    const [tmp_clicked_part,setTmpClicked_part]=useState("part1");//각 부위별 무엇을 눌렀는지 임시저장 버튼state
    const count=useRef(1);


   

    //핸들러들
    const handleShowClearTab = () => {//부위별 클리어 기록 부분 용도
        setChecked((prev) => !prev);
    };

    const openModal=()=>{
        modalRef.current.click()
    }

  

    //useEffect
    useEffect(()=>{
        if(count.current===1){
            count.current+=1;
            handleShowClearTab();//처음에는 그냥 띄워주기
            return;
        }
        else{
            handleShowClearTab();//다시 닫고
            sleep(500).then(()=>setClicked_part(tmp_clicked_part));//이제 본 눌린 버튼 state에 값을 넣어준다-->그럼 이후에 다시 랜더링되서 zoom 랜더링이 가려지고 새롭게되서 굳

            setTimeout(handleShowClearTab,500);//열어주기
        }
    },[tmp_clicked_part])



    //각종 스타일객체들
    const iconStyle={
            color: "#2dce89",
            fontSize: "3.5rem",
            marginTop: "0.2em"
        
    }

    const AvatarStyle=styled(Avatar)((props)=>({
        width:"60px",
        height:"60px",
        fontFamily:"Nanum Gothic",
        fontWeight:"700",
        backgroundColor:props.color,
        margin:"auto"
      }));

    const Pstyle={
        fontSize:"1.0rem",
        fontWeight:"lighter",
        lineWeight:"1.0",
        marginBottom:"0"
    }

    const SpanStyle={
        backgroundColor:"#f7fafc",
        borderColor:"#2dce89",
        color:"white",
        padding:"0.5rem 0.5rem",
        fontSize:"1.375rem",
        marginTop:"0.9em"
    }
    
    const AccordionSpanStyle={
        backgroundColor:"#f7fafc",
        borderColor:"#2dce89",
        color:"white",
        padding:"0.5rem 0.5rem",
        fontSize:"1.375rem",
        marginTop:"0em",
        marginBottom:"0em"
    }

    const BadgeStyle=styled('span')((props)=>({
        backgroundColor:props.part==="part1"?"#5e72e4":(props.part==="part2"?"#2dce89;":"#ffc107"),
        marginBottom:"1em",
        color:"white"
        
    }))


    const RecordBadgeStyle={
        fontWeight:"lighter",
        lineHeight:"2",
        color:"white",
        backgroundColor:"#2dce89"
    }

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

    const EastIconStyle={
        marginTop:"1em",
        color:"black"
    }

    const gainWeight={
        fontSize:"1.0em",
        marginTop:"0.3em",
        color:"#212529",
        backgroundColor:"#e9ecef"
    }

    const ChipStyle={
        fontFamily:"Noto Sans KR",
        backgroundColor:"#fb6340",
        color:"white"
    }

    const content={
        part1:"가슴",
        part2:"삼두",
        part3:"복근"
    }

    return(
        <>
            <CardWrapper time={1000}>
                    <CheckCircleIcon sx={iconStyle}/>
                    <h4 className="heading" style={{fontSize:"1.5rem"}}>03/01운동</h4>
                    <span className="badge badge-success" style={{fontSize:"1em",margin:"1em"}}>클리어!</span>
                    <br></br>

                    <Stack direction="row" spacing={4} sx={{marginTop:"0.5em",justifyContent:"center"}}>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part1")}>
                                    <AvatarStyle color="#5e72e4" ><CheckIcon/></AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>가슴운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle}  onClick={()=>setTmpClicked_part("part2")}>
                                    <AvatarStyle color="#2dce89" ><CheckIcon/></AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>삼두운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle}  onClick={()=>setTmpClicked_part("part3")}>
                                    <AvatarStyle color="#ffc107" ><ClearIcon/></AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>복근운동</Typography>
                            </Stack>
                    </Stack>


                    <Zoom in={checked}>
                        <div>
                            <div className="alert alert-warning" role="alert" style={SpanStyle} >
                                <Stack direction="column">
                                    <BadgeStyle part={clicked_part} className="badge badge-primary btn-lg">{content[clicked_part]}</BadgeStyle>
                                    <PartStepper where="part1"/>
                                </Stack>
                            </div>
                        </div>
                    </Zoom>




                    {/* <Accordion sx={{marginTop:"1em",backgroundColor:"#2dce89 !important"}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <Typography sx={{fontWeight:"600"}}>중량변화</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{"&.MuiAccordionDetails-root":{padding: "0px 0px 0px"}}}>
                                <div className="alert alert-warning" role="alert" style={AccordionSpanStyle} >
                                    <Stack direction="column" >
                                        <SelectBar/>
                                        <Stack direction="row" spacing={4} sx={{marginTop:"0.5em",justifyContent:"center"}}>
                                            <Stack direction="column">
                                                <AvatarStyle color="#ffc107" >65kg</AvatarStyle>
                                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>2022.02.29</Typography>
                                            </Stack>
                                            <EastIcon sx={EastIconStyle}/>
                                            <Stack direction="column">
                                                <AvatarStyle color="#ffc107" >75kg</AvatarStyle>
                                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>2022.03.01</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <span className="badge badge-secondary" style={gainWeight}>+10kg증량</span>
                                </div>
                            </AccordionDetails>
                    </Accordion> */}

                           
                    

                    <Accordion sx={{marginTop:"1em",backgroundColor:"#2dce89 !important"}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <Typography sx={{fontWeight:"600"}}>Today레코드</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{"&.MuiAccordionDetails-root":{padding: "0px 0px 0px"}}}>
                                <div className="alert alert-secondary" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
                                    
                                    <Stack direction="column" spacing={2}>
                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>총운동시간:10분03초</span> 
                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>총휴식시간:05분03초</span> 
                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>소모칼로리:200Kcal</span> 
                                    <Stack direction="row" spacing={1} style={{justifyContent:"center"}}>
                                        <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>클리어운동:5개</span> 
                                        <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>SKIP운동:2개</span> 
                                    </Stack>
                                    </Stack>
                                    <span className="badge badge-secondary" style={{fontSize:"1.0em",marginTop:"1em",color:"#fb6340",display:"block"}}>스킵한운동</span>
                                    <Chip label="크런치" sx={ChipStyle}  />
                                    <Chip label="덤벨킥백" sx={ChipStyle}  />
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <div className="modal-footer" style={{padding:"0rem",marginTop:"2em",justifyContent:"space-between"}}>
                                    <button  type="button" className="btn btn-primary"><i className="ni ni-calendar-grid-58"></i>히스토리</button>
                                    <button  type="button" className="btn btn-primary" data-dismiss="modal"><i className="ni ni-button-power"></i>나가기</button>
                        </div>
            </CardWrapper>

            <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-default">Default</button>
            <AlertModal where="warning" />


        </>
    );
}
export default Finish