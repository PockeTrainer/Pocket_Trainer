import React from "react";
import styles from "../../../CustomCss/ExerciseCounter/WithCamera/Instruction.module.css"
function TitleMessage(props){

    return(
    
        <div className={props.display==="no"?"container-fluid d-flex align-items-center "+styles.display_not_showing:"container-fluid d-flex align-items-center"}>
            <div className="row">
            <div className="col-lg-7 col-md-10">
                <i className={styles.alert_mark+" "+"fas fa-exclamation-triangle fa-5x"}></i>
                <h2 className={"text-gray-dark"+" "+styles[`display-4`]}>{props.content.title.split('\n').map((txt)=>(
                    <>
                    {txt}
                    <br></br>
                    </>
                ))}</h2>
                <hr></hr>
                <p className="text-gray-dark mt-0 mb-4">{props.content.message}</p>
                
                
            </div>
            </div>
        </div>
    );
}
export default TitleMessage