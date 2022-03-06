import React,{useState,useEffect} from 'react';
import Grow from '@mui/material/Grow';

import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

import Instruction from './Instruction';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import BodySequence from './BodySequence';
import CardSlider from './CardSlider';
import WeightCheckInstruction from './WeightCheckInstruction';
import PracticeStep from './PracticeStep';

import { useDispatch, useSelector } from 'react-redux';
import MainStep from './MainStep';
import Evaluation from './Evaluation';

import { none_testState } from '../../modules/action';
import Finish from './Finish';


function CardLayout(){

    let [categoryName,setCategoryName]=useState("");

    const testState=useSelector(state=>state.testState_reducer.testState);//운동을 시작한 여부에 따라서 css변경때문에
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const path=useLocation();//지속적으로 url이 바뀌는 걸 인식시켜서 이름 바뀌게,,


    const pageInfo=useSelector(state=>state.update_page_progress_reducer);//지금 현재 진행하고 있는 페이지의 부위와 운동명을 맡는다


    //동적 임포트-코드 스플릿팅이라고 부름
    const checkCategory=async()=>{
        let category;
        let exercise_name;
        let bodypart;
        let page_title;
        if(path.pathname.includes("series") || path.pathname.includes("weightcheck")|| path.pathname.includes("exercise") ||path.pathname.includes("evaluation") ){
            var url=path.pathname.split("/");

            if(url[url.length-1]!=="series"){//즉 파람스가 있는 상황일때-운동명및 부위명 이 들어올 때

                let tmp=url[url.length-1];//운동명 또는 부위명이 담긴다
                const module=await import("../../ExercisesInfo/ExerciseInfo.js");

                if(tmp==="chest"||tmp==="back"||tmp==="shoulder"||tmp==="bicep"||tmp==="tricep"||tmp==="abs"){
                    bodypart=module.bodypart[tmp]; //부위명을 가져온다
                }
                else{
                    exercise_name=module[tmp].name//정확한 한국어 운동명을 가져온다
                }

                if(path.pathname.includes("series")){//즉 각 부위별 운동정리 페이지를 의미한다
                    page_title=bodypart+"운동";
                }
                else if(path.pathname.includes("weightcheck")){//연습스텝일때
                    page_title="중량체크";
                }
                else if(path.pathname.includes("exercise")){//본스텝일 때
                    page_title=exercise_name;
                }
                else if(path.pathname.includes("evaluation")){//평가스텝일때
                    page_title="운동피드백";
                }
                
                console.log(page_title)

                
            }
            else{//즉 전체부위순서 설명 해주는 페이지
                page_title="부위순서"
                
            }
        }
        else{
            if(path.pathname.includes("caution")){
                page_title="체크사항";
            }
            else if(path.pathname.includes("finish")){
                page_title="완료"
            }

           
        }

        category={
            [path.pathname]:page_title
        }

        return category
        
    }
    
    useEffect(()=>{
        checkCategory().then((category)=>{
            setCategoryName(category);
        })  
    },[path])
    

    const containerStyle={
        paddingRight:"10px",
        paddingLeft:"10px"
    }
    const skipSpan={
        color:"white",
        fontSize:"1.2em"
    }
    const backArrowStyle={
        fontSize: "1.8em",
        color: "white"
    }

    const IconButtonStyle={
        "&.MuiIconButton-root":{
            padding:"0px",
            backgroundColor:"transparent",
            fontSize:"1em"
        },
        "&.MuiIconButton-root:hover":{
            backgroundColor:"transparent"
        }

    }

    const skipButtonStyle={
        "&.MuiButton-root":{
            padding:"0px",
            boxShadow:"",
            backgroundColor:"transparent"
        },
        "&.MuiButton-root:hover":{
            backgroundColor:"transparent"
        }
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

   const gotoBack=()=>{
       navigate(-1);//뒤로가기
       dispatch(none_testState());//뒤로가기할 시 전체적인 카메라 스테이트를 다시 꺼져줘야함


   }
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
                                <div className="container-fluid" style={testState==="completed"?containerStyle:null} >
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
                                                            <div className="col" style={{paddingLeft:"5px",paddingRight:"5px",display:"flex",justifyContent:"space-between"}}>
                                                                
                                                                <IconButton sx={IconButtonStyle} onClick={gotoBack}>
                                                                    <ArrowCircleLeftIcon sx={backArrowStyle}/>
                                                                </IconButton>
                                                                
                                                                <span className="badge badge-secondary" style={{
                                                                    fontSize:"2.0em",
                                                                    color:"#5e72e4",
                                                                    backgroundColor:"#f8f9fa",
                                                                    borderRadius:"1.375rem"
                                                                }}>{categoryName[path.pathname]}</span>

                                                                <Button sx={skipButtonStyle}>
                                                                    <span className="badge badge-default" style={skipSpan}>건너뛰기</span>
                                                                </Button>
                                                                

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
                                                            <Route path="weightcheck/:exercise_name" element={<WeightCheckInstruction />}/>
                                                            <Route path="weightcheck/practice/:exercise_name" element={<PracticeStep/>}/>
                                                            <Route path="exercise/:exercise_name" element={<MainStep/>}/>
                                                            <Route path="evaluation/:exercise_name" element={<Evaluation/>}/>
                                                            <Route path="finish" element={<Finish/>}/>
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