import React from 'react';
import GraphAndShowDataPart from './GraphAndShowDataPart';
import HeaderForCard from './HeaderForCard';
import MainNavBar from '../SameLayout/MainNavBar';

class MainContent extends React.Component{
    render(){
        return(
        <div className="main-content" data-component="MainContent">
            <MainNavBar/>
            <HeaderForCard />
            <GraphAndShowDataPart />
        </div>
        );
    }
}
export default MainContent;