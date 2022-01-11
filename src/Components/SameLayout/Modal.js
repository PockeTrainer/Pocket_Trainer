import React, { useRef } from 'react';
import '../../CustomCss/Modal.css';

const Modal=React.forwardRef((props,ref)=>{

    const closePopup=()=>{
        ref.current.classList.add('hide');
      };
    return(
        <div id="popup" className="hide" ref={ref}>
            <div className="content">
            <h3 className="notification">
                <i class="far fa-question-circle"></i>사용설명서
            </h3>
            <p>
                회원님께서는 회원님의 전신이 다보이는 곳에 카메라를 거치해주신 상태로 포켓트레이너의 지시에 따로 평가를 따라해주시기 바랍니다.
            </p>
            <button type="button" className="btn btn-primary fas fa-window-close" onClick={closePopup}>닫기</button>
            </div>
        </div>
    );

});
export default Modal;