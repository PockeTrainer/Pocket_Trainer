import React from 'react';
import MainNavBar from '../SameLayout/MainNavBar';
import CardLayout from './CardLayout';

class MainContent extends React.Component{
    render(){
        return(
        <div className="main-content" data-component="MainContent">
            <MainNavBar/>
            <CardLayout/>
        </div>
        );
    }
}
export default MainContent;