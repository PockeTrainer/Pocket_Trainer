import React,{useState,useEffect} from "react";
import Slider from "react-slick";
import SpecificBody from "./SpecificBody";
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import PartStepper from "./Stepper";
import StepperWrapper from "./StepperWrapper";

import ScrollTriggerButton from "../SameLayout/ScrollTriggerButton";
function CardSlider(){
    const [checked, setChecked] = useState(false);

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
            <SpecificBody/>
            <SpecificBody/>
            <SpecificBody/>
        </Slider>

        <Slide  mountOnEnter unmountOnExit direction="up"  in={checked}>
            <span className="badge badge-primary" style={partName}>
                <FitnessCenterIcon sx={{color:"black",fontSize:"1.0em"}}/>가슴
            </span>
        </Slide>
        <Slide  mountOnEnter unmountOnExit direction="up"  in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <span className="badge badge-primary" style={subtitle}>
                벤치프레스<br></br>인클라인프레스<br></br>펙덱플라이
            </span>
       </Slide>

       <StepperWrapper/>
       <ScrollTriggerButton content={"벤치시작"}/>
        </>
    );
}
export default CardSlider