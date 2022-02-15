import React, { useEffect, useState,useRef } from 'react';
import styles from'../../CustomCss/ExerciseCounter/InfoCard.module.css';
import "slick-carousel/slick/slick.css"; //최소여기서는 한 번 임포트를 해서 전체적으로 쓰이도록 하자
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

import ScrollTrigerButton from "../SameLayout/ScrollTriggerButton";

function InfoCard(){

  
  
  const slider1 = useRef(null);
  const slider2 = useRef(null);



  const label = { inputProps: { 'aria-label': 'Checkbox' } };

        return(
          <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0" data-component="ProfileCard" style={{paddingLeft:"1px",paddingRight:"1px"}}>
            <div className={"card-profile"+" "+"shadow"+" "+"card"}>
              
    
              <div className="card-body pt-4 pt-md-4" >
                <div className="row">
                  <div className="col">
                     
                        <i class={"fas fa-exclamation-triangle fa-5x"+" "+styles.alert_mark}></i>
                        <div className={styles[`card-profile-stats`]+" "+"d-flex justify-content-center mt-md-5"}>
                          <h1 className= {"display-4"+" "+styles.alert_title}><i class="ni ni-bold-right"></i>측정방법</h1>
                        </div>
                        <hr/>
                        <div class="alert alert-warning" role="alert">
                            <span class="alert-text"><strong><i class="ni ni-like-2"></i>자세연습:</strong><br></br>상단에서 체력측정전 연습을 원하시는 부위는 미리 선택하여 측정전 연습해보세요!</span>
                        </div>
                        <div class="alert alert-warning" role="alert">
                            <span class="alert-text"><strong><i class="ni ni-like-2"></i>Tip!:</strong><br></br>각 평가종목의 그림을 누르면 간략한 운동설명법을 볼 수 있어요!</span>
                        </div>
                        

                  </div>
                </div>
                
              </div>
            </div>
            <ScrollTrigerButton content={"평가준비"}/>
          </div>
        );
    }
  
export default InfoCard;








