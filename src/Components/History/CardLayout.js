import React,{useRef,useState,useEffect} from "react";

import CssBaseline from '@mui/material/CssBaseline';

import List from '@mui/material/List';

import ListSubheader from '@mui/material/ListSubheader';

import Grow from '@mui/material/Grow';
import Calandar from './Calandar'


function CardLayout(props){


    const padding_style={
        paddingRight:"7px",
        paddingLeft:"7px"
    }



    return(

    <div>
        <div className="header bg-gradient-primary pt-5 pt-md-8" data-component="HeaderForCard" style={{minHeight:"100vh"}}>
              <div className="container-fluid" style={padding_style}>
                <div className="header-body">
                    <div className="container-fluid" style={padding_style} >
                        <div className="row" data-component="ProfileCardLayout">
                            <CssBaseline />
                            <List sx={{ mb: 2 ,marginTop:"-3.95em",paddingTop:"14px"}}>
                                
                                
                                <div className="col-xl-8 order-xl-1" style={{paddingLeft:"1px",paddingRight:"1px"}} >
                                   <Calandar/>
                                </div>
                            </List>
                        </div>
                        
                </div> 
                </div>
              </div>
        </div>

        
        
    </div>
    );
}
export default CardLayout;