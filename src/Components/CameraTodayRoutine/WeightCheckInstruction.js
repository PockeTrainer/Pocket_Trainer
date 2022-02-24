import React,{useState,useEffect} from "react";
import Slide from '@mui/material/Slide';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CardWrapper from "./CardWrapper";
import styles from'../../CustomCss/ExerciseCounter/InfoCard.module.css';
import Typography from '@mui/material/Typography';
import ScrollTriggerButton from "../SameLayout/ScrollTriggerButton";

function WeightCheckInstruction(){


    const [checked, setChecked] = useState(false);

    const handleChange = () => {
    setChecked((prev) => !prev);
    };

    useEffect(()=>{
        handleChange();
        setTimeout(handleChange,3000);
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

    //위에는 스타일객체

        return(
            <>
    
                {/* 본체 */}
    
                <CardWrapper time={3000}>
                    <i className="far fa-clipboard" style={{fontSize:"4em",color:"#5e72e4"}}></i>
                    <h2 className="text-gray-dark display-4" >중량체크</h2>
                    <hr></hr>
    
                    <div className="alert alert-warning" role="alert" style={SpanStyle}>
                        <span className="badge badge-primary btn-lg" style={badgeStyle}>현재중량</span> 
                        <span className="alert-text" style={{fontSize:"5em"}}><strong>20<span style={{fontSize:"0.5em"}}>KG</span></strong></span>
                    </div>
    
                    <Typography variant="h6" gutterBottom sx={{marginTop:"1em",fontWeight:"600",fontSize:"1.35rem"}}>벤치프레스</Typography>
                    <span className="badge badge-primary btn-lg">최근중량체크:02/20</span> 
                </CardWrapper>
    
    
                {/* 처음 트랜지션 */}
    
                <Slide  mountOnEnter unmountOnExit direction="up"  in={checked}>
                <span className="badge badge-primary" style={partName}>
                    <FitnessCenterIcon sx={{color:"black",fontSize:"1.5em"}}/>벤치프레스
                </span>
                </Slide>
    
                <Slide  mountOnEnter unmountOnExit direction="up"  in={checked} {...(checked ? { timeout: 1000 } : {})}>
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