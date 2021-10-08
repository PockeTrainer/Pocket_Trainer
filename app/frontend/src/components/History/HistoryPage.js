import React, { useState } from 'react';
// 추가 부분 1
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//import calenderImg from '../../images/calender.png'
import '../../css/History/HistoryPage.css';


function HistoryPage() {

    let [date, changeDate] = useState(new Date());
    
    return (
    <div className="HistoryPage">
        <div className="mainsource">
            <div className="calender">
                <h1>히스토리</h1>

                {/* 추가 부분3 */}
                <Calendar
                    onChange={
                        (date) => changeDate(date)
                    }
                    value = { date }
                />
                <div>
                    오늘 날짜
                    { date.toString() }
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

export default HistoryPage;