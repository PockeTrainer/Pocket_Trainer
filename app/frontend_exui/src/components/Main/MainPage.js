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

    useEffect(async() => {
        // 해당일 처음 로그인 한 사용자 루틴 생성
        await axios.post(`http://127.0.0.1:8000/api/workout/createRoutine/${id}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data)
                if (err.response.data.error === '오늘의 운동 루틴 생성 실패, 체력평가 결과 필요') {
                    console.log("체력 평가 유도")
                } else if (err.response.data.error === '오늘의 운동 계획이 이미 생성되었습니다') {
                    console.log("skip")
                }
            })
        
        // 메인 페이지 정보 호출
        await axios.get(`http://127.0.0.1:8000/api/history/mainpageInfo/${id}`)
            .then((res) => {
                console.log(res.data);
                //유저정보(체중, 키), 체력평가 여부 확인
                if (res.data.modal_seq == 0) {
                    console.log("둘다x")
                }   //유저정보x(체중, 키), 체력평가x
                else if (res.data.modal_seq == 1) {
                    console.log("유저정보o, 체력평가x")
                }   //유저정보o
                else if (res.data.modal_seq == 2) {
                    console.log("유저정보o, 체력평가o")
                }   //유저정보o, 체력평가o

            })
            .catch((err) => {
                console.log(err.response.data)
            })

        //체력 평가 결과 리턴
        axios.get(`http://127.0.0.1:8000/api/workout/lastTestResult/${id}`)
            .then(res => {
                console.log(res.data);
                let upperBodyStrength = parseInt(res.data.upperbody_strength);
                let stomachStrength = parseInt(res.data.stomach_strength);
                let lowerBodyStrength = parseInt(res.data.lowerbody_strength);
                let totalInfo = (upperBodyStrength+stomachStrength+lowerBodyStrength) / 3
                
                if (1 <= totalInfo && totalInfo < 2.5) {
                    console.log(totalInfo);
                    changeTotalInfo("잘하셨습니다. 측정결과 매우 우수한 체력관리를 유지하셨습니다. 방심하지 마시고 현재의 체력수준을 유지할수 있도록 꾸준히 운동을 하셔서 운동에 의한 자극을 통해 신체의 생리적, 생화학적변화를 반복함으로써 안정을 취할 때나 힘든 일을 할 때, 스트레스를 받았을 때 신체의 기능이 급격하게 변화하지 않고 안정적으로 사신체 기능을 유지시키도록 노력하세요. 체력은 전반적으로 매우 좋습니다. 체력은 단지 신체적인 건강뿐만 아니라 사회적응력, 정서적, 지능적 발달에도 아주 밀접한 관계를 가지고 있으므로 규칙적인 생활습관과 꾸준한 운동으로 우수한 체력수준을 유지하시길 바랍니다.");
                } else if (2.5 <= totalInfo && totalInfo < 4) {
                    changeTotalInfo("잘하셨습니다. 측정결과 많은 노력을 하신 것 같습니다. 지금처럼 계속 꾸준한 체력관리를 하신다면 더욱더 좋은 결과가 있을꺼라 생각합니다. 방심은 금물! 꾸준한 체력관리로 체력수준을 더욱 향상시킬수 있도록 노력하세요. 우리 몸은 기계와 마찬가지로 적당히 사용하면 건강하고 활기가 넘치지만 사용하지 않으면 녹슬고 퇴화하기 마련입니다. 그러므로 신체의 모든 기관들이 건강하게 제 기능을 유지하려면 운동을 통해 적절한 자극을 주어야 하며 보다 건강한 체력을 유지 하실수 있도록 신경 쓰시길 바라며 운동시에 안정된 동작으로 참여할 수 있도록 추천권장운동을 참조하여 운동하십시요.");
                } else {
                    changeTotalInfo("운동시간이 부족하신가요? 보통체력 수준보다도 못 미친신 것 같네요. 꾸준한 체력관리로 체력수준을 향상시키도록 노력하셔야 겠네요. 우리 몸은 기계와 마찬가지로 적당히 사용하면 건강하고 활기가 넘치지만 사용하지 않으면 녹슬고 퇴화하기 마련입니다. 그러므로 신체의 모든 기관들이 건강하게 제 기능을 유지하려면 운동을 통해 적절한 자극을 주어야 합니다. 적절한 운동은 주 4～5회가 적당하고 이를 준비운동, 본운동, 정리운동으로 나누어 실시하며 준비운동은 가벼운 맨초체조나 스트레칭 등의 유연성운동 위주로 하고, 본운동은 달리기나 수영같은 심폐지구력운동 위주 실시하며, 이런 운동으로써 신체의 생리적, 생화학적 변화를 반복함으로써 안정을 취할 때나 힘든 일을 할 때, 스트레스를 받았을 때 신체의 기능이 급격하게 변화하지 않고 안정적으로 기능을 유지에도 도움을 주어 보다 건강한 신체와 체력으로 향상시키시길 바랍니다.")
                }

                if (1 <= upperBodyStrength && upperBodyStrength <= 2) {
                    changeUpperBodyStrengthInfo("평소에 체력관리를 잘 하셨습니다. 매우 좋은 체력을 가지셨네요. 이상적인 체형은 자신에 대한 자신감이 생기며 각종 질병도 예방할 수 있습니다.이 정도로 계속 유지하신다면 건강한 체형을 유지하실 수 있겠네요. 지속적인 관리와 노력으로 건강한 신체를 보전하실 수 있도록 하시고 규칙적인운동과 올바른 식습관을 생활화하여 지금의 체력수준을 계속적으로 유지하시길 바랍니다.");
                } else if (3 <= upperBodyStrength && upperBodyStrength <= 4) {
                    changeUpperBodyStrengthInfo("평소체력관리를 잘하셨나요? 당신의 체력수준은 보통입니다. 이 정도로 계속 유지하신다면 체력은 물론 체형의 변화도 올 수 있습니다. 이상적인 체형은 자신에게 자신감이 생기며 각종 질병도 예방할 수 있지만 그렇지 못할 경우엔 자신감의 저하는 물론 각종 성인병으로 인해 건강을 해칠 수 있습니다. 대체적으로 전신의 근지구력이 부족한 것으로 나타났습니다. 근지구력이 부족하면 근력도 더불어 약화되기 대문에 부상이 잦아질 수 있으니 추천권장운동을 참조하여 근지구력을 향상시키시고 좀 더 규칙적이며 적극적인 운동자세를 갖추시기 바랍니다.");
                } else {
                    changeUpperBodyStrengthInfo("평소 체력관리를 전혀 안하시는군요. 당신의 체력수준은 매우 미흡합니다. 지금의 수준을 계속 유지하신다면 신체활동 부족으로 체력은 물론 체형의 변화도 올 수 있습니다. 이상적인 체형은자신에게 자신감이 생기며 각종 질병도 예방할 수 있지만 그렇지 못한 경우엔 자신감의 저하는 물론 각종 성인병으로 인해 건강을 해칠수 있습니다.대체적으로 전신의 근력이 매우 부족합니다. 근력 부족하면 단시간운동을 하여도 쉽게 지치게 되고 부사도 잦아질수 있으니 추천권장운동을 참조하여 근력을 향상시키고 좀더 규칙적이며적극적인 운동자세를 갖추어 운동을 하십시요.")
                }

                if (1 <= stomachStrength && stomachStrength <= 2) {
                    changeStomachStrengthInfo("평소에 체력관리를 잘 하셨습니다. 매우 좋은 체력을 가지셨네요. 이상적인 체형은 자신에 대한 자신감이 생기며 각종 질병도 예방할 수 있습니다.이 정도로 계속 유지하신다면 건강한 체형을 유지하실 수 있겠네요. 지속적인 관리와 노력으로 건강한 신체를 보전하실 수 있도록 하시고 규칙적인운동과 올바른 식습관을 생활화하여 지금의 체력수준을 계속적으로 유지하시길 바랍니다.");
                } else if (3 <= stomachStrength && stomachStrength <= 4) {
                    changeStomachStrengthInfo("평소체력관리를 잘하셨나요? 당신의 체력수준은 보통입니다. 이 정도로 계속 유지하신다면 체력은 물론 체형의 변화도 올 수 있습니다. 이상적인 체형은 자신에게 자신감이 생기며 각종 질병도 예방할 수 있지만 그렇지 못할 경우엔 자신감의 저하는 물론 각종 성인병으로 인해 건강을 해칠 수 있습니다. 대체적으로 전신의 근지구력이 부족한 것으로 나타났습니다. 근지구력이 부족하면 근력도 더불어 약화되기 대문에 부상이 잦아질 수 있으니 추천권장운동을 참조하여 근지구력을 향상시키시고 좀 더 규칙적이며 적극적인 운동자세를 갖추시기 바랍니다.");
                } else {
                    changeStomachStrengthInfo("평소 체력관리를 전혀 안하시는군요. 당신의 체력수준은 매우 미흡합니다. 지금의 수준을 계속 유지하신다면 신체활동 부족으로 체력은 물론 체형의 변화도 올 수 있습니다. 이상적인 체형은자신에게 자신감이 생기며 각종 질병도 예방할 수 있지만 그렇지 못한 경우엔 자신감의 저하는 물론 각종 성인병으로 인해 건강을 해칠수 있습니다.대체적으로 전신의 근력이 매우 부족합니다. 근력 부족하면 단시간운동을 하여도 쉽게 지치게 되고 부사도 잦아질수 있으니 추천권장운동을 참조하여 근력을 향상시키고 좀더 규칙적이며적극적인 운동자세를 갖추어 운동을 하십시요.")
                }

                if (1 <= lowerBodyStrength && lowerBodyStrength <= 2) {
                    changeLowerBodyStrengthInfo("평소에 체력관리를 잘 하셨습니다. 매우 좋은 체력을 가지셨네요. 이상적인 체형은 자신에 대한 자신감이 생기며 각종 질병도 예방할 수 있습니다.이 정도로 계속 유지하신다면 건강한 체형을 유지하실 수 있겠네요. 지속적인 관리와 노력으로 건강한 신체를 보전하실 수 있도록 하시고 규칙적인운동과 올바른 식습관을 생활화하여 지금의 체력수준을 계속적으로 유지하시길 바랍니다.");
                } else if (3 <= lowerBodyStrength && lowerBodyStrength <= 4) {
                    changeLowerBodyStrengthInfo("평소체력관리를 잘하셨나요? 당신의 체력수준은 보통입니다. 이 정도로 계속 유지하신다면 체력은 물론 체형의 변화도 올 수 있습니다. 이상적인 체형은 자신에게 자신감이 생기며 각종 질병도 예방할 수 있지만 그렇지 못할 경우엔 자신감의 저하는 물론 각종 성인병으로 인해 건강을 해칠 수 있습니다. 대체적으로 전신의 근지구력이 부족한 것으로 나타났습니다. 근지구력이 부족하면 근력도 더불어 약화되기 대문에 부상이 잦아질 수 있으니 추천권장운동을 참조하여 근지구력을 향상시키시고 좀 더 규칙적이며 적극적인 운동자세를 갖추시기 바랍니다.");
                } else {
                    changeLowerBodyStrengthInfo("평소 체력관리를 전혀 안하시는군요. 당신의 체력수준은 매우 미흡합니다. 지금의 수준을 계속 유지하신다면 신체활동 부족으로 체력은 물론 체형의 변화도 올 수 있습니다. 이상적인 체형은자신에게 자신감이 생기며 각종 질병도 예방할 수 있지만 그렇지 못한 경우엔 자신감의 저하는 물론 각종 성인병으로 인해 건강을 해칠수 있습니다.대체적으로 전신의 근력이 매우 부족합니다. 근력 부족하면 단시간운동을 하여도 쉽게 지치게 되고 부사도 잦아질수 있으니 추천권장운동을 참조하여 근력을 향상시키고 좀더 규칙적이며적극적인 운동자세를 갖추어 운동을 하십시요.")
                }
            })
            .catch(err => console.log(err))
    }, []);
 
    const onClick = () => {
        axios.post(`http://127.0.0.1:8000/api/workout/testResult/${id}`, {
            pushUp : pushUp,
            sitUp : sitUp,
            squat : squat
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }

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

            <button onClick={onClick}>전송</button>

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