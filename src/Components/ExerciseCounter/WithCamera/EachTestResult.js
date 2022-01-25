import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TitleMessage from "./TitleMessage";


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

    const moveToNext=()=>{
        if(exercise_name.exercise_name=="pushup"){//싯업 평가전 페이지로 이동
            navigate("/test/howto/situp");
        }
        else if(exercise_name.exercise_name=="situp"){//스쿼트평가전 페이지로 이동
            navigate("/test/howto/squat");
        }
        else{//최종결과페이지로 이동
            navigate("/test/finalResult")
        }
    }
    return(
        <div>
            <TitleMessage content={entire[exercise_name.exercise_name]}/>
            <div className="alert alert-success" role="alert" >
                <span className="alert-icon"><i class="ni ni-time-alarm"></i></span>
                <span className="alert-text display-4" style={{display:"block"}}>1분동안</span>
                <span className="alert-text display-1">50개</span>

            </div>
            <div className="alert alert-success" role="alert">

                <h3 style={{color:"white"}}><strong>{entire[exercise_name.exercise_name].next_title+":"}</strong>{entire[exercise_name.exercise_name].next_exam}</h3>
            </div>
            <button onClick={moveToNext} type="button" className="btn btn-primary btn-lg btn-block" style={{marginTop:'5px'}}><i className="ni ni-button-play"></i>다음평가</button>
        </div>

    );
}
export default EachTestResult