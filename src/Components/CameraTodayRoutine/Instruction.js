import React,{useState,useEffect} from "react";
import VerticalStepper from "../ExerciseCounter/WithCamera/VerticalStepper";
import CardWrapper from "./CardWrapper";


function Instruction(){


    return(
     <>
        <CardWrapper time={1000}>
          <VerticalStepper link="/routine/series"/>
        </CardWrapper>
     </>
    );
}
export default Instruction