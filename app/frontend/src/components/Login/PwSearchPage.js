import React, { Component } from 'react';
import '../../css/Login/PwSearchPage.css';

class PwSearchPage extends Component {
    render() {
    return (
    <div className="PwSearchPage">
        <div className="GNB">비밀번호 찾기</div>

        <div className="mainsource">
            <div className="form">
                <form action="">
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name" />

                    <label htmlFor="id">아이디</label>
                    <input type="text" name="id" id="id" />
                    
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" />
                    
                    <div className="codeSend">
                        <button id="codeSendBTN">인증번호 전송</button>
                    </div>

                    <label htmlFor="codeCheck">인증번호 입력</label>
                    <input type="codeCheck" name="codeCheck" id="codeCheck" />

                    <button id="submitBTN" onClick={function(e){
                        e.preventDefault();
                        this.props.goYourPwPage();
                    }.bind(this)}>확인</button>
                </form>
            </div>
        </div>
    </div>
    );
  }
}

export default PwSearchPage;