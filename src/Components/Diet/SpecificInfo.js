import React, { useEffect,useRef,useState } from "react";

import Stack from '@mui/material/Stack';
import { styled } from "@mui/system";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';




function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}



function SpecificInfo(){

    const closeRef=useRef("");


    const Pstyled=styled('p')((props)=>({
        fontSize:"1.0rem",
        fontWeight:props.bold=="lighter"?"lighter":"600",
        lineWeight:"1.0",
        marginBottom:"0",
        color:props.color==="white"?"white":"black"
    }))
        
    const modalBackground={
        minHeight: '600px',
        backgroundImage: 'url(../assets/img/theme/foods/almond.jfif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top'
    }

    const hrStyle={
        marginTop:"1rem",
        borderTop:"5px solid white"
    }
    
        return(
            <div className="modal fade" id="modal-specific-info" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                    <div className="modal-content" style={modalBackground}>
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                            <button ref={closeRef} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{padding:"1rem"}}>
                            <div data-component="ProfileHeader" className="header pb-6 pt-5 pt-lg-8 d-flex align-items-center" >
                            {/* Mask */}
                            <span className="mask bg-gradient-default opacity-8"  />
                            {/* Header container */}
                                <div className="container-fluid d-flex align-items-center" style={{justifyContent:"center"}}>
                                    <div className="row">
                                        <div className="col-lg-7 col-md-10">
                                        <h1 className="display-2 text-white">들깻잎</h1>
                                        <Pstyled bold="etc" color="white">영양정보</Pstyled>
                                        <hr style={hrStyle}></hr>
                                        <Pstyled bold="lighter" color="white">제품명:들깻잎</Pstyled>
                                        <Pstyled bold="lighter" color="white">열량:47kcal(1회제공량)</Pstyled>
                                        <Pstyled bold="lighter" color="white">탄수화물:5g(1회제공량)</Pstyled>
                                        <Pstyled bold="lighter" color="white">단백질:5g(1회제공량)</Pstyled>
                                        <Pstyled bold="lighter" color="white">지방:5g(1회제공량)</Pstyled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                           
                        </div>




                        
                        
                        
                        <div className="modal-footer" style={{justifyContent:"space-between"}}>
                            <button type="button" className="btn btn-primary"><i className="ni ni-check-bold"></i>완료</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" ><i className="ni ni-fat-remove"></i>취소</button>
                        </div>
                    </div>
                </div>
          </div>
        );
    
}
export default SpecificInfo