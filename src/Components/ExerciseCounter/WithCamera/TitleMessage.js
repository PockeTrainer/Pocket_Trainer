import React from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "../../../CustomCss/ExerciseCounter/WithCamera/Instruction.module.css"
function TitleMessage(props){
    let path=useLocation();

    let final_or_not=path.pathname.includes("finalResult");

    return(
    
        <div className="container-fluid d-flex align-items-center">
            <div className="row">
            <div className="col-lg-7 col-md-10">
                <h2 className={final_or_not?styles[`display-4`]: "text-gray-dark"+" "+styles[`display-4`]}><i className={styles.alert_mark+" "+"fas fa-exclamation-triangle fa-1x"}></i>{props.content.title.split('\n').map((txt)=>(
                    <>
                    {txt}
                    <br></br>
                    </>
                ))}</h2>
                <hr></hr>
                <p className={final_or_not?"text-white mt-0":"text-gray-dark mt-0"}>{props.content.message}</p>
                
                
            </div>
            </div>
        </div>
    );
}
export default TitleMessage