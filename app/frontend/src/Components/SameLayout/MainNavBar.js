import React from 'react';
import UserMenu from '../Dashboard/UserMenu';

class MainNavBar extends React.Component{
    render(){
        return(
            
      <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main" data-component="MainNav">
      <div className="container-fluid">
        {/* Brand */}
        <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="./index.html">Dashboard</a>
        {/* Form */}
        <form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
          <div className="form-group mb-0">
            <div className="input-group input-group-alternative">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-search" /></span>
              </div>
              <input className="form-control" placeholder="Search" type="text" />
            </div>
          </div>
        </form>
        <UserMenu/>
      </div>
    </nav>

        );
    }
}
export default MainNavBar;