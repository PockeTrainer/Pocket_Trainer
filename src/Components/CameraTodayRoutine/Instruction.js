import React from "react";
import VerticalStepper from "../ExerciseCounter/WithCamera/VerticalStepper";

function Instruction(){
    return(
        <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0" data-component="ProfileCard" style={{paddingLeft:"1px",paddingRight:"1px"}}>
        <div className={"card-profile"+" "+"shadow"+" "+"card"}>
          

          <div className="card-body pt-4 pt-md-4" style={{padding:"0.5rem"}} >
            <div className="row">
              <div className="col">
                    <VerticalStepper/>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
}
export default Instruction