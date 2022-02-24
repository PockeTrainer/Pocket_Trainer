import React,{useState,useEffect} from 'react';
import Grow from '@mui/material/Grow';

import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

import Instruction from './Instruction';
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import BodySequence from './BodySequence';
import CardSlider from './CardSlider';
import WeightCheckInstruction from './WeightCheckInstruction';
import PracticeStep from './PracticeStep';

import { useSelector } from 'react-redux';
import MainStep from './MainStep';
function CardLayout(){

    const testState=useSelector(state=>state.testState_reducer.testState);//운동을 시작한 여부에 따라서 css변경때문에
    console.log(testState)
    const containerStyle={
        paddingRight:"10px",
        paddingLeft:"10px"
    }
    const skipButton={
        float:"right",
        marginTop:"5px",
        marginBottom:"5px",
        color:"white",
        fontSize:"1.2em"
    }
    const backArrowStyle={
        float: "left",
        fontSize: "2em",
        marginTop:"5px",
        color: "white"
    }

    const subListHeader={
        paddingLeft:"5px",
        paddingRight:"5px",
        marginLeft:"-19px",
        marginRight:testState==="completed"?"-3px":"-12px",
        borderRadius:"5px",
        marginTop:"0px",
        lineHeight:"10px",
        backgroundColor:"#f7fafc52"
    };

    const settings = {
        // autoplay:true,
        autoplaySpeed: 3000,
        arrows:false,
        dots:false,
        infinite: true,
        centerMode:true,
        centerPadding:"10px",
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    //슬라이더용
  

    const [checked, setChecked] = useState(false);


    const handleChange = () => {
        setChecked((prev) => !prev);
    };
  
    useEffect(()=>{
        handleChange();
    },[])
//transition용  
        return(
            <div>
                 <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8" data-component="HeaderForCard">
                    <div className="container-fluid" style={testState==="completed"?containerStyle:null}>
                            <div className="header-body">
                                <div class="container-fluid" style={testState==="completed"?containerStyle:null} >
                                    <div className="row" data-component="ProfileCardLayout">

                                        <CssBaseline />
                                        <List sx={{ mb: 2 ,marginTop:"-3.85em",paddingTop:"14px"}}>

                                    
                                            <ListSubheader sx={subListHeader}>
                                            <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
                                                    {...(checked ? { timeout: 1000 } : {})}>
                                                        <div>
                                                <div className="col-xl-4 order-xl-2 mb-3 mb-xl-0" data-component="ProfileCard">
                                                        <div className={"card-profile"+"card"} style={{border:"0px"}}>
                                                        
                                                        <div className="card-body pt-0 pt-md-4" style={{padding:"0rem"}}>
                                                            <div className="row">
                                                            <div className="col" style={{paddingLeft:"5px",paddingRight:"5px"}}>
                                                                
                                                                <ArrowCircleLeftIcon sx={backArrowStyle}/>
                                                                    
                                                                <span class="badge badge-secondary" style={{
                                                                    fontSize:"2.1em",
                                                                    color:"#5e72e4",
                                                                    backgroundColor:"#f8f9fa",
                                                                    borderRadius:"1.375rem"
                                                                }}>체크사항</span>
                                                                <span class="badge badge-default" style={skipButton}>건너뛰기</span>

                                                            </div>
                                                            </div>
                                                            
                                                        </div>

                                                        
                                                        </div>
                                                </div>
                                                </div>
                                            </Grow>
                                            </ListSubheader>
                                            
                                            
                                            
                                            <div className="col-xl-8 order-xl-1" style={{paddingLeft:"1px",paddingRight:"1px"}} >
                                            
                                                        <Routes>
                                                            <Route path="caution" element={<Instruction/>}/>
                                                            <Route path="series" element={<BodySequence/>}/>
                                                            <Route path="series/:bodypart" element={<CardSlider/>}/>
                                                            <Route path="weightcheck/:exercise_name" element={<WeightCheckInstruction/>}/>
                                                            <Route path="weightcheck/practice/:exercise_name" element={<PracticeStep/>}/>
                                                            <Route path="exercise/:exercise_name" element={<MainStep/>}/>
                                                        </Routes>
                                                        

                                            </div>
                                        </List>
                                    </div>
                                    
                            </div> 
                    </div>
                </div>
            </div>
        </div>
        );
    
}
export default CardLayout;