import React, { Component, useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../css/Login/LoginPage.css';
import axios from "axios";

function LoginPage()  {

    const history = useHistory();

    let [id, changeId] = useState();
    let [password, changePassword] = useState();

    let server_url = 'http://ec2-15-164-217-95.ap-northeast-2.compute.amazonaws.com:8000'
    //let server_url = 'http://127.0.0.1:8000'

    const logInBTNClick = (e) => {
        e.preventDefault();
        axios.post(`${server_url}/api/user/login`, {
            id : id,
            password : password
        })
        .then(res => {
            console.log(res.data);
            console.log(res.data.Token);
            axios.defaults.headers.common['Authorization'] = `token ${res.data.Token}`
            //sessionStorage.setItem("isAuthorized", "true");
            console.log(res.data.User.id);
            sessionStorage.setItem("user_id", res.data.User.id);
            history.push('/OnBoarding/BodyInfoPage');
        })
        .catch(err => 
            console.log(err.response.data)
        )

    }
    // const [name, setName] = useState();

    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/api/user/")
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(data => {
    //             console.log(data[0].title)
    //             setName(data[0].title);
    //         });
    // }, []);

    // axios.post("http://127.0.0.1:8000/api/workout/pushUp/2")
    // .then(res => {
    //     console.log(res.data)
    // })
    // .catch(err => 
    //     console.log(err)
    // )


    return (
    <div className="LoginPage">
        <div className="GNB">로그인</div>

        <div className="mainsource">
            <div className="form">
                {/* <form action="" onSubmit={ (e) => {
                    console.log(this)
                    e.preventDefault();
                    this.props.change(e.target.id.value);
                }}> */}
                <form action="" >
                    <label htmlFor="id">아이디</label>
                    <input type="text" name="id" id="id" onChange={(e) => {
                        changeId(e.target.value);
                    }}/>
                    
                    <label htmlFor="pw">비밀번호</label>
                    <input type="password" name="pw" id="pw" onChange={(e) => {
                        changePassword(e.target.value);
                    }}/>
                    
                    <button onClick={logInBTNClick}>로그인</button>
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

export default LoginPage;