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

import { not_exercise_start } from '../../modules/action';

import { Pushup,Situp,Squat } from '../../ExercisesInfo/ExerciseInfo';
import { useDispatch,useSelector } from 'react-redux';

function CardLayout(){

    const exercise_start_page=useSelector(state=>state.Exercise_start_reducer.page);
    const dispatch=useDispatch();

    useEffect(()=>{
        if(exercise_start_page){//만약에 운동시작페이지가 켜져있는 상태로 유지되어있다면 다시 운동페이지모드를 꺼주자
            dispatch(not_exercise_start());
        }
    },[exercise_start_page])

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
                    <div className="container-fluid" >
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

                                                            
                                                        <span className="badge badge-secondary" style={{
                                                            fontSize:"2.1em",
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
                                            <Card exercise={Pushup}/>
                                            <Card exercise={Situp}/>
                                            <Card exercise={Squat}/>
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