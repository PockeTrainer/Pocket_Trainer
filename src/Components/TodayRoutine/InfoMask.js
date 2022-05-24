import React from "react";


function InfoMask(){
    return(

        <div data-component="ProfileHeader" className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{backgroundImage: 'url(../assets/img/theme/피트니스사진.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
        {/* Mask */}
        <span className="mask bg-gradient-default_1 opacity-8" />
        {/* Header container */}
          <div className="container-fluid d-flex align-items-center">
            <div className="row">
              <div className="col-lg-7 col-md-10">
                 {/* <h1 className="display-2 text-white"><i className="fas fa-running" style={{color:"#5e72e4"}}></i>오늘의루틴<i className="fas fa-running fa-flip-horizontal" style={{color:"#5e72e4"}}></i></h1> */}
                {/* <p className="text-white mt-0 mb-5">회원님의 각 부위별 등급을 기준으로 그에 적절한 오늘의 루틴을 추천해드립니다</p>
                <button  className="btn btn-info" style={{backgroundColor:"#5e72e4",borderColor:"#5e72e4"}}><i class="far fa-question-circle"></i>사용방법</button>  */}
              </div>
            </div>
          </div>
      </div>
    );
}
export default InfoMask