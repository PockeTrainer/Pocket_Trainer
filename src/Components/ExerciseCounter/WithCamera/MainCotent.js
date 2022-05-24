import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import EachExerciseTip from "./EachExerciseTip";
import Instruction from "../../CameraTodayRoutine/Instruction";
import Series from "./Series";

import Test from "./Test";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from '@mui/material/IconButton';
import EachTestResult from "./EachTestResult";
import FinalTestResult from "./FinalTestResult";
import { useSelector } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { Grow } from "@mui/material";
import AlertModal from "../../SameLayout/AlertModal";

function MainContent(){
    const test_State=useSelector(state=>state.testState_reducer);
    let [categoryName,setCategoryName]=useState("");
    const{testState,exercise}=test_State;

    const path=useLocation();

    const count=useRef(1);  
    const modalRef=useRef();//그만두기 모달창용

    const navigate=useNavigate();
    const [checked, setChecked] = useState(false);//화면 transition
    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const click_modal=()=>{//오늘 그만두시겠습니까에 해당하는 모달을 보여줌
        modalRef.current.click();
    }
  
    

    //동적 임포트-코드 스플릿팅이라고 부름
    const checkCategory=async()=>{
        let category;
        let page_title;
        if(path.pathname.includes("caution") ){//체크사항 페이지
            page_title="체크사항";    
        }
        else if(path.pathname.includes("finalResult")){//최종완료페이지
           page_title="완료";
        }
        else if(path.pathname.includes("result")){//각 운동 결과페이지
            page_title="평가결과";
        }
        else{//각 운동페이지-푸시업,싯업,스쿼트
            let tmp_list=path.pathname.split("/");
            let exercise=tmp_list[tmp_list.length-1];//운동명이 담긴다
            if(exercise==="pushup"){
                page_title="푸시업";
            }
            else if(exercise==="situp"){
                page_title="싯업";
            }
            else{
                page_title="스쿼트";
            }
            
        }

        category={
            [path.pathname]:page_title
        }

        return category
        
    }

    useEffect(()=>{
        handleChange();
    },[])

    useEffect(()=>{
        checkCategory().then((category)=>{
            setCategoryName(category);
        })  
    },[path])

    useEffect(()=>{
        if(count.current==1){
            count.current+=1;
            console.log("hi")
            return;
        }
        else if(testState=="true"){
            console.log('테스트중')
        }
        else if(testState=="completed"){//카메라 준비완료단계
            console.log("카메라준비완료");
        }
        else if(testState=="preTimer"){
            console.log("준비시간 단계");
        }
        else{
            console.log(testState);
            if(exercise=="pushup"){
                navigate("/test/result/pushup");//타이머가 끝나면 다음결과페이지로 이동해줌
            }
            else if(exercise=="situp"){
                navigate("/test/result/situp");
            }
            else{
                navigate("/test/result/squat");
            }
            
            
        }
    },[testState]);

    
    const containerStyle={
        paddingRight:"10px",
        paddingLeft:"10px"
    }


    const ExitStyle={
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


    const subListHeader={
        paddingLeft:"5px",
        paddingRight:"5px",
        marginLeft:"-19px",
        marginRight:testState==="completed"||testState==="preTimer"||testState==="true"?"-3px":"-12px",
        borderRadius:"5px",
        marginTop:"0px",
        lineHeight:"10px",
        backgroundColor:"#f7fafc52"
    };

    const rotatingIconStyle={
        lineHeight:"1.3",
        color:"#2dce89",
        fontSize:"1.8rem"
    }

    const checkIconStyle={
        color:"#2dce89",
        fontSize:"1.8rem"
    }

    return(
        <div>
           

            <div className="container-fluid" style={testState==="completed"||testState==="preTimer"||testState==="true"?containerStyle:null} >
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
                                                            <div className="col" style={{paddingLeft:"5px",paddingRight:"5px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                                                
                                                               {/* 나가기 버튼 */}
                                                                <>
                                                                    <IconButton sx={IconButtonStyle} onClick={click_modal}  >
                                                                        <LogoutIcon sx={ExitStyle}/>
                                                                    </IconButton>
                                                                </>
                                                                   
                                                               
                                                                
                                                                
                                                                {/* 지금 파트 이름보여주기 */}

                                                                <span className="badge badge-secondary" style={{
                                                                    fontSize:"2.0em",
                                                                    color:"#5e72e4",
                                                                    backgroundColor:"#f8f9fa",
                                                                    borderRadius:"1.375rem"
                                                                }}>{categoryName[path.pathname]}</span>

                                                                {/* 스피너 카메라 페이지일 때 */}
                                                                {/* 각 결과 페이지,엔딩페이지에서는 체크버튼 */}
                                                                {
                                                                    path.pathname.includes("pushup")|| path.pathname.includes("situp")|| path.pathname.includes("squat")
                                                                    ?
                                                                        <i className="fas fa-spinner fa-spin" style={rotatingIconStyle}></i>
                                                                    :
                                                                    (path.pathname.includes("result")||path.pathname.includes("finalResult")
                                                                    ?
                                                                        <CheckCircleIcon sx={checkIconStyle}/>
                                                                    :
                                                                        <CheckCircleIcon sx={{...checkIconStyle,visibility:"hidden"}}/>
                                                                    )
                                                                    
                                                                }
                                                                

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
                                                <Route path="caution" element={<Instruction where={"testInstruction"}/>}/>
                                                 {/* <Route path="series" element={<Series/>}/> */}
                                                {/* <Route path="howto/:exercise_name" element={<EachExerciseTip/>}/>  */}
                                                <Route path=":exercise_name" element={<Test />} />
                                                <Route path="result/:exercise_name" element={<EachTestResult/>}/>
                                                <Route path="finalResult" element={<FinalTestResult/>}/>
                                            </Routes>
                                                        

                                            </div>
                                        </List>

                                        <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-stop_today">Default</button>
                                        <AlertModal where="stop_today"  />
                                    </div>
                                    
                            </div> 

      </div>
    );
}
export default MainContent