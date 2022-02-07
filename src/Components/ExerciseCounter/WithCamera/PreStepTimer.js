import React, { useEffect, useRef } from "react";

function PreStepTimer(){

    const button1=useRef();
    const closeRef=useRef();

    const showModal=()=>{
          button1.current.click();
      }

    useEffect(()=>{
        setTimeout(showModal,1000);//모달창 켜주기
    },[])
    return(
        <div>

            <button type="button" ref={button1} style={{display:"none"}} className="btn btn-block btn-warning mb-3" data-toggle="modal" data-target="#modal-notification">Notification</button>
                <div className="modal fade" id="modal-notification" tabIndex={-1} role="dialog" aria-labelledby="modal-notification" aria-hidden="true">
                <div className="modal-dialog modal-danger modal-dialog-centered modal-" role="document">
                    <div className="modal-content bg-gradient-primary">
                        <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-notification">포켓트레이너-알리미</h6>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={closeRef}>
                            <span aria-hidden="true">×</span>
                        </button>
                        </div>

                        <div className="modal-body">
                            <div className="py-3 text-center">
                                <i className="ni ni-bell-55 ni-3x" />
                                <h4 className="heading mt-4">5초</h4>
                            </div>
                        
                        </div>
                        <div className="modal-footer">
                            <button  type="button" className="btn btn-primary btn-lg btn-block" style={{marginTop:"3em"}} ><i className="ni ni-button-play"></i></button>
                        </div>
                        

                    </div>
                </div>
                </div>
        </div>
    );

}
export default PreStepTimer