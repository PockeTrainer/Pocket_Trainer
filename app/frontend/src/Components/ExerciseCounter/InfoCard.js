import React, { useEffect, useState,useRef } from 'react';
import '../../CustomCss/ExerciseCounter/InfoCard.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style,onclick,state_v,slider1} = props;
  return (
    <div
      className={className}
      style={{ ...style}}
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

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [state,setState]=useState(1);

  const changeState=(tmp)=>{
    console.log(tmp)
    if(tmp>4){//state값이 증가하다가 4보다 커지면 다시면 0으로 돌려줌
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

  
  {/*버튼 누르자마자 지워지게금 하는건 어떨지 추후 수정해보자 */}

        return(
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0" data-component="ProfileCard">
            <div className="card card-profile shadow">
              <div className="row justify-content-center">
                <div className="col-lg-3 order-lg-2">
                  <div className="card-profile-image">
                    
                    {state==1?<ShowAll/>:null}
                    {state==2?<ShowPushUp/>:null}
                    {state==3?<ShowSitUp/>:null}
                    {state==4?<ShowSquat/>:null}
        
                    {/* 슬라이더1넣기 */}
                    <Slider
                        asNavFor={nav2}
                        arrows={false}
                        ref={slider1}
                      >
                        <div>
                          <img src="../assets/img/theme/all.png" className="rounded-circle"/>
                          <h2>푸시업+싯업+스쿼트</h2>
                        </div>
                        <div>
                          <img src="../assets/img/theme/pushup.png" className="rounded-circle"/>
                          <h2>푸시업(상체)</h2>
                        </div>
                        <div>
                          <img src="../assets/img/theme/sit-up.png" className="rounded-circle"/>
                          <h2>싯업(복근)</h2>
                        </div>
                        <div>
                          <img src="../assets/img/theme/squat.png" className="rounded-circle"/>
                          <h2>스쿼트(하체)</h2>
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
                  <h4>Second Slider</h4>
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
                      <h3>1</h3>
                    </div>
                    <div>
                      <h3>2</h3>
                    </div>
                    <div>
                      <h3>3</h3>
                    </div>
                    <div>
                      <h3>4</h3>
                    </div>
                  </Slider>
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <h2 className="display-4"><i class="fas fa-exclamation-triangle"></i>준비되셨습니까?<i class="fas fa-exclamation-triangle"></i></h2>
                    </div>
                    
                    <h3>준비되셨으면 푸시업 자세를 갖추고 시작버튼 또는 카메라버튼을 누르고 기다려주세요.</h3>
                    <i class="fas fa-running fa-5x"></i>
                    <button type="button" class="btn btn-primary btn-lg btn-block">평가시작하기</button>
                  </div>
                </div>
                <div className="text-center">
                
                  
                  <hr className="my-4" />
                  <h1 className="display-2" id="time"></h1>
                </div>
              </div>
            </div>
          </div>
        );
    }
  
export default InfoCard;








