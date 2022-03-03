import React from 'react';

class CardGraph extends React.Component{
    render(){
        return(
            <div className="col-xl-8 mb-5 mb-xl-0" data-component="CardGraph">
        <div className="card bg-gradient-default shadow">
          <div className="card-header bg-transparent">
            <div className="row align-items-center">
              <div className="col">
                <h6 className="text-uppercase text-light ls-1 mb-1">레코드변화</h6>
                <h2 className="text-white mb-0">벤치프레스</h2>
              </div>
              <div className="col">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">운동종류</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                          <option>벤치프레스</option>
                          <option>인클라인프레스</option>
                          <option>덤벨플라이</option>
                          <option>케이블크로스오버</option>
                          <option>딥스</option>
                        </select>
                    </div>
                </form>
                <ul className="nav nav-pills justify-content-end">
                  <li className="nav-item mr-2 mr-md-0" data-toggle="chart" data-target="#chart-sales" data-update="{&quot;data&quot;:{&quot;datasets&quot;:[{&quot;data&quot;:[0, 20, 25, 28, 40, 56, 70, 80, 100]}]}}" data-prefix="$"  data-suffix="개">
                    <a href="#" className="nav-link py-2 px-3 active" data-toggle="tab">
                      <span className="d-none d-md-block">Month</span>
                      <span className="d-md-none">개수</span>
                    </a>
                  </li>
                  <li className="nav-item" data-toggle="chart" data-target="#chart-sales" data-update="{&quot;data&quot;:{&quot;datasets&quot;:[{&quot;data&quot;:[0, 20, 25, 25, 30, 30, 30, 35, 40]}]}}" data-prefix="$" data-suffix="Kg">
                    <a href="#" className="nav-link py-2 px-3" data-toggle="tab">
                      <span className="d-none d-md-block">Week</span>
                      <span className="d-md-none">중량</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body">

            <div className="chart">

              <canvas id="chart-sales" className="chart-canvas" />
            </div>
          </div>
        </div>
      </div>
        );
    }
}
export default CardGraph;