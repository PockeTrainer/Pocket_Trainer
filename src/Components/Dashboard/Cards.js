import React from 'react';
import styled from "styled-components"

function Cards(){
  const StyledSpan=styled.span`
    color:${(props)=>props.color||"black"};
    `;

    const StyledDiv=styled.div`
      width:${(props)=>props.width||"0%"};
    `;

        return(
            <div className="row" data-component="Card">
        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">나의 체력등급</h5>
                  <span className="h2 font-weight-bold mb-0">💪[가슴]-<StyledSpan color="#00cb00">1등급</StyledSpan><br></br></span>
                  <span className="h2 font-weight-bold mb-0">🏃[등]-<StyledSpan color="red">3등급</StyledSpan><br></br></span>
                  <span className="h2 font-weight-bold mb-0">🦵[어깨]-<StyledSpan color="#b5b500">2등급</StyledSpan></span>
                  <hr></hr>
                  <span className="h2 font-weight-bold mb-0">💪[팔]-<StyledSpan color="#00cb00">1등급</StyledSpan><br></br></span>
                  <span className="h2 font-weight-bold mb-0">🏃[복근]-<StyledSpan color="red">3등급</StyledSpan><br></br></span>
                  <hr></hr>
                  <span className="h2 font-weight-bold mb-0">💪[하체]-<StyledSpan color="#00cb00">1등급</StyledSpan><br></br></span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                    <i className="fas fa-chart-bar" />
                  </div>
                </div>
              </div>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className="text-success mr-2"><i className="fa fa-arrow-up" />하체1등급 상승</span>
                <span className="text-nowrap">과거 기록대비(11/07)</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">오늘의 운동루틴</h5>
                  <span className="h3 font-weight-bold mb-0">[가슴]-벤치프레스<StyledSpan color='green'>⭕</StyledSpan><br></br></span>
                  <span className="h3 font-weight-bold mb-0">[가슴]-인클라인프레스<StyledSpan color='red'>❌</StyledSpan><br></br></span>
                </div>
               
                <div className="col-auto">
                  <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                    <i className="fas fa-dumbbell" />
                  </div>
                  
                </div>
              </div>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className="text-danger mr-2"><i className="fas fa-arrow-down" />인클라인프레스 수행안함</span>
                <span className="text-nowrap">마지막 기록대비(11/07)</span>
                <button type="button" className="btn btn-primary btn-lg btn-block"><i className="fas fa-running"></i>운동하러 가기</button>
              </p>
              <div className="progress-wrapper">
                  <div className="progress-info">
                    <div className="progress-label">
                      <span>운동성취도</span>
                    </div>
                    <div className="progress-percentage">
                      <span>60%</span>
                    </div>
                  </div>
                  <div className="progress">
                    <StyledDiv className="progress-bar bg-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" width="60%"></StyledDiv>
                  </div>
                  {/* 여기서 운동 성취도 보여주는 그래프로 width만 props로 바꿔주자 */}
                </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">오늘의 운동교정평가</h5>
                  <div className="form-group">
                                <label for="exampleFormControlSelect1">Today운동</label>
                                <select className="form-control" id="exampleFormControlSelect1">
                                <option>벤치프레스</option>
                                <option>인클라인프레스</option>
                                <option>펙덱 플라이</option>
                                </select>
                            </div>
                  <span className="h3 font-weight-bold mb-0">"벤치프레스를 할 때 오른쪽 어깨가 15도정도 내려가있으니 오른쪽을 좀 더 올려주시기 바랍니다"</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-purple text-white rounded-circle shadow">
                    <i className="fas fa-users" />
                  </div>
                </div>
              </div>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className="text-warning mr-2"><i className="fas fa-arrow-down" />불균형발생</span>
                <span className="text-nowrap">마지막 기록대비(11/07)</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">오늘의 섭취열량</h5>
                  <span className="h2 font-weight-bold mb-0">총 칼로리:2700kcal</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                    <i className="fas fa-percent" />
                  </div>
                </div>
              </div>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className="text-warning mr-2"><i className="fas fa-arrow-up" />칼로리 150kcal증가</span>
                <span className="text-nowrap">전 날 대비(11/07)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
        );
    }
export default Cards;