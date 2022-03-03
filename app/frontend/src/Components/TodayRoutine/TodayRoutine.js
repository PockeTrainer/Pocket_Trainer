import React from 'react';
import MainNavBar from '../SameLayout/MainNavBar';
import CardLayout from './CardLayout';
function TodayRoutine(){

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