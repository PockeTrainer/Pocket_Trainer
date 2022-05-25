import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import TitleMessage from "./TitleMessage";
import { reset_count, Second_clear_page } from "../../../modules/action";
import { exercise_count_reducer } from "../../../modules/action";
import axios from "axios";
import CardWrapper from "../../CameraTodayRoutine/CardWrapper";

function EachTestResult(){
    const pushup_content={
        title:"푸시업 평가완료",
        message:"회원님께서 측정하신 1분동안의 푸시업 결과개수 입니다.",
        next_title:"다음운동",
        next_exam:"(복근)싯업"
    };

    const situp_content={
        title:"싯업 평가완료",
        message:"회원님께서 측정하신 1분동안의 싯업 결과개수 입니다.",
        next_title:"다음운동",
        next_exam:"(하체)스쿼트"
    };

    const squat_content={
        title:"스쿼트 평가완료",
        message:"회원님께서 측정하신 1분동안의 스쿼트 결과개수 입니다.",
        next_title:"최종평가",
        next_exam:"(종합)등급확인"
    };

    
    const entire={
        pushup:pushup_content,
        situp:situp_content,
        squat:squat_content
    };

    const exercise_name=useParams("");
    const navigate=useNavigate();
    const first_login=useSelector(state=>state.first_login_check.first_login);//스토어에서 값 가져오기 첫 로그인인지
    const appRef=useSelector(state=>state.Appref.ref);
    const exercise_count=useSelector(state=>state.exercise_count_reducer);//운동정보가져오기
    const dispatch=useDispatch();

    let result;//운동개수를 담는다
    let id=sessionStorage.getItem("user_id");//세션에서 아이디 가져오기

    result=sessionStorage.getItem(exercise_name.exercise_name);
    result=JSON.parse(result);
    const moveToNext=()=>{
        dispatch(reset_count());//다시 개수 초기화시켜줌 다음 운동들어가기전
        if(exercise_name.exercise_name=="pushup"){//싯업 평가전 페이지로 이동
            navigate("/test/situp");
        }
        else if(exercise_name.exercise_name=="situp"){//스쿼트평가전 페이지로 이동
            navigate("/test/squat");
        }
        else{//최종결과페이지로 이동

            // //마지막 페이지로 디스패치 해줄 것
            dispatch(Second_clear_page());//체력측정이 완료 되었음을 알려주는 것
            appRef.current.click();//루틴생성 데이터가 없을때는 모달창을 띄워주는 것

            //서버로 모든 운동 정보를 전송
            axios.post(`http://127.0.0.1:8000/workout/testResult/${id}`, {
                pushUp : sessionStorage.getItem("pushup"),
                sitUp :  sessionStorage.getItem("situp"),
                squat:  sessionStorage.getItem("squat")
            })
            .then(res => {
                console.log(res.data);                  
            })
            .catch(err => 
                console.log(err.response.data)
            )

        }
        
            
        
    }
    return(
        <div>
            <CardWrapper time={1000}>
                <TitleMessage content={entire[exercise_name.exercise_name]}/>
                <div className="alert alert-success" role="alert" >
                    <span className="alert-icon"><i class="ni ni-time-alarm"></i></span>
                    <span className="alert-text display-4" style={{display:"block"}}>1분동안</span>
                    <span className="alert-text display-1">{result}개</span>

                </div>
                <div className="alert alert-success" role="alert">

                    <h3 style={{color:"white"}}><strong>{entire[exercise_name.exercise_name].next_title+":"}</strong>{entire[exercise_name.exercise_name].next_exam}</h3>
                </div>
                <button onClick={moveToNext} type="button" className="btn btn-primary btn-lg btn-block" style={{marginTop:'5px'}}><i className="ni ni-button-play"></i>다음평가</button>
            </CardWrapper>
            
        </div>

    );
}
export default EachTestResult