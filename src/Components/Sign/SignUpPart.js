import React, { useEffect, useState } from 'react';
import ResponsiveDatePickers from '../SameLayout/DatePicker';

function SignUpPart(){
    return (

        <div>
        {/* Page content */}
            <div className="container mt--8 pb-5">
            {/* Table */}
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                <div className="card bg-secondary shadow border-0">
                    <div className="card-body px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <small>계정만들기</small>
                    </div>
                    <form role="form">
                        <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-single-02" /></span>
                            </div>
                            <input className="form-control" placeholder="아이디" type="text" />
                        </div>
                        </div>
                        <div className="text-muted font-italic"><small>보안수준: <span className="text-success font-weight-700">안전함</span></small></div>
                        <div className="form-group">
                        <div className="input-group input-group-alternative">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                            </div>
                            <input className="form-control" placeholder="패스워드" type="password" />
                        </div>
                        </div>
                        <div className="form-group">
                        <div className="input-group input-group-alternative">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                            </div>
                            <input className="form-control" placeholder="패스워드확인" type="password" />
                        </div>
                        </div>
                        <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-circle-08" /></span>
                            </div>
                            <input className="form-control" placeholder="이름" type="email" />
                        </div>
                        </div>
                        <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-email-83" /></span>
                            </div>
                            <input className="form-control" placeholder="이메일" type="email" />
                        </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 sex">
                                <div className="custom-control custom-control-alternative custom-checkbox sex">
                                <input className="custom-control-input" id="man" type="checkbox" />
                                <label className="custom-control-label seperator" htmlFor="man">
                                    <span className="text-muted">남자</span>
                                </label>
                                </div>
                                <div className="custom-control custom-control-alternative custom-checkbox sex ">
                                <input className="custom-control-input" id="woman" type="checkbox" />
                                <label className="custom-control-label" htmlFor="woman">
                                    <span className="text-muted">여자</span>
                                </label>
                                </div>
                            </div>
                        </div>
                        <ResponsiveDatePickers/>
                    </form>
                    <div className="card-header bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-3"><small className="login_method">다른계정으로 계정생성</small></div>
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
                    <div className="text-center">
                        <button type="button" className="btn btn-primary mt-4">💪PT등록하기</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
      );
}
export default SignUpPart