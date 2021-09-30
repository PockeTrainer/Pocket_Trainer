import React, { Component } from 'react';
import '../../css/Login/SignUpPage.css';

class PwSearchPage extends Component {
    render() {
    return (
    <div className="SignUpPage">
        <div className="GNB">회원 가입</div>

        <div className="mainsource">
            <div className="form">
                <form action="">
                    <label htmlFor="id">아이디</label>
                    <input type="text" name="id" id="id" />

                    <label htmlFor="pw">비밀번호</label>
                    <input type="password" name="pw" id="pw" />
            
                    <label htmlFor="pwCheck">비밀번호 확인</label>
                    <input type="password" name="pwCheck" id="pwCheck" />
                    
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name" />


                    <label htmlFor="gender">성별</label>
                    <div className="gender" id="gender">
                        <input type="radio" name="gender" id="man" value="man" />
                        <label htmlFor="man">남</label>

                        <input type="radio" name="gender" id="woman" value="woman" />
                        <label htmlFor="woman">여</label>
                    </div>
                    
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" />

                    <label htmlFor="birth">생년월일</label>
                    <input type="date" id="birth"/>

                    <button id="signUpBTN">회원가입</button>
                </form>
            </div>
        </div>
    </div>
    );
  }
}

export default PwSearchPage;