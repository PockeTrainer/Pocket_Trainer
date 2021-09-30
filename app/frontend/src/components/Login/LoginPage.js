import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to="/Login/IdSearchPage">아이디 찾기</Link>
                    <Link to="/Login/PwSearchPage">비밀번호 찾기</Link>
                </div>
                <div className="downLine">
                    <Link to="/Login/SignUpPage">회원가입</Link>
                </div>
            </div>
        </div>

        <div className="buttons">
            <Link to="/OnBoarding/BodyInfoPage"><button>onBoarding 이동</button></Link>
            <Link to="/Main/MainPage"><button>main 이동</button></Link>
            <Link to="/History/HistoryPage"><button>history 이동</button></Link>
            <Link to="/MyPage/CheckPwPage"><button>mypage 이동</button></Link>
        </div>

    </div>
    );
  }
}

export default LoginPage;