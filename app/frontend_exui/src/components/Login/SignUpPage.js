import React, { Component, useState } from 'react';
import  { useHistory} from 'react-router'; 
import '../../css/Login/SignUpPage.css';
import axios from "axios";

function PwSearchPage() {

    let [id, changeId] = useState();
    let [password, changePassword] = useState();
    let [name, changeName] = useState();
    let [gender, changeGender] = useState();
    let [email, changeEmail] = useState();
    let [birth, changeBirth] = useState();

    const history = useHistory();

    let server_url = 'http://ec2-15-164-217-95.ap-northeast-2.compute.amazonaws.com:8000'
    //let server_url = 'http://127.0.0.1:8000'

    const signUpBTNClick = (e) => {
        e.preventDefault();

        console.log(id, password, name, gender, email, birth);
        axios.post(`${server_url}/api/user/signup`, {
            id : id,
            password : password,
            name : name,
            gender : gender,
            email : email,
            birth : birth,
        })
        .then(res => {
            console.log(res.data);
            //axios.defaults.headers.common['Authorization'] = `token ${res.payload.accessToken}`
            history.push('');
        })
        .catch(err => 
            console.log(err.response.data)
        )
    }

    return (
    <div className="SignUpPage">
        <div className="GNB">회원 가입</div>

        <div className="mainsource">
            <div className="form">
                <form action="">
                    <label htmlFor="id">아이디</label>
                    <input type="text" name="id" id="id" onChange={(e) => {
                        changeId(e.target.value);
                    }}/>

                    <label htmlFor="pw">비밀번호</label>
                    <input type="password" name="pw" id="pw" onChange={(e) => {
                        changePassword(e.target.value);
                    }}/>
            
                    <label htmlFor="pwCheck">비밀번호 확인</label>
                    <input type="password" name="pwCheck" id="pwCheck" />
                    
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name" onChange={(e) => {
                        changeName(e.target.value);
                    }}/>

                    <label htmlFor="gender">성별</label>
                    <div className="gender" id="gender">
                        <input type="radio" name="gender" id="man" value="man" onChange={(e) => {
                            changeGender(e.target.value);
                        }}/>
                        <label htmlFor="man">남</label>

                        <input type="radio" name="gender" id="woman" value="woman" onChange={(e) => {
                            changeGender(e.target.value);
                        }}/>
                        <label htmlFor="woman">여</label>
                    </div>
                    
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" onChange={(e) => {
                        changeEmail(e.target.value);
                    }}/>

                    <label htmlFor="birth">생년월일</label>
                    <input type="date" id="birth" onChange={(e) => {
                        changeBirth(e.target.value.toString());
                    }}/>

                    <button id="signUpBTN" onClick={signUpBTNClick}>회원가입</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default PwSearchPage;