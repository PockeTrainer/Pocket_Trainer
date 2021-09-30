import React, { Component } from 'react';
import '../../css/MyPage/CheckPwPage.css';

class CheckPwPage extends Component {
    render() {
    return (
    <div className="CheckPwPage">
        <div className="GNB">회원정보를 수정하기 위해 <br/>비밀번호를 입력 해주시기 바랍니다</div>
        
        <div className="mainsource">
            <label htmlFor="pw">비밀번호</label>
            <input type="password" name="pw" id="pw" />

            <button id="submitBTN" onClick={function(e){
                e.preventDefault();
                this.props.goUpdatePage();
            }.bind(this)}>확인</button>
        </div>
    </div>
    );
  }
}

export default CheckPwPage;