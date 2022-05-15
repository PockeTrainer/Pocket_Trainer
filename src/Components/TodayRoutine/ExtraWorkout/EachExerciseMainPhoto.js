import React,{useRef,useState,useEffect} from "react";

import Grow from '@mui/material/Grow';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SwipeExtraPage from "./SwipeExtraPage";

function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

export default function EachExerciseMainPhoto({exercise_obj,where}){
  const [checked, setChecked] = useState(false);


  const handleChange = () => {
      setChecked((prev) => !prev);
  };

  useEffect(()=>{
      sleep(1000).then(()=>handleChange());
  },[])

  const HeaderStyle={
    backgroundImage: `url(${exercise_obj.image_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    margin:"0 -1rem"
  }

  const MainPhotoPageStyle={
    ...HeaderStyle,
    minHeight: '100vh',
  }

  const DetailPageStyle={
    visibility:"hidden"
  }
  //Transition용


    return(
      <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout: 1000 } : {})}>

        <div data-component="ProfileHeader" className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={where==="MainPage"?MainPhotoPageStyle:HeaderStyle}>
        {/* Mask */}

        {
          where==="MainPage"
          ?
          <span className="mask bg-gradient-default_1 opacity-8" />
          :
          null
        }
        {/* Header container */}
        <div className="container-fluid d-flex align-items-center" style={where==="MainPage"?{justifyContent:"center"}:{...DetailPageStyle,justifyContent:"center"}}>
          <div className="row">
            <div className="col-lg-7 col-md-10">
              <h1 className="display-1 text-white"><FitnessCenterIcon sx={{fontSize:"3rem"}}/>{exercise_obj.part}</h1>
              <p className="text-white mt-0 mb-5">{exercise_obj.name}</p>
              <button type="button" className="btn btn-primary" > <i className="ni ni-check-bold" />상세보기</button>
            </div>
          </div>
        </div>

      </div>
      </Grow>
    );
}