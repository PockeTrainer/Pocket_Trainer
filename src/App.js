import './App.css';
import Dashboard from './Components/Dashboard/DashBoard';
import { useScript1 } from "./hook";
import React, { useEffect,useLayoutEffect, useState, useRef } from 'react';
import { Route,BrowserRouter,Routes,Navigate, useParams, useLocation } from 'react-router-dom';
import ExerciseCounter from './Components/ExerciseCounter/ExerciseCounter';
import SideNavBar from './Components/SameLayout/SideNavbar';

import MainContent from './Components/Sign/MainContent';
import WithCamera from './Components/ExerciseCounter/WithCamera/WithCamera';
import StartModal from './Components/StartAlert/StartModal';
import PublicRoute from './Components/PublicRoute';
import PrivateRoute from './Components/PrivateRoute';
import TodayRoutine from "./Components/TodayRoutine/TodayRoutine"
import { useDispatch,useSelector } from 'react-redux';
import { modalref } from './modules/action';
import { first_Login } from './modules/action';
import { second_Login } from './modules/action';

import axios from 'axios';


import CameraTodayRoutine from './Components/CameraTodayRoutine/CameraTodayRoutine';
import ScrollToTop from './Components/ScrollToTop';

function App(){

  const [after_login,setAfter_Login]=useState(false);
  const button1=useRef(null);
  let syncState=useRef("first");

  const dispatch=useDispatch();

  const first_login=useSelector(state=>state.first_login_check.first_login);//스토어에서 처음 로그인 한지에 대한 여부를 가져와줌
  const exercise_start_page=useSelector(state=>state.Exercise_start_reducer.page);//본 메인 운동스텝에 들어갔는지 여부로 상단메뉴를 결정해줌

  let isAuthorized=sessionStorage.getItem("isAuthorized");
  let id=sessionStorage.getItem("user_id");
  //let isAuthorized=true



  
  useEffect(()=>{
    //An array of assets
    let scripts = [
      { src: "./assets/js/plugins/jquery/dist/jquery.min.js" },
      { src: "./assets/js/plugins/bootstrap/dist/js/bootstrap.bundle.min.js" },
      { src: "./assets/js/plugins/chart.js/dist/Chart.min.js" },
      { src: "./assets/js/plugins/chart.js/dist/Chart.extension.js" },
      { src: "./assets/js/argon-dashboard.js" },
      { src: "./assets/js/modal_popup.js" }
  ]
  // 대시보드 min에서 그냥 js로 수정봄
  //Append the script element on each iteration
  scripts.forEach(item => { 
      const script = document.createElement("script")
      script.src = item.src
      script.async = false
      document.body.appendChild(script)
  })  

  if(isAuthorized==null){
    setAfter_Login(false)
  }
  else{
    setAfter_Login(true);
    dispatch(modalref(button1))//모달창 버튼 ref를 스토어에서 올려서 하위 모달창들에서 쓸수 있게 만듦
    //setTimeout(showModal,1000);//지금 사용하는 일시 시간지연으로 하는 코드
  }  
  console.log("나여기!")
  },[]);

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
                syncState="first";


            } else if (err.response.data.error === '오늘의 운동 계획이 이미 생성되었습니다') {
                console.log("skip");
                dispatch(second_Login());
                syncState.current="second";//실제로 dispatch를 비동기적으로 처리하기에 밑에서 바로 체크해버리기에 추가함
            }
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

        if(syncState=="first"){
          setTimeout(showModal,1000);
        }



}, []);
    
  const showModal=()=>{
      button1.current.click();
  }


    return (
      <div className="App">
        
        <BrowserRouter>
        {after_login&&exercise_start_page===false?<SideNavBar/>:null}
        {/* ScrollToTop을 넣으므로써 항상 위로쪽으로 스크롤이 올라가게 만들수있음 */}
        <ScrollToTop/>
          <Routes>
            <Route path="/account/:subtitle" element={<PublicRoute component={MainContent} isAuthorized={isAuthorized}/>} />
            <Route path="/" element={<PrivateRoute isAuthorized={isAuthorized}/>}>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/main/exercise_counter" element={<ExerciseCounter/>} />
              <Route path="/test/*" element={<WithCamera/>}/>
              <Route path="/main/routine" element={<TodayRoutine/>}/>
              <Route path='/routine/*' element={<CameraTodayRoutine/>}/>
            </Route>

          </Routes>
          {first_login&&<button type="button" ref={button1}  className="btn btn-block btn-warning mb-3" data-toggle="modal" data-target="#modal-notification">Notification</button>}
          {first_login&&<StartModal/>}
        </BrowserRouter>
      </div>
      

    );

}
export default App;