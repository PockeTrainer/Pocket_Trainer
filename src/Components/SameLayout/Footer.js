import React from 'react';

class Footer extends React.Component{
    render(){
        return(
            <footer className="footer" data-component="Footer">
                <div className="row align-items-center justify-content-xl-between">
                    <div className="col-xl-6">
                        <div className="copyright text-center text-xl-left text-muted">
                        ©2021<a href="https://www.creative-tim.com" className="font-weight-bold ml-1" target="_blank">우리 잘 수 있을까?</a>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                        <li className="nav-item">
                            <a href="https://www.creative-tim.com" className="nav-link" target="_blank">우리팀에 대하여</a>
                        </li>
                        <li className="nav-item">
                            <a href="https://www.creative-tim.com/presentation" className="nav-link" target="_blank">서비스에 대하여</a>
                        </li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}
export default Footer;