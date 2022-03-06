import React,{useState,useEffect} from "react";
import Slide from '@mui/material/Slide';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CardWrapper from "./CardWrapper";
import Typography from '@mui/material/Typography';
import ScrollTriggerButton from "../SameLayout/ScrollTriggerButton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { set_exercise_record } from "../../modules/action";

function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

function WeightCheckInstruction(){


    const id=sessionStorage.getItem("user_id");
    const exercise=useParams();//운동명 뽑아내기

    let is_first=true;//기본적으로 api호출 전까지 가지는 중량정보의 상태
    const [exercise_data,set_exercise_data]=useState("");//api로부터 받은 값을 저장할 것임

    const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const page_info=useSelector(state=>state.update_page_progress_reducer);//운동부위와 운동명 정보를 불러옴
    const{bodypart,part1,part2,part3}=routine_info;//부위정보 담아주기
    const{current_bodypart,current_exercise}=page_info;//현재페이지의 운동부위와 운동명 인덱스

    const now_exercise_name=eval("part"+parseInt(current_bodypart+1)+'['+current_exercise+']'+".name");//현재페이지의 한국어운동명을 넣어줌

    const dispatch=useDispatch();

    useEffect(async()=>{

            await axios.get(`http://127.0.0.1:8000/api/workout/userWorkoutInfo/${exercise.exercise_name}/${id}`)//루틴정보 불러와서 부위종류,part1,part2,part3 운동을 나눠서 데이터를 나눠줌
            .then((res) => {
                console.log(res.data);
                set_exercise_data(res.data);//state에 저장
                dispatch(set_exercise_record(res.data));//리덕스에서 쓸수있게함
                is_first=res.data.is_first;


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
        fontSize:"3em",
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
                    <h2 className="text-gray-dark display-4" >중량체크</h2>
                    {/* <hr></hr> */}
    
                    <div className="alert alert-warning" role="alert" style={SpanStyle}>
                        <span className="badge badge-primary btn-lg" style={badgeStyle}>현재중량</span> 
                        {
                            is_first
                            ?
                            <>
                                <i className="ni ni-chart-bar-32" style={iconStyle}></i>
                                <span className="alert-text" style={noDataAlertStyle}>해당운동 기록이 없습니다..</span>
                            </>
                            :
                            <span className="alert-text" style={{fontSize:"5em"}}><strong>20<span style={{fontSize:"0.5em"}}>KG</span></strong></span>
                        }
                        
                    </div>
    
                    <Typography variant="h6" gutterBottom sx={{marginTop:"1em",fontWeight:"600",fontSize:"1.35rem"}}>{now_exercise_name}</Typography>
                    {
                        is_first
                        ?
                        <span className="badge badge-primary btn-lg">최근중량체크:기록없음</span> 
                        :
                        <span className="badge badge-primary btn-lg">최근중량체크:{exercise_data.last_update_date}</span>
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
                        중량체크
                    </span>
                </Slide>
    
                {/* 하단 시작버튼 */}
                    <ScrollTriggerButton content="연습세트"/>

            </>
        );
   

}
export default WeightCheckInstruction