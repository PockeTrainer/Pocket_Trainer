import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainNavBar from '../SameLayout/MainNavBar';
import CardLayout from './CardLayout';
import { Appref } from '../../modules/action';
import { first_login_check } from '../../modules/action';
function TodayRoutine(){
    const appref=useSelector(state=>state.Appref.ref);
    const first_login=useSelector(state=>state.first_login_check.first_login);//첫 로그인의 여부에 따라 모달창을 보여줄지 말지 결정

    useEffect(()=>{
        if(first_login){
            appref.current.click();
        }
    },[])

    return(
        <div>
             <div className="main-content" data-component="MainContent">
                <MainNavBar/>
                <CardLayout/>
            </div>
        </div>
    );
}
export default TodayRoutine