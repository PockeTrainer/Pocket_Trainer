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
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Evaluation(){


    const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const page_info=useSelector(state=>state.update_page_progress_reducer);//운동부위와 운동명 정보를 불러옴
    const{bodypart,part1,part2,part3}=routine_info;//부위정보 담아주기
    const{current_bodypart,current_exercise,is_First}=page_info;//현재페이지의 운동부위와 운동명 인덱스

    const now_exercise=eval("part"+parseInt(current_bodypart+1)+"["+current_exercise+"]");//현재스텝의 운동정보를 가지고 있는다 ex)벤치프레스 객체
    const exercise_name=useParams();

    const how_long=useSelector(state=>state.update_how_long_reducer);//얼마나 운동했는지 시간정보
    const{min,sec}=how_long;//분 초

    const change_weight_info=useSelector(state=>state.change_current_weight_reducer);
    const{current_weight,current_time,current_cnt,clicked_button,clicked_count}=change_weight_info;

    const last_record=useSelector(state=>state.update_last_record_reducer.last_record);//마지막 중량,시간,개수 기록
    const[record_min,setRecordMin]=useState("");//변화 전 순수 api로부터 받아온 저번기록
    const[record_sec,setRecordSec]=useState("");
    const[today_record,setTodayRecord]=useState({
        min:"",
        sec:""
    });

    const [finalResult,setFinalResult]=useState({//변화량 가지고 메시지 보여줄때
        content:"",
        state:""
    });

    const [where_to_go,set_where_to_go]=useState("");//어디로 다음으로 갈지

    const [grade, setGrade] = useState(null);//레이팅용
    const [modalTime,setModalTime]=useState(false);//평가 항목에 점수부여가 없을때 띄우는 알림창
    const modalRef=useRef();

    const openModal=()=>{
        modalRef.current.click()
    }

    useEffect(()=>{
        let result;//오늘기록-현재기록의 차값
        let unit;//단위
        if(exercise_name.exercise_name==="plank"){
            setRecordMin(parseInt(last_record/60));
            setRecordSec(parseInt(last_record%60));

            setTodayRecord({
                ...today_record,
                ["min"]:parseInt(current_time/60),
                ["sec"]:parseInt(current_time%60)
            })

            result=current_time-last_record;//시간기록 차
            unit="초";

        }
        else if(exercise_name.exercise_name==="seated_knees_up"||exercise_name.exercise_name==="crunch"){
            result=current_cnt-last_record;//개수기록 차
            unit="개";
        }
        else{
            result=current_weight-last_record;//중량기록 차
            unit="kg";
        }

        if(result>0){
            setFinalResult({
                ...finalResult,
                content:"근성장!"+'('+"+"+result+unit+"증가"+")",
                state:"grow"
            });
        }
        else if(result===0){
            setFinalResult({
                ...finalResult,
                content:"근력유지!(증가및감소없음)",
                state:"same"
            });
        }
        else{
            setFinalResult({
                ...finalResult,
                content:"근손실!"+'('+"-"+result+unit+"감소"+")",
                state:"none_grow"
            });
        }

    },[])

    useEffect(()=>{
        let next_exercise=eval('part'+parseInt(current_bodypart+1)+"["+parseInt(current_exercise+1)+"]");//다음운동객체 갖고오기
        if(next_exercise===undefined){
            if(current_bodypart===2){
                set_where_to_go("종료");//애초에 다음부위가 존재하지 않으면 final로 가야함
            }
            else{
                set_where_to_go("다음부위");
            }
            
        }
        else{
            set_where_to_go("다음운동");
        }
    },[])

    const cssStyle={
        grow:"badge badge-success",
        same:"badge badge-primary",
        none_grow:"badge badge-danger"
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
                    <span className="badge badge-success" style={{fontSize:"1em",margin:"1em"}}>{now_exercise.name}완료!</span>
                    <br></br>


                    <div className="alert alert-warning" role="alert" style={SpanStyle} >
                        <Stack direction="column">
                            <span className="badge badge-primary btn-lg" style={badgeStyle}>피드백</span> 
                            <i className="ni ni-air-baloon" style={{margin:"1em"}}></i>
                            <span className="alert-text" style={{fontSize:"1rem"}}>오늘의 {now_exercise.name}의 운동 강도는<br></br> 적절했나요?</span>
                            <Rating
                                name="simple-controlled"
                                value={grade}
                                max={3}
                                onChange={(event, newValue) => {
                                setGrade(newValue);
                                setModalTime(false);//값이 존재한다는거니까 모달은 꺼주자
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
                                    <i className="ni ni-like-2" style={{color:"black",fontSize:"3em"}}></i>
                                    <h2 style={{color:"black"}}><strong>{now_exercise.name} 레코드</strong></h2>
                                    <Stack direction="column" spacing={2}>
                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>총운동시간:{min}분{sec}초</span> 
                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>소모칼로리:200Kcal</span> 
                                    <Stack direction="row" spacing={1} style={{justifyContent:"center"}}>
                                        {
                                         
                                            exercise_name.exercise_name==="plank"
                                            ?
                                                <>
                                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>마지막타임셋:{record_min}분{record_sec}초</span> 
                                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>오늘타임셋:{today_record.min}분{today_record.sec}초</span> 
                                                </>
                                            :
                                            (exercise_name.exercise_name==="crunch"||exercise_name.exercise_name==="seated_knees_up"
                                            ?
                                                <>
                                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>마지막개수:{last_record}개</span> 
                                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>오늘개수:{current_cnt}개</span> 
                                                </>
                                            :
                                            <>
                                                <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>마지막중량:{last_record}kg</span> 
                                                <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>오늘중량:{current_weight}kg</span> 
                                            </>
                                            )
                                        }
                    

                                        
                                    </Stack>
                                    </Stack>
                                    <span className={cssStyle[finalResult.state]} style={{fontSize:"1.5em",marginTop:"2em"}}>{finalResult.content}</span>
                                </div>
                            </AccordionDetails>
                        </Accordion>
            </CardWrapper>

            <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-default">Default</button>
            <AlertModal where="warning" />

            <ScrollTriggerButton content={where_to_go} grade={grade} changeModalTime={setModalTime}/>

        </>
    );
}
export default Evaluation