import React from 'react';

function NavBar(props){
    return(
        <div>
        {/* Navbar */}
        <nav className="navbar navbar-top navbar-horizontal navbar-expand-md navbar-dark">
          <div className="container px-4_">
            <a className="navbar-brand_" href="../index.html">
              <img src="../assets/img/brand/포켓트레이너.png" />
            </a>
          </div>
        </nav>
        {/* Header */}
        <div className="header bg-gradient-primary py-7 py-lg-8">
          <div className="container title_message_">
            <div className="header-body text-center_ mb-7_">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6">
                  <h1 className="text-white">{props.text.main}</h1>
                  <p className="text-lead text-light">{props.text.sub}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default NavBar