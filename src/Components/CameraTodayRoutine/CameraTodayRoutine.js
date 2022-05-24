import React from 'react';
import MainNavBar from '../SameLayout/MainNavBar';
import CardLayout from './CardLayout';

function CameraTodayRoutine(){
        return(
        <div className="main-content" data-component="MainContent">
            <MainNavBar/>
            <CardLayout/>
        </div>
        );
}
export default CameraTodayRoutine;