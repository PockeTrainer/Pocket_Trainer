import React,{useState,useEffect} from "react";
import Slider from "react-slick";
import SpecificBody from "./SpecificBody";
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import PartStepper from "./PartStepper";
import ScrollTriggerButton from "../SameLayout/ScrollTriggerButton";
import CardWrapper from "./CardWrapper"
import { useSelector } from "react-redux";
import axios from "axios";

import "../../CustomCss/Slider.css";

function CardSlider(){
    const [checked, setChecked] = useState(false);

    const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const page_info=useSelector(state=>state.update_page_progress_reducer);//운동부위와 운동명 정보를 불러옴
    const{bodypart,part1,part2,part3}=routine_info;//부위정보 담아주기
    const{current_bodypart,current_exercise}=page_info;//현재페이지의 운동부위와 운동명 인덱스

    const id=sessionStorage.getItem("user_id");
    const [info,set_info]=useState([]);//무게정보를 담는 state


    useEffect(()=>{
        let all_info=[];
        eval('part'+parseInt(current_bodypart+1)).map(async(exercise)=>{
            await axios.get(`http://127.0.0.1:8000/api/workout/userWorkoutInfo/${exercise.eng_name}/${id}`)//해당운동의 정보를 불러와줌
            .then((res) => {
                console.log(res.data)
                all_info.push(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    
        });
       set_info(all_info);
    },[])

    console.log(info);

    const handleChange = () => {
    setChecked((prev) => !prev);
    };

    useEffect(()=>{
        handleChange();
        setTimeout(handleChange,3000);
    },[])

    const partName={
        position:"absolute",
        color:"white",
        zIndex:"9999",
        fontSize:"6em",
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
        left:"0",
        right:"0",
        backgroundColor:"#2dce8996",
        lineHeight:"1.5em"
    }
    const settings = {
        // autoplay:true,
        autoplaySpeed: 3000,
        arrows:false,
        dots:true,
        infinite: false,
        centerMode:true,
        centerPadding:"6px",
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return(
        <>
        <Slider {...settings}>
            {eval("part"+parseInt(current_bodypart+1)).map((exercise,index)=>(
                <SpecificBody key={index} exercise={exercise} info={info[index]}/>
            ))}
        </Slider>

        <Slide  mountOnEnter unmountOnExit direction="up"  in={checked}>
            <span className="badge badge-primary" style={partName}>
                <FitnessCenterIcon sx={{color:"black",fontSize:"1.0em"}}/>{bodypart[current_bodypart]}
            </span>
        </Slide>
        <Slide  mountOnEnter unmountOnExit direction="up"  in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <span className="badge badge-primary" style={subtitle}>

                {eval("part"+parseInt(current_bodypart+1)).map((exercise,index)=>(
                    <>
                    {exercise.name}<br key={index}></br>
                    </>
                ))}
                
            </span>
       </Slide>

       <CardWrapper time={3000}>
           <PartStepper where="BodyPart"/>
       </CardWrapper>
       <ScrollTriggerButton content={"사전체크"}/>
        </>
    );
}
export default CardSlider