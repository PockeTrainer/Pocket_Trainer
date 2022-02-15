import React, { useEffect, useRef, useState } from 'react';
import '../../CustomCss/SideNavbar.css';
import {Link} from 'react-router-dom';

function SideNavBar(){     
  const [clickedId,setClickedId]=useState(
    ()=>JSON.parse(window.localStorage.getItem("clickedId"))||""
  ); //사이드메뉴가 눌렸는지 안 눌렸는지여부를 웹 스토리지를 사용하여 새로고침을 해도 눌린 값은 유지하도록 함

  useEffect(()=>{
    window.localStorage.setItem("clickedId",JSON.stringify(clickedId))
    closebutton.current.click()//메뉴 닫아줘
  },[clickedId]);

  const showGetId=(id)=>{
    setClickedId(id);
    
    
    if(id=="list1"){
      window.location.replace("/");
      return;
    }
  
    //window.location.reload();//다른 링크로 이동시 외부 스크립트으 재호출을 위해 다시 새로고침 시켜줌
  };
  const closebutton=useRef();

        return(
            <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main" data-component="SideNavbar">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <Link className='navbar-brand pt-0' to="/" onClick={()=>showGetId("list1")}>
            <img src="./assets/img/brand/포켓트레이너.png" className="navbar-brand-img" alt="..." />
          </Link>
          <ul className="nav align-items-center d-md-none">
            <li className="nav-item dropdown">
              <a className="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="ni ni-bell-55" />
              </a>
              <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right" aria-labelledby="navbar-default_dropdown_1">
                <h3 className="dropdown-item">📢오늘의운동추천-어깨Day</h3>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">✔사이드레터럴라이즈<i className="fas fa-dumbbell fa-10x"></i></a>
                <a className="dropdown-item" href="#">✔머신프레스<i className="fas fa-dumbbell fa-10x"></i></a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">🥚식단추천 받으러가<i className="fas fa-utensils"></i></a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="media align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" src="./assets/img/theme/dumbel.png" />
                  </span>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                <div className=" dropdown-header noti-title">
                  <h3 className="text-overflow m-0">티맥스님!안녕하세요😎</h3>
                </div>
                <div className="dropdown-divider" />
                <a href="./examples/profile.html" className="dropdown-item">
                  <i className="ni ni-single-02" />
                  <span>나의 회원정보</span>
                </a>
                {/* <a href="./examples/profile.html" className="dropdown-item">
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </a> */}
                <a href="./examples/profile.html" className="dropdown-item">
                  <i className="ni ni-calendar-grid-58" />
                  <span>나의 운동일지</span>
                </a>
                <a href="./examples/profile.html" className="dropdown-item">
                  <i className="fas fa-utensils"></i>
                  <span>나의 식단일지</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#!" className="dropdown-item">
                  <i className="ni ni-user-run" />
                  <span>로그아웃</span>
                </a>
              </div>
            </li>
          </ul>
          <div className="collapse navbar-collapse" id="sidenav-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <div className="row">
                <div className="col-6 collapse-brand">
                  <a href="./index.html">
                    <img src="./assets/img/brand/포켓트레이너.png" />
                  </a>
                </div>
                <div className="col-6 collapse-close">
                  <button ref={closebutton} type="button" className="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                    <span />
                    <span />
                  </button>
                </div>
              </div>
            </div>
            <h6 className="navbar-heading text-muted">서비스</h6>
            <form className="mt-4 mb-3 d-md-none">
              <div className="input-group input-group-rounded input-group-merge">
                <input type="search" className="form-control form-control-rounded form-control-prepended" placeholder="ex)어깨운동" aria-label="Search" />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <span className="fa fa-search" />
                  </div>
                </div>
              </div>
            </form>

            <ul className="navbar-nav">
              
              <li className={clickedId=="list1"? "nav-item active" :"nav-item"} onClick={()=>showGetId("list1")}>
                <Link className={clickedId=="list1"? "nav-link active" :"nav-link"} to="/">
                  <i className="fas fa-tv"></i>나의 POCKET트레이너
                </Link>
              </li>
              <li className={clickedId=="list2"? "nav-item active" :"nav-item"} onClick={()=>showGetId("list2")}>
                <Link className={clickedId=="list2"? "nav-link active" :"nav-link"} to="/main/exercise_counter">
                  <i className="fas fa-qrcode"></i>체력측정하기
                </Link>
              </li>

              <li className={clickedId=="list3"? "nav-item active" :"nav-item"} onClick={()=>showGetId("list3")}>
                <Link className={clickedId=="list3"? "nav-link active" :"nav-link"} to="/main/routine">
                  <i className="fas fa-running"></i>오늘의루틴
                </Link>
              </li>
              <li className={clickedId=="list4"? "nav-item active" :"nav-item"} onClick={()=>showGetId("list4")}>
                <Link className={clickedId=="list4"? "nav-link active" :"nav-link"} to="/main/exercise_counter">
                  <i className="fas fa-dumbbell"></i>부위별운동
                </Link>
              </li>


              <li className={clickedId=="list5"? "nav-item active" :"nav-item"} onClick={()=>showGetId("list5")}>
                <Link className={clickedId=="list5"? "nav-link active" :"nav-link"} to="/main/exercise_counter">
                  <i className="fas fa-utensils"></i>식단플랜
                </Link>
              </li>
              <li className={clickedId=="list6"? "nav-item active" :"nav-item"} onClick={()=>showGetId("list6")}>
                <Link className={clickedId=="list6"? "nav-link active" :"nav-link"} to="/main/exercise_counter">
                  <i className="fas fa-calendar-plus"></i>식단기록
                </Link>
              </li>
            </ul>
            <hr className="my-3" />
            <h6 className="navbar-heading text-muted">나의 Gym</h6>

            <ul className="navbar-nav mb-md-3">
              <li className={clickedId=="sub_list1"? "nav-item active" :"nav-item"} onClick={()=>showGetId("sub_list1")}>
                  <Link className={clickedId=="sub_list1"? "nav-link active" :"nav-link"} to="/main/exercise_counter">
                      <i className="far fa-address-card userInfo"></i>회원정보
                  </Link>
              </li>
              <li className={clickedId=="sub_list2"? "nav-item active" :"nav-item"} onClick={()=>showGetId("sub_list2")}>
                  <Link className={clickedId=="sub_list2"? "nav-link active" :"nav-link"} to="/main/exercise_counter">
                      <i className="fas fa-book-medical history"></i>나의운동일지
                  </Link>
              </li>
              <li className={clickedId=="sub_list3"? "nav-item active" :"nav-item"} onClick={()=>showGetId("sub_list3")}>
                  <Link className={clickedId=="sub_list3"? "nav-link active" :"nav-link"} to="/main/exercise_counter">
                      <i className="fas fa-burn goal"></i>목표설정
                  </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        );
    
}
export default SideNavBar;