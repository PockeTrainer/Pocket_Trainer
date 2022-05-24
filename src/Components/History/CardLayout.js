import React,{useRef,useState,useEffect} from "react";

import CssBaseline from '@mui/material/CssBaseline';

import List from '@mui/material/List';

import ListSubheader from '@mui/material/ListSubheader';

import Grow from '@mui/material/Grow';
import Calandar from './Calandar'
import Demo from "./TestScheduler";

import { not_exercise_start } from "../../modules/action";
import { useDispatch,useSelector } from "react-redux";


function CardLayout(props){

    const exercise_start_page=useSelector(state=>state.Exercise_start_reducer.page);//본 메인 운동스텝에 들어갔는지 여부로 상단메뉴를 결정해줌
    const dispatch=useDispatch();

    useEffect(()=>{//혹시나 뒤로가기나 이런걸로 다시 왔을때를 대비해 운동모드를 꺼준다
        if(exercise_start_page){
            dispatch(not_exercise_start());
        }
    },[exercise_start_page])

    const padding_style={
        paddingRight:"7px",
        paddingLeft:"7px"
    }



    return(

    <div>
        <div className="header bg-gradient-primary pt-5 pt-md-8" data-component="HeaderForCard" style={{minHeight:"100vh"}}>
              <div className="container-fluid" style={padding_style}>
                <div className="header-body">
                    <div className="container-fluid" style={padding_style} >
                        <div className="row" data-component="ProfileCardLayout">
                            <CssBaseline />
                            <List sx={{ mb: 2 ,marginTop:"-3.95em",paddingTop:"14px"}}>
                                
                                
                                <div className="col-xl-8 order-xl-1" style={{paddingLeft:"1px",paddingRight:"1px"}} >
                                   <Calandar/>
                                   {/* <Demo/> */}
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