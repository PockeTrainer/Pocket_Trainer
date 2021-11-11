import React, { useState, useEffect } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// 추가 부분 1
import moment from 'moment';
//import calenderImg from '../../images/calender.png'
import '../../css/History/HistoryPage.css';
import axios from "axios";

function HistoryPage() {

    let [bmi, changeBMI] = useState();
    let [weight, changeWeight] = useState();
    let [workoutList, changeWorkoutList] = useState();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();
    const newToday = `${year}-${month}-${day}`

    let [date, changeDate] = useState(newToday);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/workout/history/2/${date}`)
        .then(res => {
            console.log(res);
            const workoutLen = res.data.length;

            var woList = new Array();
            for (var i in res.data) {
                woList.push([`${res.data[i].workout_id.workout_name} :  ${res.data[i].total_time}`])
            }
            changeWorkoutList(woList)
            
            if (workoutLen > 0) {
                if (res.data[workoutLen-1].bmi) {
                    changeBMI(res.data[workoutLen-1].bmi);
                }
                else {
                    changeBMI("운동 기록이 없습니다.")
                }
            } else {
                changeBMI("운동 기록이 없습니다.")
            }
            
            //`${res.data[workoutLen-1].weight}kg
            if (workoutLen > 0) {
                if (res.data[workoutLen-1].weight) {
                    changeWeight(`${res.data[workoutLen-1].weight} kg`);
                }
                else {
                    changeWeight("몸무게를 입력하세요.")
                }
            } else {
                changeWeight("몸무게를 입력하세요.")
            }
        })
        .catch(err => console.log(err))
    }, [date]);

    return (
    <div className="HistoryPage">
        <div className="mainsource">
            <div className="calender">
                <h1>히스토리</h1>

                {/* 추가 부분2 */}
                <Calendar
                    onChange={(date1) => {
                        // alert(moment(date).format("YYYY-MM-DD"))
                        const year = date1.getFullYear();
                        const month = date1.getMonth()+1;
                        const day = date1.getDate();  
                        changeDate(`${year}-${month}-${day}`)

                        // axios.post("http://127.0.0.1:8000/api/workout/history/2", {
                        //     date: date
                        // })
                        // .then(res => {
                        //     if (res.data.length > 0) {
                        //         changeBMI(res.data[0].workout_date.bmi);
                        //     } else {
                        //         changeBMI("운동 기록이 없습니다.")
                        //     }
                            
                        //     if (res.data.length > 0) {
                        //         changeWeight(`${res.data[0].workout_date.weight}kg`)
                        //     } else {
                        //         changeWeight("몸무게를 입력하세요.")
                        //     }
                        // })
                        // .catch(err => console.log(err))
                    }}
                    // value = { date }
                />
                <div>
                    오늘 날짜
                    {date.toString()}
                </div>
                
            </div>

            <div className="records">
                <div className="workoutRecord">
                    <button onClick={function(e){
                        e.preventDefault();
                        // axios.post("http://127.0.0.1:8000/api/workout/history/2", {
                        //     date: date
                        // })
                        // .then(res => console.log(res))
                        // .catch(err => console.log(err))
                        //this.props.goIdSearchPage();
                    }.bind(this)}>{ bmi }</button>
                </div>

                <div className="weightRecord">
                    <button onClick={function(e){
                        e.preventDefault();
                        // axios.get('http://127.0.0.1:8000/date')
                        // .then(data => alert(data))
                        // .catch(err => console.log(err))
                        //this.props.goIdSearchPage();
                    }.bind(this)}>{ weight }</button>
                </div>

            </div>
            <h1>한 운동 리스트</h1>
                {workoutList}
        </div>
    </div>
    );
}

export default HistoryPage;