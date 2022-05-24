import React,{useState,useEffect} from "react";

import Grow from '@mui/material/Grow';


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}


function CardWrapper({time,children}){

  const [checked, setChecked] = useState(false);


  const handleChange = () => {
      setChecked((prev) => !prev);
  };

  useEffect(()=>{
      sleep(time).then(()=>handleChange());
  },[])

  //Transition용

    return(
      <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout: 1000 } : {})}>
      <div>
          <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0" data-component="ProfileCard" style={{paddingLeft:"1px",paddingRight:"1px",marginTop:"1.5em"}}>
          <div className={"card-profile"+" "+"shadow"+" "+"card"}>
            

            <div className="card-body pt-2 pt-md-4" style={{padding:"0.5rem"}} >
              <div className="row">
                <div className="col">
                      {children}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      </Grow>
    );
}
export default CardWrapper