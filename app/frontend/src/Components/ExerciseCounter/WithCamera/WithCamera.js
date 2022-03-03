import React from 'react';
import Footer from '../../SameLayout/Footer';
import MainContent from './MainCotent';
function WithCamera(){
    const style_container={
        paddingLeft:'10px',
        paddingRight:'10px'
    }
    return(
       
            <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8" data-component="HeaderForCard">
                <div className="container-fluid" style={style_container}>
                    <div className="header-body">
                        <MainContent/>
                    </div>
                </div>
            </div>
           
    );
}
export default WithCamera