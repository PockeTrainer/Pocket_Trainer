import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Timer from "./Timer";
import TitleMessage from "./TitleMessage";
function Test({func}){
    const[testState,setTestState]=useState(false);

    const exercise_name=useParams();//뒤에 파람스 가져올려고

    const changeTestState=(tmp)=>
    {
        setTestState(tmp);
    };

    useEffect(()=>{
        if(testState==false){
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

    return(
        <div>
            <TitleMessage content={entire[exercise_name.exercise_name]} display={testState?"no":"yes"}/>
            <Timer func={changeTestState}/>
        </div>
    );
}
export default Test