import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import Camera from "./Camera";
import Timer from "./Timer";
import TitleMessage from "./TitleMessage";
function Test({func}){
    const[testState,setTestState]=useState(false);

    const exercise_name=useParams();//뒤에 파람스 가져올려고

    const count=useRef(1);

    const changeTestState=(tmp)=>
    {
        setTestState(tmp);
    };

    useEffect(()=>{
        if(count.current==1){
            count.current+=1;
            return;
        }
        func(testState,exercise_name.exercise_name);//또 상위 state를 변경
    },[testState]);

    
    const pushup_content={
        title:"체력평가를\n시작합니다",
        message:"상체측정을 위한 푸시업을 곧 시작하겠습니다."
    };

    const situp_content={
        title:"체력평가를\n시작합니다",
        message:"복근측정을 위한 싯업을 곧 시작하겠습니다."
    };

    const squat_content={
        title:"체력평가를\n시작합니다",
        message:"하체측정을 위한 스쿼트를 곧 시작하겠습니다."
    };

    const entire={
        pushup:pushup_content,
        situp:situp_content,
        squat:squat_content
    };

    const counting_number={
        position:"relative",
        color:"white",
        float:"right",
        zIndex:"9999",
        fontSize:"2em",
        backgroundColor:"#5e72e4"
    }

    return(
        <div>
            <TitleMessage content={entire[exercise_name.exercise_name]} display={testState?"no":"yes"}/>
            {testState&&
            <div style={{height:"18em"}}>
                <span className="badge badge-primary" style={counting_number}>5개</span>
            </div>
            }
            {testState&&<Camera/>}
            <Timer func={changeTestState}/>
        </div>
    );
}
export default Test