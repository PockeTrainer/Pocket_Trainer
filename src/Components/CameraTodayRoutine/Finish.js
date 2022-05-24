import React,{useState,useEffect, useRef} from 'react';
import CardWrapper from "./CardWrapper";
import Stack from '@mui/material/Stack';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

import CheckIcon from '@mui/icons-material/Check';
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PartStepper from './PartStepper';

import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';


import Chip from '@mui/material/Chip';

import { routine_info,update_fail_list } from '../../modules/action'; 
import { useDispatch,useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

function Finish(){
 

    const id=sessionStorage.getItem("user_id");
    const today=new Date();
    const month=today.getMonth()+1;//오늘이 몇월인지
    const date=today.getDate();//오늘이 몇일인지

    const dispatch=useDispatch();
    const navigate=useNavigate();
    let clear_count=useRef(0);//몇개부위 클리어했는지 개수
    let clear_or_not=useRef([]);//각 부위별 성공여부를 담고있는다 ex)true,true,false

    const[clear_count_info,set_clear_count_info]=useState({//클리어한것과 클리어하지 않은 운동의 개수를 각각 담는다
        success:"",
        fail:"",
        fail_list:[]
    })

    const [key_for_result,set_key_for_result]=useState("AllClear");//결과값을 보여주기 위한 키값-디폴트는 올클로 해놓음
    const [how_long_workout,set_how_long_work_out]=useState({//얼마나 운동했는지 총 운동시간
        min:"",
        sec:""
    })

    const [how_long_break,set_how_long_break]=useState({//얼마나 휴식했는지 총 휴식시간
        min:"",
        sec:""
    })

    const [checked, setChecked] = useState(false);//부위별 클리어 기록 부분 transition

    const [clicked_part,setClicked_part]=useState("part1");//각 부위별 무엇을 눌렀는지 버튼state
    const [tmp_clicked_part,setTmpClicked_part]=useState("part1");//각 부위별 무엇을 눌렀는지 임시저장 버튼state
    const count=useRef(1);

    const routine=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const{bodypart,part1,part2,part3}=routine;//부위정보 담아주기


    //다시 업데이트 된 운동최신 데이터를 가져옴

    const isAllClear=(part)=>{//해당부위가 클리어 됐는지 확인해줌
        for(let exercise of part){
            if(!exercise.Info_from_api.is_clear){
                return false
            }
        }
        return true;
    }

    //이와같이 다시 새롭게 호출해주는 이유는 서버로 부터 제일 최신의 정보를 가져와주기위해서
    useEffect(async()=>{
        let bodypart=new Set();//부위는 중복되는게 있기에 set 선택-중복안되도록
        let part1=[];
        let part2=[];
        let part3=[];
        let where_to_put;
        let workout_time=0;//전체운동시간을 받을거임
        let break_time=0;//전체휴식시간을 받을거임
        let success=0;//성공개수
        let fail=0;//실패개수
        let fail_list=[];//실패한 운동리스트
        let module= require("../../ExercisesInfo/ExerciseInfo.js");
        let Exercise=module.Exercise;

        await axios.get(`http://127.0.0.1:8000/workout/todayRoutine/${id}`)//루틴정보 불러와서 부위종류,part1,part2,part3 운동을 나눠서 데이터를 나눠줌
        .then((res) => {

            console.log(res.data.todayRoutine);
            let tmp=res.data.todayRoutine;

            tmp.map((info,index)=>{
               bodypart.add(info.workout_name.body_part);

                if(0<=index<=2){
                    where_to_put=part1;
                }

               if(info.workout_name.body_part==="하체"){
                    where_to_put=part2;
                }
               else if(index===3){
                   where_to_put=part2
               }

               if(info.workout_name.body_part==="복근"){
                   where_to_put=part3
               }
                //운동객체 생성 후 상수정보 까지 합치기

               window[info.workout_name.workout_name]=new Exercise(info,module[info.workout_name.workout_name]);//각각의 api결과+상수정보까지 합침
               where_to_put.push(eval(info.workout_name.workout_name));

               //각 파트별 나눠진 객체들을 리덕스로 공통으로 쓰이게 올리기
               dispatch(routine_info([...bodypart],part1,part2,part3));


               if(info.workout_time!==null){//즉 활동시간이 있었던 운동에 대해서 시간 합치기
                    let tmp=info.workout_time.split(":");
                    let sec_converted=parseInt(tmp[1])*60+parseInt(tmp[2]);//초로 환산
                    workout_time+=sec_converted;//초를 다 합한다
               }
               if(info.workout_set!==null){//즉 활동세트수가 존재한다면?
                    let break_unit;
                    if(info.workout_name.workout_name==="bench_press"||info.workout_name.workout_name==="incline_press"||info.workout_name.workout_name==="squat"||info.workout_name.workout_name==="dumbbell_shoulder_press"||info.workout_name.workout_name==="leg_press"){
                        break_unit=100;
                    }
                    else if(info.workout_name.workout_name==="side_lateral_raise"||info.workout_name.workout_name==="reverse_pec_dec_fly"||info.workout_name.body_part==="이두"||info.workout_name.body_part==="삼두"){
                        break_unit=40;
                    }
                    else{
                        break_unit=90;
                    }

                    break_time+=(info.workout_set-1)*break_unit;//총 휴식시간=운동한세트수-1*휴식단위시간
                    
               }

               if(info.is_clear){//해당운동이 클리어를 했다
                    success+=1;
               }
               else{//클리어 하지 못했다
                fail+=1;
                fail_list.push(eval(info.workout_name.workout_name));
                //실패한 운동들의 객체를 담아준다.
               }

               console.log(workout_time)

            })
        })
        .catch((err) => {
            console.log(err)
        })


        console.log(break_time)
        set_how_long_work_out({//초로 환산된 총 운동시간을 다시 분,초로 나눠줌
            ...how_long_workout,
            min:parseInt(workout_time/60),
            sec:workout_time%60
        });

        set_how_long_break({//초로 환산된 총 휴식시간을 
            ...how_long_break,
            min:parseInt(break_time/60),
            sec:break_time%60
        });
        
        set_clear_count_info({//클리어한 운동,실패한 운동 개수를 담는다
            ...clear_count_info,
            success:success,
            fail:fail,
            fail_list:fail_list
        });

        dispatch(update_fail_list(fail_list));//리덕스에 클리어하지 못한 운동들에 대하여 올려놓음

        console.log(bodypart);
        console.log(part1);
        console.log(part2);
        console.log(part3);


        for(let i=1;i<=3;i++){//각 파트별로 성공여부를 따지는데 클리어한 부위개수를 파악
           let tmp=isAllClear(eval("part"+i));
           clear_or_not.current.push(tmp);//각 파트별 성공여부 넣어줌
           if(tmp){
                clear_count.current+=1;
           }
        }

        if(clear_count.current===3){
            set_key_for_result("AllClear");
        }
        else if(1<=clear_count.current && clear_count.current<=2){
            set_key_for_result("FinishYet");
        }
        else{
            set_key_for_result("NotAtAll");
        }

        


    },[])



   

    //핸들러들
    const handleShowClearTab = () => {//부위별 클리어 기록 부분 용도
        setChecked((prev) => !prev);
    };


  

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
    const AllCleariconStyle={
            color: "#2dce89",
            fontSize: "3.5rem",
            marginTop: "0.2em"
        
    }

    const FinishYeticonStyle={
        color: "#ffc107",
        fontSize: "3.5rem",
        marginTop: "0.2em"
    
    }

    const NotAtAlliconStyle={
        color: "#5e72e4",
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
        part1:bodypart[0],
        part2:bodypart[1],
        part3:bodypart[2]
    }

    const ResultIcon={
        AllClear:{
            TotalResult:<CheckCircleIcon sx={AllCleariconStyle}/>,
            message:<span className="badge badge-success" style={{fontSize:"1em",margin:"1em"}}>올클리어!</span>,
        },
        FinishYet:{
            TotalResult:<NewReleasesIcon sx={FinishYeticonStyle}/>,
            message:<span className="badge badge-success" style={{fontSize:"1em",margin:"1em"}}>{clear_count.current}파트 클리어!</span>
        },
        NotAtAll:{
            TotalResult:<CancelIcon sx={NotAtAlliconStyle}/>,
            message:<span className="badge badge-primary" style={{fontSize:"1em",margin:"1em"}}>실패!</span>,
        }
    }


    return(
        <>
            <CardWrapper time={1000}>
                    {ResultIcon[key_for_result].TotalResult}
                    <h4 className="heading" style={{fontSize:"1.5rem"}}>{month}/{date}운동</h4>
                    {ResultIcon[key_for_result].message}
                    <br></br>

                    <Stack direction="row" spacing={4} sx={{marginTop:"0.5em",justifyContent:"center"}}>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle} onClick={()=>setTmpClicked_part("part1")}>
                                    <AvatarStyle color="#5e72e4" >{clear_or_not[0]?<CheckIcon/>:<ClearIcon/>}</AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>{bodypart[0]}운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle}  onClick={()=>setTmpClicked_part("part2")}>
                                    <AvatarStyle color="#2dce89" >{clear_or_not[1]?<CheckIcon/>:<ClearIcon/>}</AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>{bodypart[1]}운동</Typography>
                            </Stack>
                            <Stack direction="column">
                                <Button sx={PartButtonStyle}  onClick={()=>setTmpClicked_part("part3")}>
                                    <AvatarStyle color="#ffc107" >{clear_or_not[2]?<CheckIcon/>:<ClearIcon/>}</AvatarStyle>
                                </Button>
                                <Typography sx={{ color:"black",lineHeight:"1.5",fontWeight:"500" }}>{bodypart[2]}운동</Typography>
                            </Stack>
                    </Stack>


                    <Zoom in={checked}>
                        <div>
                            <div className="alert alert-warning" role="alert" style={SpanStyle} >
                                <Stack direction="column">
                                    <BadgeStyle part={clicked_part} className="badge badge-primary btn-lg">{content[clicked_part]}</BadgeStyle>
                                    <PartStepper where={clicked_part}/>
                                </Stack>
                            </div>
                        </div>
                    </Zoom>



                           
                    

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
                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>총운동시간:{how_long_workout.min}분{how_long_workout.sec}초</span> 
                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>총휴식시간:{how_long_break.min}분{how_long_break.sec}초</span> 
                                    <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>소모칼로리:200Kcal</span> 
                                    <Stack direction="row" spacing={1} style={{justifyContent:"center"}}>
                                        <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>클리어운동:{clear_count_info.success}개</span> 
                                        <span className="badge badge-success btn-lg" style={RecordBadgeStyle}>SKIP운동:{clear_count_info.fail}개</span> 
                                    </Stack>
                                    </Stack>
                                    <span className="badge badge-secondary" style={{fontSize:"1.0em",marginTop:"1em",color:"#fb6340",display:"block"}}>스킵한운동</span>
                                    {clear_count_info.fail_list.map((exercise_name,index)=>(
                                        <>
                                            <Chip key={index} label={exercise_name.name} sx={ChipStyle}  />
                                        </>
                                    ))}
                                    
                                    {
                                        clear_count_info.fail_list.length===0 &&
                                        <>
                                             <Typography variant="h6" gutterBottom component="div" sx={{fontSize:"1.0rem",fontWeight:"600"}}>
                                                스킵한운동이 없습니다
                                            </Typography>
                                        </>
                                    }
                                   
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <div className="modal-footer" style={{padding:"0rem",marginTop:"2em",justifyContent:"space-between"}}>
                                    <button onClick={()=>navigate("/history")}  type="button" className="btn btn-primary"><i className="ni ni-calendar-grid-58"></i>히스토리</button>
                                    <button onClick={()=>{navigate("/main/routine")}}  type="button" className="btn btn-primary" data-dismiss="modal"><i className="ni ni-button-power"></i>나가기</button>
                        </div>
            </CardWrapper>


        </>
    );
}
export default Finish