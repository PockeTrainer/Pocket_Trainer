import React from 'react';

class UserMenu extends React.Component{
    render(){
        return(
            
      <ul className="navbar-nav align-items-center d-none d-md-flex" data-component="UserMenu">
      <li className="nav-item dropdown">
        <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <div className="media align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" src="./assets/img/theme/team-4-800x800.jpg" />
            </span>
            <div className="media-body ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm  font-weight-bold">Jessica Jones</span>
            </div>
          </div>
        </a>
        <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
          <div className=" dropdown-header noti-title">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </div>
          <a href="./examples/profile.html" className="dropdown-item">
            <i className="ni ni-single-02" />
            <span>My profile</span>
          </a>
          <a href="./examples/profile.html" className="dropdown-item">
            <i className="ni ni-settings-gear-65" />
            <span>Settings</span>
          </a>
          <a href="./examples/profile.html" className="dropdown-item">
            <i className="ni ni-calendar-grid-58" />
            <span>Activity</span>
          </a>
          <a href="./examples/profile.html" className="dropdown-item">
            <i className="ni ni-support-16" />
            <span>Support</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#!" className="dropdown-item">
            <i className="ni ni-user-run" />
            <span>Logout</span>
          </a>
        </div>
      </li>
    </ul>
        );
    }
}
export default UserMenu;