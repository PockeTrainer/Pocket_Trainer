import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/MyPage/CheckPwPage.css';

class CheckPwPage extends Component {
    render() {
    return (
    <div className="CheckPwPage">
        <div className="GNB">회원정보를 수정하기 위해 <br/>비밀번호를 입력 해주시기 바랍니다</div>
        
        <div className="mainsource">
            <label htmlFor="pw">비밀번호</label>
            <input type="password" name="pw" id="pw" />

            <Link to="/MyPage/UpdatePage"><button id="submitBTN">확인</button></Link>
        </div>
    </div>
    );
  }
}

export default CheckPwPage;