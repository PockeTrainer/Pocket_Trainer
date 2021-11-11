import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../css/Login/IdSearchPage.css';

function IdSearchPage() {

    //state 조회하기 위한
    const weight = useSelector( (weight) => weight );
    //action 발생시키기 위해서
    const dispatch = useDispatch()

    const height = useSelector( (height) => height );

    return (
    <div className="IdSearchPage">
        <div className="GNB">아이디 찾기</div>

        <div className="mainsource">
            <div className="form">
                <form action="">
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name" />
                    체중 : {weight}
                    키 : {height} 

                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" />
                    
                    <div className="codeSend">
                        <button id="codeSendBTN" >인증번호 전송</button>
                    </div>

                    <label htmlFor="codeCheck">인증번호 입력</label>
                    <input type="codeCheck" name="codeCheck" id="codeCheck" />
                    
                    <Link to="/Login/YourIdPage"><button id="submitBTN">확인</button></Link>
                </form>
                <button onClick={()=>{ dispatch({type : '증가'}) }}>더하기</button>
            </div>
        </div>
    </div>
    );
}

export default IdSearchPage;