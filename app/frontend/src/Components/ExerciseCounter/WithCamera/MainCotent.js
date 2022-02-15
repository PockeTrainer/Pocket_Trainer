import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import EachExerciseTip from "./EachExerciseTip";
import Instruction from "./Instruction";
import Series from "./Series";
import Test from "./Test";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EachTestResult from "./EachTestResult";
import FinalTestResult from "./FinalTestResult";
import { useSelector } from "react-redux";
import { testState_reducer } from "../../../modules/action";

function MainContent(){
    // const[testState,setTestState]=useState(false);//해당 state는 아래 밑에 운동이 시작시 준비시간이 지날경우 true로 되어 카메라 전면 켜줄려고 만드는중
    // const[urlstate,setUrlState]=useState("");//지금 어떤 테스트중인지


    const test_State=useSelector(state=>state.testState_reducer);
    const{testState,urlState}=test_State;

    console.log(testState);

    console.log(urlState);
    //const[combine_string,set_combine_string]=useState("");
    //const[div_height,setDiv_height]=useState("");
    //let url_string;
    //let div_height_str;

    // const change=(tmp1,tmp2)=>{
    //     setTestState(tmp1);
    //     setUrlState(tmp2);
    // };

    const count=useRef(1);
    const div=useRef();//card의 크기를 파악하기 위해

    

    {/*윗 부분 state는 실제 운동테스트에 들어갔을 때 해당 페이지가 영향을 줘야하므로 필요함 하위state->상위로 올려주고 판단 */}
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
    setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };  

    let id=sessionStorage.getItem("user_id");//로그인 했을 때의 세션정보에 접근해서 아이디 가져옴
    const navigate=useNavigate();
    

    {/*윗 부분은 snackbar로 운동 들어갔을 때 각종목별 운동명 정보 띄우기 위함 */}
    

    useEffect(()=>{
        if(count.current==1){
            count.current+=1;
            console.log("hi")
            return;
        }
        else if(testState=="true"){
            handleClick();
            //url_string="http://127.0.0.1:8000/api/detectme/startWorkout/"+urlstate+'/'+id;
            //set_combine_string('url'+'('+'"'+url_string+'"'+')');
            console.log("bye")
            //div_height_str="100%"+" "+div.current.offsetHeight+"px";
            //setDiv_height(div_height_str)//카메라에 넣을 card의 크기값을 의미
            
        }
        else if(testState=="completed"){//카메라 준비완료단계
            console.log("카메라준비완료");
        }
        else if(testState=="preTimer"){
            console.log("준비시간 단계");
        }
        else{
            handleClose();//타이머에 의한 상태가 끝났을 때면 스낵바를 다시 꺼줌
            console.log(testState);
            if(urlState=="pushup"){
                navigate("/test/result/pushup");//타이머가 끝나면 다음결과페이지로 이동해줌
            }
            else if(urlState=="situp"){
                navigate("/test/result/situp");
            }
            else{
                navigate("/test/result/squat");
            }
            
            
        }
    },[testState]);

    const alert_message={
        pushup:"푸시업 평가 중 입니다",
        situp:"싯업 평가 중 입니다",
        squat:"스쿼트 평가 중 입니다"
    }
    
{/*
    const style={
        backgroundImage:combine_string,
        backgroundRepeat:"no-repeat",
        //backgroundSize:"cover",
        backgroundSize:div_height,
    };
*/}
    return(
        <div>
            <div className="card bg-secondary shadow" data-component="AccountInformationCard" ref={div}>
            
                <div className="card-body">
                    <Routes>
                        <Route path="caution" element={<Instruction/>}/>
                        <Route path="instruction" element={<Series/>}/>
                        <Route path="howto/:exercise_name" element={<EachExerciseTip/>}/>
                        <Route path=":exercise_name" element={<Test />} />
                        <Route path="result/:exercise_name" element={<EachTestResult/>}/>
                        <Route path="finalResult" element={<FinalTestResult/>}/>
                    </Routes>
                    
                </div>
            </div>
            {/*각 테스트에 들어갔을 때 밑에 뜨는 스낵바 */}
            <Snackbar open={open} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%',background:'rgb(245, 124, 0)!important' }}>
                   {alert_message[urlState]}
                </Alert>
            </Snackbar>
      </div>
    );
}
export default MainContent