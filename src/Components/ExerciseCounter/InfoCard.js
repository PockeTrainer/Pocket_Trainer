import React, { useEffect, useState,useRef } from 'react';
import styles from'../../CustomCss/ExerciseCounter/InfoCard.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { red } from '@mui/material/colors';
import { style } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';


function SampleNextArrow(props) {
  const { className, style,onclick,state_v,slider1} = props;
  return (
    <div
      className={className}
      style={{ ...style,color:red}}
      onClick={()=>{
        setTimeout(() => {
          onclick(state_v+1);
        }, 500);
        slider1.current.slickNext();
      }}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style,onclick,state_v,slider1} = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={()=>{
        setTimeout(() => {
          onclick(state_v-1);
        }, 500);
        slider1.current.slickPrev();
      }}
    />
  );
}

function ShowAll(){
  return(
    <div>
      <img src="../assets/img/theme/all.png" className="rounded-circle hide-pic"/>
    </div>
  );
}


function ShowPushUp(){
  return(
    <div>
      <img src="../assets/img/theme/pushup.png" className="rounded-circle hide-pic"/>
    </div>
  );
}


function ShowSitUp(){
  return(
    <div>
      <img src="../assets/img/theme/sit-up.png" className="rounded-circle hide-pic"/>
    </div>
  );
}


function ShowSquat(){
  return(
    <div>
      <img src="../assets/img/theme/squat.png" className="rounded-circle hide-pic"/>
    </div>
  );
}


function InfoCard(){

  const [nav1, setNav1] = useState(null);//slider1-slick에 있는거
  const [nav2, setNav2] = useState(null);//slider2-slick에 있는거
  const [state,setState]=useState(1);//이 state는 위에 덮어씌워지는 이미지의 state

  const[checkState,setCheckState]=useState({
    pushup:true,
    situp:true,
    squat:true
  });

  const{pushup,situp,squat}=checkState;

  
  
  
  //덮여 씌워지는 사진 state
  const changeState=(tmp)=>{
    console.log(tmp)
    if(tmp>3){//state값이 증가하다가 4보다 커지면 다시면 0으로 돌려줌
      setState(1);
    }
    else if(tmp<1){//state값이 감소하다가 0보다 작아지면 4로 올림
      setState(4);
    }
    else{
      setState(tmp);//그 외에 값은 그냥 설정
    }
  }
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const label = { inputProps: { 'aria-label': 'Checkbox' } };
  
  {/*버튼 누르자마자 지워지게금 하는건 어떨지 추후 수정해보자 */}

        return(
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0" data-component="ProfileCard">
            <div className={"card-profile"+" "+styles.bgcard+" "+"shadow"+" "+"card"}>
              <div className="row justify-content-center">
                <div className="col-lg-3 order-lg-2">
                  <div className="card-profile-image">
                    
                    {state==1?<ShowPushUp/>:null}
                    {state==2?<ShowSitUp/>:null}
                    {state==3?<ShowSquat/>:null}
        
                    {/* 슬라이더1넣기 */}
                    <Slider
                        asNavFor={nav2}
                        arrows={false}
                        ref={slider1}
                      >
                       
                        <div>
                          <img src="../assets/img/theme/pushup.png" className={"rounded-circle"+" "+styles.exercise_pic}/>
                          <h1 className={styles.body_part}>상체</h1>
                        </div>
                        <div>
                          <img src="../assets/img/theme/sit-up.png" className={"rounded-circle"+" "+styles.exercise_pic}/>
                          <h1 className={styles.body_part}>복근</h1>
                        </div>
                        <div>
                          <img src="../assets/img/theme/squat.png" className={"rounded-circle"+" "+styles.exercise_pic}/>
                          <h1 className={styles.body_part}>하체</h1>
                        </div>
                    </Slider>
                  </div>
                </div>
              </div>
              
              {/*<div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
             
				
              </div>*/}
              <div className="card-body pt-0 pt-md-4">
                <div className="row">
                  <div className="col">
                  <h4>옆으로 넘겨주세요<i class="ni ni-bold-right"></i><i class="ni ni-bold-right"></i></h4>
                  <Slider
                    asNavFor={nav1}
                    ref={slider2}
                    slidesToShow={1}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    nextArrow={<SampleNextArrow onclick={changeState} state_v={state} slider1={slider1}/>}
                    prevArrow={<SamplePrevArrow onclick={changeState} state_v={state} slider1={slider1}/>}
                  >
                    <div>
                      <span class="badge badge-primary"><h2>푸시업</h2></span>
                    </div>
                    <div>
                      <span class="badge badge-primary"><h2>싯업</h2></span>
                    </div>
                    <div>
                      <span class="badge badge-primary"><h2>스쿼트</h2></span>
                    </div>
                  </Slider>
                    
                    <div className={"card"+" "+styles.border} style={{width: 18+'rem'}}>
                      <div className="card-body">
                        <i class={"fas fa-exclamation-triangle"+" "+styles.alert_mark}></i>
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
                        <p className="card-text">이제 준비가 다 되었다면<br></br>시작해볼까요?<br></br><i class="ni ni-bold-down text-align"></i></p>
                        
                        <img src="../assets/img/theme/runner2.gif" className={styles.runner}/>
                        <Link to="/test/caution">
                          <button type="button" className="btn btn-primary btn-lg btn-block"><i className="ni ni-button-play"></i>평가시작하기</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        );
    }
  
export default InfoCard;








