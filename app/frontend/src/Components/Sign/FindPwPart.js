import React from 'react';

function FindPwPart(){
    return (

        <div>
        {/* Page content */}
        <div className="container mt--8 pb-5_">
          {/* Table */}
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card bg-secondary_ shadow_ border-0">
                <div className="card-body px-lg-5 py-lg-5">
                  <div className="text-center_ text-muted mb-4">
                    <small>회원정보입력</small>
                  </div>
                  <form role="form">
                    <div className="form-group">
                      <div className="input-group input-group-alternative mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="ni ni-single-02" /></span>
                        </div>
                        <input className="form-control" placeholder="이름" type="text" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group input-group-alternative mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="ni ni-circle-08" /></span>
                        </div>
                        <input className="form-control" placeholder="아이디" type="text" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group input-group-alternative mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="ni ni-email-83" /></span>
                        </div>
                        <input className="form-control" placeholder="이메일" type="email" />
                      </div>
                      <div className="text-center_">
                        <button type="button" className="btn btn-primary mt-4" onclick="showPopup(true,'send_email')"><i className="ni ni-send" />인증번호전송</button>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group input-group-alternative mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="ni ni-email-83" /></span>
                        </div>
                        <input className="form-control" placeholder="인증번호" type="text" />
                      </div>
                    </div>
                  </form>
                  <div className="text-center_">
                    <button type="button" className="btn btn-primary mt-4" onclick="showPopup(true,'submit');">💪임시패스워드 받기</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      );
}
export default FindPwPart