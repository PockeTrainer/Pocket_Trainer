import React, { Component } from 'react';

class IdSearchPage extends Component {
    render() {
    return (
    <div className="IdSearchPage">
        <div className="GNB">아이디 찾기</div>

        <div className="mainsource">
            <div className="form">
                <form action="">
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name" />
                    
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" />
                    
                    <button id="codeSendBTN">인증번호 전송</button>

                    <label htmlFor="codeCheck">인증번호 입력</label>
                    <input type="codeCheck" name="codeCheck" id="codeCheck" />

                    <button id="submitBTN" onClick={function(e){
                        e.preventDefault();
                        this.props.goYourIdPage();
                    }.bind(this)}>확인</button>
                </form>
            </div>
        </div>
    </div>
    );
  }
}

export default IdSearchPage;