import React,{useState,useRef} from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from "@mui/system";



export default function SignPartModal({which_error}){

    const closeRef=useRef();
    const Pstyled=styled('p')((props)=>({
        fontSize:"1.0rem",
        fontWeight:props.bold=="lighter"?"lighter":"600",
        lineWeight:"1.0",
        marginBottom:"0"
    }));

    if(which_error==="wrong_login"){
        return(
            <>
                <div className="modal fade" id="modal-show-Wrong-login" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                    <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                                <button ref={closeRef}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{padding:"1rem"}}>
                                <div className="text-center">
                                    <CancelIcon sx={{color:"#5e72e4",fontSize:"2.5rem"}}/>
                                </div>
                                <span className="badge badge-warning" style={{fontSize:"1em",marginTop:"2rem",marginBottom:"1rem"}}>로그인실패</span>
                                    <Pstyled bold="lighter">존재하지 않는 ID이거나 PassWord입니다</Pstyled>
    
                                            
                                
                            </div>
                            
                            <div className="modal-footer" style={{justifyContent:"center"}}>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"><i className="ni ni-fat-remove" /> 취소</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else if(which_error==="exist_id"){
        return(
            <>
                 <div className="modal fade" id="modal-show-Wrong-signup" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                    <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                                <button ref={closeRef}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{padding:"1rem"}}>
                                <div className="text-center">
                                    <CancelIcon sx={{color:"#5e72e4",fontSize:"2.5rem"}}/>
                                </div>
                                <span className="badge badge-warning" style={{fontSize:"1em",marginTop:"2rem",marginBottom:"1rem"}}>회원가입실패</span>
                                    <Pstyled bold="lighter">이미 존재하는 아이디입니다</Pstyled>
    
                                            
                                
                            </div>
                            
                            <div className="modal-footer" style={{justifyContent:"center"}}>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"><i className="ni ni-fat-remove" /> 취소</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else{
        return(
            <>
                <div className="modal fade" id="modal-show-Wrong-signup" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                    <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                                <button ref={closeRef}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{padding:"1rem"}}>
                                <div className="text-center">
                                    <CancelIcon sx={{color:"#5e72e4",fontSize:"2.5rem"}}/>
                                </div>
                                <span className="badge badge-warning" style={{fontSize:"1em",marginTop:"2rem",marginBottom:"1rem"}}>회원가입실패</span>
                                    <Pstyled bold="lighter">모든정보를 채워주시길 바랍니다</Pstyled>
    
                                            
                                
                            </div>
                            
                            <div className="modal-footer" style={{justifyContent:"center"}}>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"><i className="ni ni-fat-remove" /> 취소</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    
}