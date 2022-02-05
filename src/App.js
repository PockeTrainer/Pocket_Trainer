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
import FullScreenDialog from './Components/StartAlert/FullScreenDialog';
import PublicRoute from './Components/PublicRoute';
import PrivateRoute from './Components/PrivateRoute';
import TodayRoutine from "./Components/TodayRoutine/TodayRoutine"
import { useDispatch,useSelector } from 'react-redux';
import { modalref } from './modules/action';

function App(){

  const [after_login,setAfter_Login]=useState(false);
  const button1=useRef(null);

  const first_login=useSelector(state=>state.first_login_check.first_login);//스토어에서 처음 로그인 한지에 대한 여부를 가져와줌
  const dispatch=useDispatch();

  //let isAuthorized=sessionStorage.getItem("isAuthorized");
  let isAuthorized=true

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
    setTimeout(showModal,1000);//지금 사용하는 일시 시간지연으로 하는 코드
    //showModal();
  }  
  console.log("나여기!")
  },[]);

    
  const showModal=()=>{
    if(first_login){
      console.log(button1.current.type)
      button1.current.click();
    }
  }


    return (
      <div className="App">
        
        <BrowserRouter>
        {after_login?<SideNavBar/>:null}
          <Routes>
            <Route path="/account/:subtitle" element={<PublicRoute component={MainContent} isAuthorized={isAuthorized}/>} />
            <Route path="/" element={<PrivateRoute isAuthorized={isAuthorized}/>}>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/main/exercise_counter" element={<ExerciseCounter/>} />
              <Route path="/test/*" element={<WithCamera/>}/>
              <Route path="/main/routine" element={<TodayRoutine/>}/>
            </Route>

          </Routes>
          {first_login&&<button type="button" ref={button1}  className="btn btn-block btn-warning mb-3" data-toggle="modal" data-target="#modal-notification">Notification</button>}
          {first_login&&<StartModal/>}
        </BrowserRouter>
      </div>
      

    );

}
export default App;