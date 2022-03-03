import React, { Component } from 'react';
import '../../css/Login/YourPwPage.css';

function YourPwPage() {

    return (
    <div className="YourPwPage">
        <div className="GNB">비밀번호 변경</div>

        <div className="mainsource">
            <label htmlFor="tempPw">임시 비밀번호</label>
            <input type="text" name="tempPw" id="tempPw" readOnly="true"/>

            <button id="goLoginPageBTN" onClick={function(e){
                e.preventDefault();
                this.props.goLoginPage();
            }.bind(this)}>로그인하러 가기</button>
        </div>
    </div>
    );
}

export default YourPwPage;