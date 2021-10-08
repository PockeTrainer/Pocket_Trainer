import React, { Component } from 'react';
import '../../css/Login/YourIdPage.css';

function YourIdPage() {
    return (
    <div className="YourIdPage">
        <div className="GNB">아이디 확인</div>

        <div className="mainsource">
            <label htmlFor="id">아이디</label>
            <input type="text" name="id" id="id" readOnly="true"/>

            <button id="pwSearchBTN">비밀번호 찾기</button>
            <button id="goLoginPageBTN" onClick={function(e){
                e.preventDefault();
                this.props.goLoginPage();
            }.bind(this)}>로그인하러 가기</button>
        </div>
    </div>
    );
}

export default YourIdPage;