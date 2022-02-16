import React,{useState,useEffect} from 'react';
import Grow from '@mui/material/Grow';

import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

import Instruction from './Instruction';
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import BodySequence from './BodySequence';




function CardLayout(){

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
        marginRight:"-12px",
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

    //Transition용

        return(
            <div>
                 <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8" data-component="HeaderForCard">
              <div className="container-fluid">
                <div className="header-body">
                    <div class="container-fluid" >
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
                                                    </div>
                                                    </div>
                                                    
                                                </div>

                                                
                                                </div>
                                        </div>
                                        </div>
                                </Grow>
                                </ListSubheader>
                                
                                <div className="col-xl-8 order-xl-1" style={{paddingLeft:"1px",paddingRight:"1px"}} >
                                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
                                        {...(checked ? { timeout: 1000 } : {})}>
                                        <div>
                                            <Routes>
                                                <Route path="caution" element={<Instruction/>}/>
                                                <Route path="series" element={<BodySequence/>}/>
                                            </Routes>
                                            
                                        </div>
                                        
                                    </Grow>
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