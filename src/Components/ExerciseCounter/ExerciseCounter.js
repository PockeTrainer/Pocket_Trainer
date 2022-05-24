import React from 'react';
import SideNavBar from '../SameLayout/SideNavbar';
import CardLayout from './CardLayout';
import InfoMask from './InfoMask';
import MainContent from './MainContent';

class ExerciseCounter extends React.Component{
    render(){
        return(
            <div>
                {/* <SideNavBar/> */}
                <MainContent/>
            </div>
        );
    }
}
export default ExerciseCounter;