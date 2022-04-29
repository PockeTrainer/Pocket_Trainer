import React,{useEffect, useRef} from 'react';
import MainContent from './MainContent';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { first_Login,second_Login } from '../../modules/action';

function Dashboard(){
    const dispatch=useDispatch();
    let syncState=useRef("first");
    let id=sessionStorage.getItem("user_id");


    useEffect(async() =>  {
        // 해당일 처음 로그인 한 사용자 루틴 생성
        await axios.post(`http://127.0.0.1:8000/api/workout/createRoutine/${id}`)
            .then((res) => {//루틴이 성공적생성가능하다는 것 결국->이미 한 번 평가를 봤다는 뜻 
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data)
                if (err.response.data.error === '오늘의 운동 루틴 생성 실패, 체력평가 결과 필요') {
                    console.log("체력 평가 유도");
                    dispatch(first_Login());
                    syncState.current="first";
    
    
                } else if (err.response.data.error === '오늘의 운동 계획이 이미 생성되었습니다') {
                    console.log("skip");
                    dispatch(second_Login());
                    syncState.current="second";//실제로 dispatch를 비동기적으로 처리하기에 밑에서 바로 체크해버리기에 추가함
                }
            })

        await axios.post(`http://127.0.0.1:8000/api/diet/createTargetKcal/${id}`)//해당일 목표칼로리 설정해줌
        .then((res) => {//루틴이 성공적생성가능하다는 것 결국->이미 한 번 평가를 봤다는 뜻 
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err.response.data)
        })    
        
        // 메인 페이지 정보 호출
        await axios.get(`http://127.0.0.1:8000/api/history/mainpageInfo/${id}`)
            .then((res) => {
                console.log(res.data);
                //유저정보(체중, 키), 체력평가 여부 확인
                
    
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    
            // if(syncState.current=="first"){
            //   setTimeout(showModal,1000);
            // }
    
    
    
    }, []);

        return(
            <div>
                <MainContent/>
            </div>
        );
}

export default Dashboard;