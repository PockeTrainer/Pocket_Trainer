import React,{useState,useEffect, useRef} from 'react';
import CardWrapper from '../CameraTodayRoutine/CardWrapper';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Slider from 'react-slick';
import ListBox from '../History/ListBox';

import styled from "styled-components";

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}



function TodayRecord(){

    const [KcalButton_Clicked,set_KcalButton_Clicked] = useState(false);//칼로리보기 모드로 변환해주는 버튼
    
      const handleChange_kcal = () => {
        set_KcalButton_Clicked(prev=>!prev)
      };


   
    const Pstyled=styled('p')((props)=>({
        fontSize:"1.0rem",
        fontWeight:props.bold=="lighter"?"lighter":"600",
        lineWeight:"1.0",
        marginBottom:"0"
    }))

    const StyleSwitch={
        marginTop:"3rem",
        right:"0rem",
        position:"absolute"
    };

    const StyleProgress={
        paddingTop:"0rem"
    };

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

    const settings = {
        // autoplay:true,
        autoplaySpeed: 3000,
        arrows:false,
        dots:true,
        infinite: false,
        centerMode:false,
        centerPadding:"0px",
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

   const StyledSlider=styled(Slider)`
    .slick-list {
        margin:-8px !important;
    }
   `
    return(
        <>
            <CardWrapper time={1000}>
                    <span className="badge badge-success" style={{fontSize:"1em",margin:"0.5em"}}>목표달성률:90%</span>
                    <br></br>

                    <form className="mb-3 d-md-none" onClick={()=>alert("hi")}>
                        <div className="input-group input-group-rounded input-group-merge">
                            <input type="search" className="form-control form-control-rounded form-control-prepended" placeholder="ex)음식검색" aria-label="Search" />
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <span className="fa fa-search" />
                                </div>
                            </div>
                        </div>
                    </form>

                    <Pstyled bold="lighter">
                        03/25(금)
                    </Pstyled>

                    <StyledSlider {...settings}>
                        <ListBox/>
                        <ListBox/>
                        <ListBox/>
                    </StyledSlider>

                    <FormControlLabel
                        control={<Switch color="default" checked={KcalButton_Clicked} onChange={handleChange_kcal} />}
                        label="칼로리"
                        sx={StyleSwitch}
                    />

                    <div className="progress-wrapper" style={{...StyleProgress,marginTop:"5rem"}}>
                        <div className="progress-info">
                            <div className="progress-label">
                                <span style={{fontSize:"0.925rem"}}>탄수화물(g)</span>
                            </div>
                            <div className="progress-percentage">
                                <span>60%</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: '60%'}} />
                        </div>
                        <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom>섭취:1440Kcal/2400Kcal</Typography>
                    </div>

                    <div className="progress-wrapper" style={StyleProgress}>
                        <div className="progress-info">
                            <div className="progress-label">
                                <span style={{fontSize:"0.925rem"}}>단백질(g)</span>
                            </div>
                            <div className="progress-percentage">
                                <span>60%</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: '60%'}} />
                        </div>
                        <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom>섭취:1440Kcal/2400Kcal</Typography>
                    </div>

                    <div className="progress-wrapper" style={StyleProgress}>
                        <div className="progress-info">
                            <div className="progress-label">
                                <span style={{fontSize:"0.925rem"}}>지방(g)</span>
                            </div>
                            <div className="progress-percentage">
                                <span>60%</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: '60%'}} />
                        </div>
                        <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom>섭취:1440Kcal/2400Kcal</Typography>
                    </div>

                        
                    
            </CardWrapper>

           

        </>
    );
}
export default TodayRecord