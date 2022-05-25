import React, { useEffect, useRef, useState } from 'react';
import Modal from '../SameLayout/Modal';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import SignPartModal from './SignPartModal';
import { NAVER_AUTH_URL } from "./naver";
import { KAKAO_AUTH_URL } from "./kakao";

function LoginPart(){

    const navigate = useNavigate();
    const modalRef=useRef();

    // const code = new URL(window.location.href).searchParams.get("code")
    // const state = new URL(window.location.href).searchParams.get("state")
  //소셜계정용

    const ShowWrongInfo=()=>{//모달창 보여주기
      modalRef.current.click();
    }

    let [id, changeId] = useState();
    let [password, changePassword] = useState();

    const logInBTNClick = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/user/login", {
            id : id,
            password : password
        })
        .then(res => {
            console.log(res.data);
            console.log(res.data.Token);
            axios.defaults.headers.common['Authorization'] = `token ${res.data.Token}`
            sessionStorage.setItem("isAuthorized", "true");
            sessionStorage.setItem("user_id", res.data.User.id);
            sessionStorage.setItem("user_name",res.data.User.name);
            //navigate('/');
            window.location.replace("/");//상위 app 컴포넌트에서의 useEffect가 다시 돌아가줘야 after_login이 업데이트됨
        })
        .catch(err => {

          console.log(err.response.data)
          if(err.response.data.error==="존재하지 않는 ID 이거나 PassWord입니다"){
            ShowWrongInfo();//모달창 보여주기
          }
          
        })
    }

    const goto_kakao=(e)=>{
      e.preventDefault();
      window.location.replace(KAKAO_AUTH_URL);
    }
  
    
    // useEffect(()=>{
    //    //네이버 로그인
    //    if (code != null & state != null) {
    //     console.log('naver')
    //     axios.get(`/user/naver/login/${code}/${state}`)
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(err => console.log(err))
    //   }
    // //카카오 로그인
    //   else if (code != null) {
    //       console.log('kakao')
    //       axios.get(`/user/kakao/login/${code}`)
    //           .then(res => {
    //               console.log(res)
    //           })
    //           .catch(err => console.log(err))
    //   }

    // },[code,state])

    // console.log(code);
    // console.log(state);

    return (
        <div>
          {/* Page content */}
          <div className="container mt--8 pb-5_">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-7">
                <div className="card bg-secondary_ shadow_ border-0">
                  <div className="card-body px-lg-5 py-lg-5">
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
                      <a  className="btn btn-neutral btn-icon" onClick={goto_kakao}>
                        <span className="btn-inner--icon"><img src="../assets/img/brand/카카오톡로고.png" /></span>
                        <span className="btn-inner--text">KAKAO</span>
                      </a>
                      <a href={NAVER_AUTH_URL} className="btn btn-neutral btn-icon" >
                        <span className="btn-inner--icon"><img src="../assets/img/brand/naver.png" /></span>
                        <span className="btn-inner--text">NAVER</span>
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

          <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-show-Wrong-login">Default</button>
          <SignPartModal which_error={"wrong_login"}/>

        </div>
        
      );
}
export default LoginPart