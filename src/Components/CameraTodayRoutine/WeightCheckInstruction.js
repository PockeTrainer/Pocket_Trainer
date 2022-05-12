import React,{useState,useEffect,useRef} from "react";
import Slide from '@mui/material/Slide';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CardWrapper from "./CardWrapper";
import Typography from '@mui/material/Typography';
import ScrollTriggerButton from "../SameLayout/ScrollTriggerButton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { set_exercise_record,last_record} from "../../modules/action";

function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

function WeightCheckInstruction(){


    let result=useRef({});//플랭크,크런치,싯티드니업과 etc에 따른 출력데이터 다르게..
    let key_for_result=useRef("");//키 값으로 쓰일 것의 이름
    let key_for_unit=useRef("");//각 운동별로 단위들을 위한 키값
    const id=sessionStorage.getItem("user_id");
    const exercise=useParams();//운동명 뽑아내기

    let is_first=useRef(true);//기본적으로 api호출 전까지 가지는 중량정보의 상태
    const [exercise_data,set_exercise_data]=useState("");//api로부터 받은 값을 저장할 것임

    const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const page_info=useSelector(state=>state.update_page_progress_reducer);//운동부위와 운동명 정보를 불러옴
    const{bodypart,part1,part2,part3,fail_list}=routine_info;//부위정보 담아주기
    const{current_bodypart,current_exercise}=page_info;//현재페이지의 운동부위와 운동명 인덱스


    const now_exercise_name=eval("part"+parseInt(current_bodypart+1)+'['+current_exercise+']'+".name");//현재페이지의 한국어운동명을 넣어줌
    const dispatch=useDispatch();

    const unit={//운동에 따른 단위
        count_demand:"개",
        weight_demand:"KG",
        pound_demand:"lbs",
        etc:""
    }

    useEffect(async()=>{

            await axios.get(`http://127.0.0.1:8000/api/workout/userWorkoutInfo/${exercise.exercise_name}/${id}`)
            .then((res) => {
                let time_format_result="0초";
                console.log(res.data);
                set_exercise_data(res.data);//state에 저장
                dispatch(set_exercise_record(res.data.is_first));//리덕스에서 쓸수있게함=is_first값
                is_first.current=res.data.is_first;

                if(exercise.exercise_name==="plank"){
                    let format=res.data.target_time.split(":");
                    let sec_converted=parseInt(format[1])*60+parseInt(format[2]);//초로 환산해줌

                    if(format[1]==="00"){
                        time_format_result=format[2]+"초";
                    }
                    else{
                        time_format_result=format[1]+"분"+format[2]+"초";
                    }
                    key_for_unit.current="etc";
                    dispatch(last_record(sec_converted));//마지막 기록을 혹시나 체크단계에서 변경될것을 대비해 저장해둠
                    localStorage.setItem(exercise.exercise_name,JSON.stringify({//로컬스토리지에 저장시 꺼둬 값이 안지워짐 last:마지막 데이터 new:곧 들어올 신상데이터
                        last:sec_converted,
                        new:""
                    }));
                }
                else if(exercise.exercise_name==="seated_knees_up"||exercise.exercise_name==="crunch"){
                    key_for_unit.current="count_demand";
                    dispatch(last_record(res.data.target_cnt));
                    localStorage.setItem(exercise.exercise_name,JSON.stringify({//로컬스토리지에 저장시 꺼둬 값이 안지워짐 last:마지막 데이터 new:곧 들어올 신상데이터
                        last:res.data.target_cnt,
                        new:""
                    }));
                }
                else if(exercise.exercise_name==="pec_dec_fly"||exercise.exercise_name==="lat_pull_down"||exercise.exercise_name==="seated_row"||exercise.exercise_name==="reverse_pec_dec_fly"||exercise.exercise_name==="cable_push_down"||exercise.exercise_name==="arm_curl"||exercise.exercise_name==="leg_extension"){
                    key_for_unit.current="pound_demand";
                    dispatch(last_record(res.data.target_kg));//대신 이때는 이 숫자는 파운드인걸로 유념하자
                    localStorage.setItem(exercise.exercise_name,JSON.stringify({//로컬스토리지에 저장시 꺼둬 값이 안지워짐 last:마지막 데이터 new:곧 들어올 신상데이터
                        last:res.data.target_kg,
                        new:""
                    }));
                    
                }
                else{
                    key_for_unit.current="weight_demand";
                    dispatch(last_record(res.data.target_kg))
                }

                result.current={
                    plank:time_format_result,
                    crunch:res.data.target_cnt,
                    seated_knees_up:res.data.target_cnt,
                    etc:res.data.target_kg
                }

                if(exercise.exercise_name!=="plank"&&exercise.exercise_name!=="crunch"&&exercise.exercise_name!=="seated_knees_up"){
                    key_for_result.current="etc";
                }
                else{
                    key_for_result.current=exercise.exercise_name;
                }


            })
            .catch((err) => {
                console.log(err)
            })
    
    
    },[])
   

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const handleStepShow = () => {
    setChecked1((prev) => !prev);
    };

    const handleButtonShow = () => {
        setChecked2((prev) => !prev);
        };

    useEffect(()=>{
        handleStepShow();
        setTimeout(handleStepShow,3000);
        sleep(3000).then(()=>handleButtonShow());
    },[])

    //위에는 맨 처음 트랜지션 

    const partName={
        position:"absolute",
        color:"white",
        zIndex:"9999",
        fontSize:"2.3rem",
        top:"1em",
        left:"0",
        right:"0",
        backgroundColor:"#2dce8996"
    }

    const subtitle={
        position:"absolute",
        color:"white",
        zIndex:"9999",
        fontSize:"2em",
        bottom:"0",
        left:"0",
        right:"0",
        backgroundColor:"#2dce8996",
        lineHeight:"1.5em"
    }

    const SpanStyle={
        backgroundColor:"#5e72e4",
        borderColor:"#5e72e4",
        color:"white"
    }

    const badgeStyle={
        margin:"auto",
        fontWeight:"lighter",
        display:"block",
        color:"white"
    }


    const noDataAlertStyle={
        fontSize: "1.5em",
        marginTop: "1em",
        fontWeight: "500",
        marginBottom: "2em"
    }

    const iconStyle={
        marginTop:"1em",
        display:"block",
        fontSize:"2em"
    }
    //위에는 스타일객체


        return(
            <>
    
                {/* 본체 */}
    
                <CardWrapper time={3000}>
                    <i className="far fa-clipboard" style={{fontSize:"4em",color:"#5e72e4"}}></i>
                    {
                    exercise.exercise_name==="plank"
                    ?
                    <h2 className="text-gray-dark display-4" >시간체크</h2>
                    :
                    (exercise.exercise_name==="crunch"||exercise.exercise_name==="seated_knees_up"
                    ?
                    <h2 className="text-gray-dark display-4" >세트당횟수</h2>
                    :
                        <h2 className="text-gray-dark display-4" >중량체크</h2> 
                    )
                    }
    
                    <div className="alert alert-warning" role="alert" style={SpanStyle}>

                            {
                        exercise.exercise_name==="plank"
                        ?
                            <span className="badge badge-primary btn-lg" style={badgeStyle}>현재세트당 시간</span>
                        :
                        (exercise.exercise_name==="crunch"||exercise.exercise_name==="seated_knees_up"
                        ?
                            <span className="badge badge-primary btn-lg" style={badgeStyle}>현재세트당 횟수</span>
                        :
                            <span className="badge badge-primary btn-lg" style={badgeStyle}>현재중량</span> 
                        )
                        }

                        {
                            is_first.current
                            ?
                            <>
                                <i className="ni ni-chart-bar-32" style={iconStyle}></i>
                                <span className="alert-text" style={noDataAlertStyle}>해당운동 기록이 없습니다..</span>
                            </>
                            :
                            <span className="alert-text" style={{fontSize:"4.5em",margin:"1rem 0"}}><strong>{result.current[key_for_result.current]}<span style={{fontSize:"0.5em"}}>{unit[key_for_unit.current]}</span></strong></span>
                        }
                        
                    </div>
    
                    <Typography variant="h6" gutterBottom sx={{marginTop:"1em",fontWeight:"600",fontSize:"1.35rem"}}>{now_exercise_name}</Typography>
                    {
                        is_first.current
                        ?
                        <span className="badge badge-primary btn-lg">최근체크:기록없음</span> 
                        :
                        <span className="badge badge-primary btn-lg">최근체크:{exercise_data.last_update_date}</span>
                    } 
                </CardWrapper>
    
    
                {/* 처음 트랜지션 */}
    
                <Slide  mountOnEnter unmountOnExit direction="up"  in={checked1}>
                <span className="badge badge-primary" style={partName}>
                    <FitnessCenterIcon sx={{color:"black",fontSize:"1.5em"}}/>{now_exercise_name}
                </span>
                </Slide>
    
                <Slide  mountOnEnter unmountOnExit direction="up"  in={checked1} {...(checked1 ? { timeout: 1000 } : {})}>
                    <span className="badge badge-primary" style={subtitle}>
                    {
                    exercise.exercise_name==="plank"
                    ?
                    "시간체크"
                    :
                    (exercise.exercise_name==="crunch"||exercise.exercise_name==="seated_knees_up"
                    ?
                    "세트당횟수"
                    :
                        "중량체크"
                    )
                    }
    
                    </span>
                </Slide>
    
                {/* 하단 시작버튼 */}
                    <ScrollTriggerButton content="연습세트"/>

            </>
        );
   

}
export default WeightCheckInstruction