import React, { useState, Component, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as tf from "@tensorflow/tfjs"

import Webcam from "react-webcam"
// import { drawKeypoints, drawSkkeleton } from "./utill"
// import '../../css/MyPage/CheckPwPage.css';
import axios from "axios";
import { range } from '@tensorflow/tfjs';

function MainPage() {

    let [keyWord, changeKeyWord] = useState();
    let [foodInfo, changeFoodInfo] = useState("검색해주세요");


    let workout = 'pushup'
    let id = sessionStorage.getItem("user_id");

    useEffect(() => {
        axios.get(`http://openapi.foodsafetykorea.go.kr/api/4283446d9a824d28a909/I2790/json/1/10/DESC_KOR=구이`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }, []);
    
    const onClick_searchBTN = () => {
        changeFoodInfo('검색중...')
        axios.get(`http://openapi.foodsafetykorea.go.kr/api/4283446d9a824d28a909/I2790/json/1/50/DESC_KOR=${keyWord}`)
            .then(res => {
                if (res.data.I2790.total_count != 0) {
                    console.log(res.data.I2790.row)
                    changeFoodInfo(res.data.I2790.row)
                    console.log(foodInfo)
                } else {
                    changeFoodInfo('검색결과가 없습니다.')
                }
            })
            .catch(err => console.log(err))
    }
    
    const onClick_foodLi = (food, e) => {
        console.log('제품명 :', food.DESC_KOR)
        console.log('열량(kcal)(1회제공량당) :', food.NUTR_CONT1)
        console.log('탄수화물(g)(1회제공량당) :', food.NUTR_CONT2)
        console.log('단백질(g)(1회제공량당) :', food.NUTR_CONT3)
        console.log('지방(g)(1회제공량당) :', food.NUTR_CONT4)
        console.log('1회제공량 :', food.SERVING_SIZE)
    }

    const onChange = (e) => {
        console.log(e.target.value)
        changeKeyWord(e.target.value)
        /*
        axios.get(`http://openapi.foodsafetykorea.go.kr/api/4283446d9a824d28a909/I2790/json/1/50/DESC_KOR=${keyWord}`)
        .then(res => {
            //console.log(res.data.I2790.row);
            //console.log(res.data.I2790.total_count)

            //총 갯수
            let total = res.data.I2790.total_count
            if (total > 49) {
                total = 50;
            }

            const lst = []
            for (let i=0; i<total; i++) {
                lst.push(res.data.I2790.row[i].DESC_KOR)
            }

            changeFoodInfo(lst)
            
        })
        .catch(err => console.log(err))
        */
    }

    
    return (
    <div className="MainPage">
        <div>
            <input type="text" onChange={onChange}/>
            <button onClick={onClick_searchBTN}>검색</button>

            <ul>
                {
                    typeof foodInfo == "string"
                        ?<li>{foodInfo}</li>
                        :foodInfo.map((food) =>
                            food.MAKER_NAME == ""
                                ?<li key={food.NUM} onClick={()=>onClick_foodLi(food)}>제품명: {food.DESC_KOR}</li>
                                :<li key={food.NUM} onClick={()=>onClick_foodLi(food)}>제품명: {food.DESC_KOR}, 제조자명: {food.MAKER_NAME} </li>    
                        )
                }
            </ul>


{/*             <textarea name="upperBodyStrengthInfo" id="upperBodyStrengthInfo" cols="60" rows="20" value={
                foodInfo[0]
            }></textarea> */}
        </div>
    </div>
    );
}

export default MainPage;