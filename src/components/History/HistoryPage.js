import React, { Component } from 'react';
import calenderImg from '../../images/calender.png'
import '../../css/History/HistoryPage.css';

class HistoryPage extends Component {
    render() {
    return (
    <div className="HistoryPage">
        <div className="mainsource">
            <div className="calender">
                <h1>히스토리</h1>
                <div className="img">
                    <img src={calenderImg} alt="" />
                </div>
            </div>

            <div className="records">
                <div className="workoutRecord">
                    <button onClick={function(e){
                        e.preventDefault();
                        //this.props.goIdSearchPage();
                    }.bind(this)}>운동 기록이 없습니다</button>
                </div>

                <div className="weightRecord">
                    <button onClick={function(e){
                        e.preventDefault();
                        //this.props.goIdSearchPage();
                    }.bind(this)}>몸무게를 입력하세요!</button>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default HistoryPage;