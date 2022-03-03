import React  from 'react';
import "../../CustomCss/ExerciseCounter/InfoMask.css"
import Modal from '../SameLayout/Modal';
import { useRef } from "react";

function InfoMask(){
  const modal=useRef();

    const showPopup=(hasFilter)=>{
      if (hasFilter) {
          modal.current.classList.add('has-filter');
      } else {
          modal.current.classList.remove('has-filter');
      }
  
      modal.current.classList.remove('hide');
  };
    
        return(
            <div data-component="ProfileHeader" className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: '600px', backgroundImage: 'url(../assets/img/theme/피트니스사진.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
            {/* Mask */}
            <span className="mask bg-gradient-default_1 opacity-8" />
            {/* Header container */}
              <div className="container-fluid d-flex align-items-center">
                <div className="row">
                  <div className="col-lg-7 col-md-10">
                    <h1 className="display-2 text-white"><i className="fas fa-fist-raised" style={{color:"red"}}></i>체력평가<i className="fas fa-fist-raised" style={{color:"red"}}></i></h1>
                    <p className="text-white mt-0 mb-5">지금부터 회원님의 체력측정을 통한 회원님의 근발달정도를 파악하고 그에 따른 추천을 해드리겠습니다.</p>
                    <button onClick={()=>showPopup(true)} className="btn btn-info"><i class="far fa-question-circle"></i>측정방법</button>
                  </div>
                </div>
              </div>
              <Modal ref={modal}/>
          </div>
          
    
        );
    
}
export default InfoMask;