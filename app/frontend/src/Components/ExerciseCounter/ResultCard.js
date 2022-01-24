import React from 'react';


class ResultCard extends React.Component{
    render(){
        return(
            <div className="card bg-secondary shadow" data-component="AccountInformationCard">
        
        <div className="card-body">
          <form>
            <h2 className="text-muted mb-4">평가결과</h2>
            <div className="pl-lg-4">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="input-username">푸시업개수</label>
                    <input type="text" id="input-pushup" className="form-control form-control-alternative" placeholder="Username" defaultValue="60개" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="input-email">윗몸일으키기개수</label>
                    <input type="email" id="input-email" className="form-control form-control-alternative" placeholder="jesse@example.com" defaultValue="50개" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="input-first-name">스쿼트개수</label>
                    <input type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" defaultValue="45개" />
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            
            <hr className="my-4" />
            {/* Description */}
            <h3 className="text-muted mb-4">최종평가</h3>
            <div className="pl-lg-4">
              <div className="form-group">
                <label>About Me</label>
                <textarea rows={4} className="form-control form-control-alternative" placeholder="A few words about you ..." defaultValue={"당신의 최종등급은 3급이며 특히 하체근육의 발달이 부족하오니 스쿼트 관련 운동컨테츠를 추천드립니다."} />
              </div>
            </div>
          </form>
        </div>
      </div>
        );
    }
}
export default ResultCard;