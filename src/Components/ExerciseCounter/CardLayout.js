import React,{useState,useEffect} from 'react';
import Footer from '../SameLayout/Footer';
import InfoCard from './InfoCard';
import ResultCard from './ResultCard';
import Grow from '@mui/material/Grow';

import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

import Card from "./Card";
import Slider from 'react-slick';

import { pushup,situp,squat } from '../../ExercisesInfo/ExerciseInfo';

function CardLayout(){
    const subListHeader={
        bgcolor:"background.paper",
        paddingLeft:"5px",
        paddingRight:"5px",
        marginLeft:"-12px",
        marginRight:"-12px",
        borderRadius:"5px",
        marginTop:"4px",
        lineHeight:"10px",
        backgroundColor:"#fff0"
    };

    const settings = {
        // autoplay:true,
        autoplaySpeed: 3000,
        arrows:false,
        dots:false,
        infinite: true,
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
                                                        {/* 여기 위까지는 고정틀 */}

                                                       {/* <h1 className='display-4 text-gray'>체력측정</h1>  */}
                                                            
                                                        <span class="badge badge-secondary" style={{
                                                            fontSize:"2.3em",
                                                            color:"#5e72e4",
                                                            backgroundColor:"#f8f9fa",
                                                            borderRadius:"1.375rem"
                                                        }}>체력측정</span>
                                                    </div>
                                                    </div>
                                                    
                                                </div>

                                                
                                                </div>
                                        </div>
                                        </div>
                                </Grow>
                                </ListSubheader>
                                {/* 여기다가 카드 */}
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
                                        {...(checked ? { timeout: 1000 } : {})}>
                                    <div>
                                        <Slider {...settings}>
                                            <Card exercise={pushup}/>
                                            <Card exercise={situp}/>
                                            <Card exercise={squat}/>
                                        </Slider>
                                    </div>
                                </Grow>
                                
                                <div className="col-xl-8 order-xl-1" style={{paddingLeft:"1px",paddingRight:"1px"}} >
                                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
                                        {...(checked ? { timeout: 1000 } : {})}>
                                        <div>
                                            <InfoCard/>
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