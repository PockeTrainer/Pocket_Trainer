import React from 'react';

class CardStickGraph extends React.Component{
    render(){
        return(
            <div className="col-xl-4" data-component="CardStickGraph">
                <div className="card shadow">
                <div className="card-header bg-transparent">
                    <div className="row align-items-center">
                    <div className="col">
                        <h6 className="text-uppercase text-muted ls-1 mb-1">식단그래프</h6>
                        <h2 className="mb-0">단백질섭취양</h2>
                        <form>
                            <div className="form-group">
                                <label for="exampleFormControlSelect1">운동종류</label>
                                <select className="form-control" id="exampleFormControlSelect1">
                                <option>탄수화물</option>
                                <option>단백질</option>
                                <option>지방</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                <div className="card-body">
                    {/* Chart */}
                    <div className="chart">
                    <canvas id="chart-orders" className="chart-canvas" />
                    </div>
                </div>
                </div>
          </div> 
        );
    }
}
export default CardStickGraph;