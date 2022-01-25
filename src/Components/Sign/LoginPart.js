import React, { useEffect, useRef, useState } from 'react';
import Modal from '../SameLayout/Modal';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function LoginPart(){

    const navigate = useNavigate();

    let [id, changeId] = useState();
    let [password, changePassword] = useState();

    const logInBTNClick = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/user/login", {
            id : id,
            password : password
        })
        .then(res => {
            console.log(res.data);
            console.log(res.data.Token);
            axios.defaults.headers.common['Authorization'] = `token ${res.data.Token}`
            //sessionStorage.setItem("isAuthorized", "true");
            sessionStorage.setItem("user_id", res.data.User.id);
            //navigate('/');
            window.location.replace("/");//상위 app 컴포넌트에서의 useEffect가 다시 돌아가줘야 after_login이 업데이트됨
        })
        .catch(err => 
            console.log(err.response.data)
        )
    }
    return (
        <div>
          {/* Page content */}
          <div className="container mt--8 pb-5_">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-7">
                <div className="card bg-secondary_ shadow_ border-0">
                  <div className="card-body px-lg-5 py-lg-5">
                    <div className="text-center_ text-muted mb-4">
                      <small>로그인하기</small>
                    </div>
                    <form role="form">
                      <div className="form-group mb-3">
                        <div className="input-group input-group-alternative">
                          <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-email-83" /></span>
                          </div>
                          <input className="form-control" placeholder="아이디" type="email" onChange={(e) => {
                              changeId(e.target.value);
                          }} />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group input-group-alternative">
                          <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                          </div>
                          <input className="form-control" placeholder="패스워드" type="password" onChange={(e) => {
                              changePassword(e.target.value);
                          }} />
                        </div>
                      </div>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                        <label className="custom-control-label" htmlFor=" customCheckLogin">
                          <span className="text-muted">아이디기억하기</span>
                        </label>
                      </div>
                      <div className="text-center">
                        <button type="button" className="btn btn-primary my-4" onClick={logInBTNClick}>💪득근하러가기</button>
                      </div>
                    </form>
                  </div>
                  <div className="card-header_ bg-transparent_ pb-5_">
                    <div className="text-muted text-center mt-2 mb-3"><small className="login_method_">다른계정으로 로그인</small></div>
                    <div className="btn-wrapper text-center">
                      <a href="#" className="btn btn-neutral btn-icon">
                        <span className="btn-inner--icon"><img src="../assets/img/brand/카카오톡로고.png" /></span>
                        <span className="btn-inner--text">KAKAO</span>
                      </a>
                      <a href="#" className="btn btn-neutral btn-icon">
                        <span className="btn-inner--icon"><img src="../assets/img/icons/common/google.svg" /></span>
                        <span className="btn-inner--text">GOOGLE</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6 text-left_">
                    <Link to="/account/findId" className="text-light" ><p>아이디 찾기</p><i className="fas fa-arrow-circle-left" /></Link>
                  </div>
                  <div className="col-6 text-right">
                    <Link to="/account/findPw" className="text-light"><p>비밀번호 찾기</p><i className="fas fa-arrow-circle-right" /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link to="/account/signUp" className="text-light"><p>회원가입</p><i className="ni ni-single-02" /></Link>
          </div>

        </div>
        
      );
}
export default LoginPart