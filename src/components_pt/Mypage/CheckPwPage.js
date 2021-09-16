import React, { Component } from 'react';

class CheckPwPage extends Component {
    render() {
    return (
    <div className="CheckPwPage">
        <div className="GNB">비밀번호 확인</div>
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