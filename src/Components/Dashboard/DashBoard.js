import React from 'react';
import MainContent from './MainContent';
import SideNavBar from '../SameLayout/SideNavbar';

class Dashboard extends React.Component{
    render(){
        return(
            <div>
                {/* <SideNavBar/> */}
                <MainContent/>
            </div>
        );
    }
}
export default Dashboard;