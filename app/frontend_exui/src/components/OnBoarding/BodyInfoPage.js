import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/OnBoarding/BodyInfoPage.css';
import axios from "axios";

function BodyInfoPage() {
  
    let id = sessionStorage.getItem("user_id");

    useEffect(async() => {
        // 오늘의 루틴 호출
        await axios.get(`http://127.0.0.1:8000/api/workout/todayRoutine/${id}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
                // if (err.response.data.error === '오늘의 운동 루틴 생성 실패, 체력평가 결과 필요') {
                //     console.log("체력 평가 유도")
                // } else if (err.response.data.error === '오늘의 운동 계획이 이미 생성되었습니다') {
                //     console.log("skip")
                // }
            })
      })
  
    return (
      <div className="App">
      </div>
    );
}
    /*
    render() {
        
    return (
    /*
    <div className="BodyInfoPage">
        <div className="GNB">신체 정보를 입력해 주세요</div>
        <div className="mainsource">
            <label htmlFor="height">신장(cm)</label>
            <input type="text" name="height" id="height" />
                    
            <label htmlFor="weight">체중(kg)</label>
            <input type="text" name="weight" id="weight" />

            <label htmlFor="bmi">BMI</label>
            <input type="text" name="bmi" id="bmi" readOnly='true'/>

            <Link to="/OnBoarding/ScanPage"><button id="nextBTN">다음</button></Link>
        </div>
    </div>
      };
}
    */

export default BodyInfoPage;