import React, { useState, Component, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as tf from "@tensorflow/tfjs"

import * as posenet from "@tensorflow-models/posenet"
import Webcam from "react-webcam"
// import { drawKeypoints, drawSkkeleton } from "./utill"
// import '../../css/MyPage/CheckPwPage.css';
import axios from "axios";


function MainPage() {

    const webcamRef = useRef(null);

    let [pushUp, changePushUp] = useState();
    let [sitUp, changeSitUp] = useState();
    let [squat, changeSquat] = useState();

    let [totalInfo, changeTotalInfo] = useState();
    let [upperBodyStrengthInfo, changeUpperBodyStrengthInfo] = useState();
    let [stomachStrengthInfo, changeStomachStrengthInfo] = useState();
    let [lowerBodyStrengthInfo, changeLowerBodyStrengthInfo] = useState();

    let workout = 'pushup'
    let id = sessionStorage.getItem("user_id");

    // axios.get("http://127.0.0.1:8000/api/workout/pushUp/2")
    // .then(res => {
    //     console.log(res.data)
    // })
    // .catch(err => 
    //     console.log(err)
    // )
    
    return (
    <div className="MainPage">

        <div className="mainsource">
            <Link to="/"><button>login 이동</button></Link>

            <label htmlFor="push_up">팔굽혀펴기</label>
            <input type="text" name="push_up" onChange={(e) => {
                    changePushUp(e.target.value)}}/>

            <label htmlFor="sit_up">윗몸일으키기</label>
            <input type="text" name="sit_up" onChange={(e) => {
                    changeSitUp(e.target.value)}} />

            <label htmlFor="squat">스쿼트</label>
            <input type="text" name="squat" onChange={(e) => {
                    changeSquat(e.target.value)}} />

            <button>전송</button>

            <textarea name="totalInfo" id="totalInfo" cols="60" rows="20" readOnly="true" value={totalInfo}></textarea>
            <textarea name="upperBodyStrengthInfo" id="upperBodyStrengthInfo" cols="60" rows="20" readOnly="true" value={upperBodyStrengthInfo}></textarea>
            <textarea name="stomachStrengthInfo" id="stomachStrengthInfo" cols="60" rows="20" readOnly="true" value={stomachStrengthInfo}></textarea>
            <textarea name="lowerBodyStrengthInfo" id="lowerBodyStrengthInfo" cols="60" rows="20" readOnly="true" value={lowerBodyStrengthInfo}></textarea>

            {/* <img src={"http://127.0.0.1:8000/api/detectme/startWorkout/"+workout+"/"+id}></img> */}

        </div>
    </div>
    );
}

export default MainPage;