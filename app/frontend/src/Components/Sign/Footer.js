import React, { useEffect, useState } from 'react';

function Footer(){
    return(
        <footer className="py-5">
        <div className="container">
          <div className="row align-items-center justify-content-xl-between">
            <div className="col-xl-6">
              <div className="copyright text-center text-xl-left text-muted">
                © 2021 <a href="#" className="font-weight-bold ml-1" target="_blank">우리잘수있을까?</a>
              </div>
            </div>
            <div className="col-xl-6">
              <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                <li className="nav-item">
                  <a href="#" className="nav-link" target="_blank">우리팀에 대하여</a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link" target="_blank">서비스 대하여</a>
                </li>
              </ul> 
            </div>
          </div>
        </div>
      </footer>
    );
}
export default Footer