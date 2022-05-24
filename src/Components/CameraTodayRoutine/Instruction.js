import React,{useState,useEffect} from "react";
import VerticalStepper from "../ExerciseCounter/WithCamera/VerticalStepper";
import CardWrapper from "./CardWrapper";


function Instruction({where}){


    return(
     <>
        <CardWrapper time={1000}>
          <VerticalStepper link={where==="testInstruction"?"/test/pushup":"/routine/series"}/>
        </CardWrapper>

        {/* 체력측정페이지에서 사용될때는 버튼이 링크 푸시업으로 가게 */}
        {/* 운동페이지에서는 원래 운동 주의사항쪽으로 이동 */}
     </>
    );
}
export default Instruction