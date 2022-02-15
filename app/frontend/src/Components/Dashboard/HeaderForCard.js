import React from 'react';
import Cards from './Cards';
import '../../CustomCss/Dashboard/HeaderForCard.css';
class HeaderForCard extends React.Component{
    render(){
        return(
            <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8" data-component="HeaderForCard">
              <div className="container-fluid">
                <div className="header-body">
                    <Cards/>
                </div>
              </div>
            </div>
        );
    }
}
export default HeaderForCard;