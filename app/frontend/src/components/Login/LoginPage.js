import React, { Component } from 'react';
import '../../css/Login/LoginPage.css';

class LoginPage extends Component {
    render() {
    return (
    <div className="LoginPage">
        <div className="GNB">로그인</div>

        <div className="mainsource">
            <div className="form">
                <form action="">
                    <label htmlFor="id">아이디</label>
                    <input type="text" name="id" id="id" />
                    
                    <label htmlFor="pw">비밀번호</label>
                    <input type="password" name="pw" id="pw" />
                    
                    <button>로그인</button>
                </form>
            </div>

            <div className="changePage">
                <div className="upLine">
                    <a href="" onClick={function(e){
                        e.preventDefault();
                        this.props.goIdSearchPage();
                    }.bind(this)}>아이디 찾기</a>
                    <a href="" onClick={function(e){
                        e.preventDefault();
                        this.props.goPwSearchPage();
                    }.bind(this)}>비밀번호 찾기</a>
                </div>
                <div className="downLine">
                    <a href="" onClick={function(e){
                        e.preventDefault();
                        this.props.goSignUpPage();
                    }.bind(this)}>회원가입</a>
                </div>
            </div>
        </div>

        <div className="buttons">
            <button onClick={function(e){
                    e.preventDefault();
                    this.props.goOnBoarding();
                }.bind(this)}>onBoarding 이동</button>
            <button onClick={function(e){
                    e.preventDefault();
                    this.props.goMain();
                }.bind(this)}>main 이동</button>
            <button onClick={function(e){
                    e.preventDefault();
                    this.props.goHistory();
                }.bind(this)}>history 이동</button>
            <button onClick={function(e){
                    e.preventDefault();
                    this.props.goMyPage();
                }.bind(this)}>mypage 이동</button>
        </div>

    </div>
    );
  }
}

export default LoginPage;