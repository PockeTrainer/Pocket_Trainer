import React,{useEffect,useState,useRef} from "react";
import Camera from "../ExerciseCounter/WithCamera/Camera";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from '@mui/material/Skeleton';
import Grow from '@mui/material/Grow';
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CampaignIcon from '@mui/icons-material/Campaign';
import $ from "jquery";

import AlertModal from "../SameLayout/AlertModal";
import {reset_send_wrong_posture,reset_send_angle,reset_send_posture_of_exercise,timeToModal,how_long,set_exercise_record,last_record,set_current_weight,set_current_time,set_current_cnt,plank_time_set} from "../../modules/action"

import axios from "axios";
import LinearWithValueLabel from "./LinearWithValueLabel";
import { styled } from "@mui/system";

function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}



var ready_audio = new Audio('/audios/ready1.mp3');
var start_audio=new Audio('/audios/start1.mp3');

function MainStep(){
    const id=sessionStorage.getItem("user_id");
    let posture_wrong_set=useRef(new Set());//잘못된 자세를 담아준다

    const testState=useSelector(state=>state.testState_reducer.testState);//카메라가 성공적으로 불러와졌는지 여부
    const count=useRef(1);//카운트용
    const timeId=useRef();//운동시간용
    const modalRef=useRef()//브레이크타임 모달창
    const previous_testState=useRef();//이전의 testState를 담고있다

    const [checked, setChecked] = useState(false);//전체 카메라화면 transition
    const [showChecked, setShowChecked] = useState(false);//세트수 transition
    const [message,setMessage]=useState(false);//화면에 띄우는 메시지 transition
    const [plank_message,set_plank_message]=useState(false);//플랭크시 사용되는 메시지 transition
    
    

    const exercise_name=useParams();//url에서 운동명 가져오기

    const dispatch=useDispatch();

    const current_weight_info=useSelector(state=>state.change_current_weight_reducer);//연습스텝에서 설정한 무게를 보여준다
    const {current_weight,current_time,current_cnt}=current_weight_info;//중량,시간,개수를 받아둔다
    const count_result=useSelector(state=>state.exercise_count_reducer.pushup);//여기는 나중에 각 운동에 대한 모델에 의존한 개수 결과를 보여줘야한다..지금은 푸시업으로 예시
    const howmanySet=useSelector(state=>state.change_set_reducer.current_set)//진행세트 수
    const modalTime=useSelector(state=>state.change_timeToModal_reducer.modalTime)//모딜창을 열지 말지..

    const[sec,setSec]=useState(0);//스탑워치 만들려고..
    const[min,setMin]=useState(0);
    const time=useRef(0);



    const [plank_min,set_plank_min]=useState(0);//플랭크시 필요한 분-weightcheck를 했을 때,안했을 때에는 이미 포맷이 정해져있음
    const [plank_sec,set_plank_sec]=useState(0);//플랭크시 필요한 초-weightcheck를 했을 때,안했을 때에는 이미 포맷이 정해져있음
    const [plank_timer_type,set_plank_timer_type]=useState("pre_timer");//플랭크 준비용 타이머(pre_timer),본 타이머(main_timer) 
    const plank_timeId=useRef();//플랭크용 timeId
    const plank_time_state=useSelector(state=>state.plank_time_update_reducer.plank_state);//디폴트로는 true로 되어있음
    const plank_time=useRef(5);//플랭크 시간-준비시간 5초로 시작함
    //위에는 각종 상수및 state



    const [grid_show,set_grid_show]=useState(false);//그리드 보여주기 transition
    const [message_effect,set_message_effect]=useState(false);//준비,시작 transition

    const module=require("../../ExercisesInfo/ExerciseInfo");

     //그리드에서 쓸 준비타임 타이머
     const timerId=useRef(null);
     const [grid_timer_sec,set_Grid_timer_sec]=useState(10);//10초 준비시간
 
     //자세교정멘트를 불러옴
     const wrong_posture=useSelector(state=>state.update_wrong_posture_reducer.text);
     const [show_posture,set_show_posture]=useState(false);

     //잘못된 자세들을 보내줌
     const what_wrong_posture=useSelector(state=>state.update_what_wrong_posture_reducer.posture);


     const [key_for_css,set_key_for_css]=useState("gridStyle");//운동마다 다른 그리드 스타일-디폴트는 gridStyle

     const set_count=useRef(12);//기본적으로 해줘야할 한세트의 개수

    const handleGridShow=()=>{//그리드 보여주기
        set_grid_show(prev=>!prev);
    };

    const handleMessage=()=>{//그리드 뜰 때의 메시지
        set_message_effect(prev=>!prev);
    }

    const handleShowPosture=()=>{//자세교정 멘트를 뜰 때 보여줌
        set_show_posture(prev=>!prev);
    }

    const showGridAndMessge=()=>{
        if (exercise_name.exercise_name==="bench_press"||exercise_name.exercise_name==="incline_press"||exercise_name.exercise_name==="seated_knees_up"||exercise_name.exercise_name==="side_laterl_raise"){
            handleGridShow();//그리드 열어주기-졸작시연에서는 위에 그리드밖에 준비를 못해 이것만 보여줄거임
            handleMessage();//그리드랑 같이 뜨는 메시지
            timerId.current = setInterval(() => {
                set_Grid_timer_sec(prev=>prev-1);
            }, 1000);
        }
    }

    //메시지 띄워주는 용도
    const handleMessageChange=()=>{
        setMessage((prev)=>!prev);
    }

    const handleShowSetChange = () => {//세트수 보여주는용도
        setShowChecked((prev) => !prev);
    };

    const handlePlankMessageChange=()=>{//플랭크 메시지 보여주는 용도
        set_plank_message(prev=>!prev);
    }
    const handleChange = () => {
        setChecked((prev) => !prev);
        };
  
    const openModal=()=>{
        modalRef.current.click()
    }

    const today=new Date();
    const today_date_form=today.getFullYear()+"-"+parseInt(today.getMonth()+1)+"-"+today.getDate();

  

    const sendData=async()=>{
            let reuslt_format="";
            for(const pose of [...posture_wrong_set.current]){
                reuslt_format+=pose+","
            }
            await axios.put(`/workout/workoutResult/${exercise_name.exercise_name}/${today_date_form}/${id}`,{
                workout_set:howmanySet,
                workout_time:"00:"+parseInt(time.current/60)+":"+parseInt(time.current%60),
                wrong_poses:reuslt_format

            })//각 세트 끝날 때마다 현재진행 세트 수와 현재까지의 운동시간을 보내준다
            .then((res) => {
                console.log(res.data);

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const sendStartWorkoutTime=async()=>{//운동 시작시간을 서버로 보내준다
        await axios.post(`/workout/startDateTime/${exercise_name.exercise_name}/${today_date_form}/${id}`)//맨 처음에 들어왔을 때 운동시작 시간을 보내준다 ex)날짜형식
            .then((res) => {
                console.log(res.data);

            })
            .catch((err) => {
                console.log(err)
            })
    };

    const getDataFromServer=async()=>{//서버로부터 해당운동의 정보를 가져온다-weightcheck를 안했을 때 사용
        await axios.get(`/workout/userWorkoutInfo/${exercise_name.exercise_name}/${id}`)
        .then((res) => {
                console.log(res.data);
                dispatch(set_exercise_record(res.data.is_first));//리덕스에서 쓸수있게함=is_first값

                let tmp_info=localStorage.getItem(exercise_name.exercise_name);//해당 운동에 대한 이전 저장해둔 값을 가져온다

                if(exercise_name.exercise_name==="plank"){
                    let format=res.data.target_time.split(":");
                    let sec_converted=parseInt(format[1])*60+parseInt(format[2]);//초로 환산해줌


                    dispatch(set_current_time(sec_converted));//리덕스에 올리기
                    localStorage.setItem(exercise_name.exercise_name,JSON.stringify({...JSON.parse(tmp_info),new:sec_converted}));//기존데이터+새로운 데이터로 업데이트
                    dispatch(last_record(sec_converted));//마지막 기록을 혹시나 체크단계에서 변경될것을 대비해 저장해둠
                }
                else if(exercise_name.exercise_name==="seated_knees_up"||exercise_name.exercise_name==="crunch"){
                    dispatch(set_current_cnt(res.data.target_cnt));//리덕스에 올리기
                    localStorage.setItem(exercise_name.exercise_name,JSON.stringify({...JSON.parse(tmp_info),new:res.data.target_cnt}));//기존데이터+새로운 데이터로 업데이트
                    dispatch(last_record(res.data.target_cnt));
                }
                else{
                    dispatch(set_current_weight(res.data.target_kg));//리덕스에 올리기
                    localStorage.setItem(exercise_name.exercise_name,JSON.stringify({...JSON.parse(tmp_info),new:res.data.target_kg}));//기존데이터+새로운 데이터로 업데이트
                    dispatch(last_record(res.data.target_kg))
                }

        })
        .catch((err) => {
            console.log(err)
        })
    }


    const start=()=>{//운동 스탑워치용
        timeId.current=setInterval(()=>{
            setMin(parseInt(time.current/60));
            setSec(time.current%60);
            time.current+=1;
        }
        ,1000)
    }

    const plankTimerStart=()=>{//플랭크 타이머용 
        plank_timeId.current=setInterval(()=>{
            set_plank_min(parseInt(plank_time.current/60));
            set_plank_sec(plank_time.current%60);
            plank_time.current-=1;
        }
        ,1000)
    }

    

    useEffect(()=>{
        if(count.current===1){
            //$('.modal-backdrop').innerHTML.replace(/(<div>|<\/div>)/gi, "");
           //console.log($('.modal-backdrop').innerHTML)/
            
            handleChange();// 전체화면트랜지션

            dispatch(reset_send_angle());
            dispatch(reset_send_posture_of_exercise());
            dispatch(reset_send_wrong_posture());
           
            if (exercise_name.exercise_name!=="bench_press"&&exercise_name.exercise_name!=="incline_press"&&exercise_name.exercise_name!=="side_lateral_raise"){
                set_key_for_css("gridStyle");
               
            }else{
                set_key_for_css(exercise_name.exercise_name+"_Grid");

            }

            if(exercise_name.exercise_name==="crunch"){
                set_count.current=current_cnt;//크런치는 설정한 개수를 가져와 설정
            }
            else if(exercise_name.exercise_name==="side_lateral_raise"){//사레레는 20개로 고정 되어있음
                set_count.current=20;
            }
            else{
                set_count.current=12;//그 외의 운동에 대해서는 12개
            }
            
            start();//스탑워치 시작
            previous_testState.current=testState;//이전값이랑 비교하기 위해 담아둔다
            setTimeout(handleMessageChange,1000);
            sendStartWorkoutTime();//운동시작시간을 서버로 보냄
            if(current_weight===1000 && current_cnt===1000 && current_time===1000){//즉 weighcheck 단계를 건너뛰었음을 의미함
                getDataFromServer();//서버로부터 예전 정보가져오기-중량체크를 안하면 current_weight정보가 없음 아무 정보가 없으니,,
            }

        }

        if(count_result===set_count.current||(plank_time.current===5 && plank_time_state===false)){//여기는 임시로 지금 개수를 1개 일 때 모달창 띄우게함
            dispatch(timeToModal())//모달창을 이제 쓰겠다 그러니 타이머를 돌려라 이런뜻..
            return;
        }

        if(previous_testState.current!==testState){//전에 testState랑 값이 달라졌다면 로딩메시지를 가려줘라..
            setTimeout(handleMessageChange,1000);
            // 처음에는 문자보여주고 두번째 랜더링시 문자다시 숨기기
            previous_testState.current=testState
        }
    },[testState,count_result,plank_time_state])

    useEffect(()=>{

        if(count.current===1){
            count.current+=1;
            return;
        }
        if(modalTime){
            if(howmanySet===5){
                dispatch(how_long(min,sec));//마지막 스텝에서는 총 운동시간을 리덕스에 올려준다.
            }
            clearInterval(timeId.current);//스탑워치를 잠시 멈추주기 위해 interval함수 초기화
            timeId.current=null;
            
            sendData();//api로 지금까지 진행상황 전송

            setTimeout(openModal,1000);//모달창 열어주기 
        }
        else{
            console.log("여기 몇번 들어와?")
            start();//다시 스탑워치 시작
        }
    },[modalTime])

    useEffect(()=>{
        handleShowSetChange();//각 몇 세트인지 알려주는 transition
        setTimeout(handleShowSetChange,1500);
    },[howmanySet])

    useEffect(()=>{//플랭크일 때만 타이머가 가동됨
        if(exercise_name.exercise_name==="plank"&&plank_time_state&&!modalTime){
            plankTimerStart();//플랭크 타이머 시작
            handlePlankMessageChange();//열기
            return () => clearInterval(plank_timeId.current);
        }
    },[plank_time_state,modalTime])



    useEffect(()=>{
        if(exercise_name.exercise_name==="plank"){
            if(plank_time.current===0 && plank_timer_type==="pre_timer"){
                handlePlankMessageChange();//닫기
            }
            if(plank_time.current<0){
                clearInterval(plank_timeId.current);
                plank_timeId.current=null;
                if(plank_timer_type==="pre_timer"){
                    plank_time.current=5;//이 부분에 current_time으로 넣어줄 것
                    handlePlankMessageChange();//열기
                    setTimeout(handlePlankMessageChange,1000);
                    plankTimerStart();//다시 재시작
                    set_plank_timer_type("main_timer");//본 타이머로 들어감을 알림
                }
                else{//본 스텝에서 끝났을 때
                    dispatch(plank_time_set(false));//플랭크 타이머가 다 돌아갔음을 알림
                    plank_time.current=5;
                    set_plank_timer_type("pre_timer");
                }

            }
        }

    },[plank_sec])


    useEffect(()=>{
        if(grid_timer_sec===0){
            console.log('아아아?');
            clearInterval(timerId.current);
            timerId.current=null;
            handleGridShow();
            handleMessage();
            start_audio.play().catch(e => {//시작 음성
                console.log(e);
            });
        }
    },[grid_timer_sec])

    useEffect(()=>{
        if(testState==="completed"){
            showGridAndMessge();
            ready_audio.play().catch(e => {//준비 음성
                console.log(e);
            });
        }
    },[testState])

    useEffect(()=>{
        if(wrong_posture!==""&&grid_timer_sec==0){
            handleShowPosture();
            setTimeout(handleShowPosture,1000);
        }
    },[wrong_posture,grid_timer_sec])//잘못된 자세가 인식될 때마다 멘트를 쳐줌

    useEffect(()=>{
        if(what_wrong_posture!==""){
            posture_wrong_set.current.add(what_wrong_posture);//잘못된 자세들을 set에 담아줌
            console.log("하이");
        }
    },[what_wrong_posture])
  

    const setName={
        position:"absolute",
        color:"white",
        zIndex:"1",
        fontSize:"3em",
        top:"5em",
        left:"0",
        right:"0",
        backgroundColor:"#2dce8996"
    }


    const gridStyle={//그리드 보여주기 transition
        position:"absolute",
        color:"#5e72e4",
        zIndex:"1",
        fontSize:"1em",
        bottom:"8em",
        backgroundColor:"rgb(247 250 252 / 0%)",
        lineHeight:"1.5em",
        width:"100%",
        overflow:"hidden"
    }

    const bench_press_Grid={
        position:"absolute",
        color:"#5e72e4",
        zIndex:"1",
        fontSize:"1em",
        bottom:"8em",
        backgroundColor:"rgb(247 250 252 / 0%)",
        lineHeight:"1.5em",
        width:"85%",
        overflow:"hidden"
    }

    const incline_press_Grid={
        position:"absolute",
        color:"#5e72e4",
        zIndex:"1",
        fontSize:"1em",
        bottom:"8em",
        backgroundColor:"rgb(247 250 252 / 0%)",
        lineHeight:"1.5em",
        width:"82%",
        overflow:"hidden"
    }

    const side_lateral_raise_Grid={
        position:"absolute",
        color:"#5e72e4",
        zIndex:"1",
        fontSize:"1em",
        bottom:"10em",
        backgroundColor:"rgb(247 250 252 / 0%)",
        lineHeight:"1.5em",
        width:"53%",
        overflow:"hidden"
    }

    const GridMessageTimerStyle={
        backgroundColor:"rgb(255 255 255 / 65%)",
        borderColor:"rgba(45, 206, 137, 0)",
        color:"#ff011a",
        padding:"0.5rem 1.5rem",
        fontSize:"1.875rem",
        marginTop:"0.3em",
        position:"absolute",
        top:"7rem"
    }
    const subtitle={
        position:"absolute",
        color:"#5e72e4",
        zIndex:"1",
        fontSize:"2em",
        top:"5em",
        backgroundColor:"#f7fafc",
        lineHeight:"1.5em"
    }

    const plankMessageStyle={
        position:"absolute",
        color:"#13ff9a",
        zIndex:"1",
        fontSize:"2.5rem",
        top:"8em",
        backgroundColor:"rgb(45 206 137 / 0%)",
        lineHeight:"1.5em"
    }

    const MainStep={
        position:"absolute",
        color:"#2dce89",
        zIndex:"1",
        fontSize:"1em",
        bottom:"0",
        backgroundColor:"rgb(247 250 252 / 0%)",
        lineHeight:"1.5em"
    }

    const ShowCount={
        position:"absolute",
        color:"#2dce89",
        zIndex:"1",
        fontSize:"2em",
        top:"0",
        right:"0",
        lineHeight:"1.5em"
    }

    const ShowWeight={
        position:"absolute",
        color:"#2dce89",
        zIndex:"1",
        fontSize:"2em",
        top:"0",
        left:"0",
        lineHeight:"1.5em"
    }

    const Pstyled=styled('p')((props)=>({
        fontSize:props.size?props.size:"1.0rem",
        fontWeight:props.bold=="lighter"?"lighter":"600",
        lineWeight:"1.0",
        marginBottom:"0"
    }));


    const SpanStyle={
        backgroundColor:"#2dce89",
        borderColor:"#2dce89",
        color:"white",
        padding:"0.5rem 6.1rem",
        fontSize:"1.875rem",
        marginTop:"0.3em"
    }

    const badgeStyle={
        backgroundColor:"white"
    }
    //Transition용

    const skeleton={
        width:"100%",
        height:"80vh",
        "&.MuiSkeleton-root::after":{background: "linear-gradient(90deg, transparent, #5e72e4, transparent)"},
        visibility:testState==="completed"?"hidden":"visible"
    }

    const content={
        false:"불러오는중..",
        completed:"준비완료!",
    };

    const plank_message_content={
        pre_timer:"엎드리세요!",
        main_timer:"시작!"
    }

    console.log(what_wrong_posture);
    return(
        <>
        <div style={{position:"relative"}}>

        
        {/* 카메라부분 */}
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}>
            <div style={{position:"relative"}}>

                
                <Camera display={testState==="completed"?"yes":"no"} />

                <Skeleton animation="wave" variant="rectangular" sx={skeleton}/>

                <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                   <span className="badge" style={MainStep}>{howmanySet}세트중</span>
               </div>

               {//여기 플랭크로 이름 다 나중에 바꿔주기
                   exercise_name.exercise_name!=="plank"
                   &&
                   <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                   }}>
                       <span className="badge badge-primary" style={ShowCount}>{count_result}개</span>
                   </div>

               }
              

               <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                   
                   {
                       exercise_name.exercise_name==="plank"
                       &&
                       <span className="badge badge-primary" style={{...ShowWeight,right:"0px"}}>{plank_min===0?plank_sec+"초":plank_min+"분"+plank_sec+"초"}</span>
                   }
                   {
                       exercise_name.exercise_name==="seated_knees_up"
                       &&
                       <span className="badge badge-primary" style={ShowWeight}>{current_cnt}개</span>
                   }
                   {
                       exercise_name.exercise_name==="crunch"
                       &&
                       <span className="badge badge-primary" style={ShowWeight}>{current_cnt}개</span>
                   }
                   {
                       (exercise_name.exercise_name==="pec_dec_fly"||exercise_name.exercise_name==="lat_pull_down"||exercise_name.exercise_name==="seated_row"||exercise_name.exercise_name==="reverse_pec_dec_fly"||exercise_name.exercise_name==="cable_push_down"||exercise_name.exercise_name==="arm_curl"||exercise_name.exercise_name==="leg_extension")
                        &&
                        <span className="badge badge-primary" style={ShowWeight}>{current_weight}Lbs</span>
                   }
                    {
                       exercise_name.exercise_name!=="plank" &&exercise_name.exercise_name!=="seated_knees_up" &&exercise_name.exercise_name!=="crunch"&&exercise_name.exercise_name!=="pec_dec_fly"&&exercise_name.exercise_name!=="lat_pull_down"&&exercise_name.exercise_name!=="seated_row"&&exercise_name.exercise_name!=="reverse_pec_dec_fly"&&exercise_name.exercise_name!=="cable_push_down"&&exercise_name.exercise_name!=="arm_curl"&&exercise_name.exercise_name!=="leg_extension"
                       ?
                       <span className="badge badge-primary" style={ShowWeight}>{current_weight}KG</span>
                       :
                       null
                   } 
                   
                  <LinearWithValueLabel/>
               </div>
               
            </div>
        </Grow>


        
        {/* 스탑워치정보부분 */}
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}>
                <div style={{position:"relative"}}>
                    <div className="alert alert-warning" role="alert" style={SpanStyle} >
                        <Stack direction="column">
                            <span className="badge badge-primary btn-lg" style={badgeStyle}>운동시간</span> 
                            {
                            modalTime
                                ?
                                <span className="alert-text" ><strong>휴식세트</strong></span>
                                :
                                <span className="alert-text" >{time.current>=60?<strong>{min}분{sec}초</strong>:<strong>{sec}초</strong>}</span>
                              }
                        </Stack>
                    </div>
                </div>
        </Grow>


        {
            exercise_name.exercise_name==="plank"
            &&
            <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                <Zoom in={plank_message}><span className="badge badge-primary" style={plankMessageStyle}><CampaignIcon sx={{color:"white",fontSize:"1.5em"}}/>{plank_message_content[plank_timer_type]}</span></Zoom>
            </div>

        }
        

        <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                <Zoom in={message}><span className="badge badge-primary" style={subtitle}>{content[testState]}</span></Zoom>
        </div>

        {
            (exercise_name.exercise_name==="bench_press"||exercise_name.exercise_name==="incline_press"||exercise_name.exercise_name==="seated_knees_up"||exercise_name.exercise_name==="side_laterl_raise")
            &&
            <>
            
            <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
               }}>
                <Zoom in={grid_show}>
                  {/* <span className="badge badge-primary" style={gridStyle}>
                      <img src={module[exercise_name.exercise_name+"_content"].grid}/>
                  </span> */}

                  <div className="badge badge-primary" style={eval(key_for_css)}>
                      <img src={module[exercise_name.exercise_name].grid} style={{maxWidth:"100%",display:"block",objectFit:"cover"}}/>
                  </div>
                </Zoom>
            </div>

            <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
            }}>
                <Zoom in={message_effect}>
                    <div className="alert alert-warning" role="alert" style={GridMessageTimerStyle} >
                        <span className="badge badge-primary" >
                            {grid_timer_sec}초
                        </span>
                        <Pstyled bold="etc" size="1.5rem">
                            그리드에 몸을 맞춰주세요
                        </Pstyled>
                    </div>
                </Zoom>
            </div>
            </>
            
        }
        <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
            }}>
                <Zoom in={show_posture}>
                    <div className="alert alert-warning" role="alert" style={GridMessageTimerStyle} >
                        <Pstyled bold="etc" size="1.5rem">
                           잘못된 자세
                        </Pstyled>
                    </div>
                </Zoom>
            </div>

        <Slide  mountOnEnter unmountOnExit direction="up"  in={showChecked}>
                <span className="badge badge-primary" style={setName}>
                    <FitnessCenterIcon sx={{color:"black",fontSize:"1.5em"}}/>{howmanySet}세트
                </span>
        </Slide>
            
       
        <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-default">Default</button>
        <AlertModal where="breakTime"  />

        </div>
        </>
    );
}
export default MainStep