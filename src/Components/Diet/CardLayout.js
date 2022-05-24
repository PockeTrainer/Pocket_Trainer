import React,{useRef,useState,useEffect} from "react";


import CssBaseline from '@mui/material/CssBaseline';

import List from '@mui/material/List';

import ListSubheader from '@mui/material/ListSubheader';

import Grow from '@mui/material/Grow';
import HeaderTab from "./HeaderTab";
import TodayRecommend from "./TodayRecommend";
import TodayRecord from "./TodayRecord";



function CardLayout(props){
   
    const [clicked_tab, set_Clicked_tab] = useState("recommend");//어떤 메뉴버튼을 눌렀는지

    const handleChange = (value) => {
        set_Clicked_tab(value)
    };

    const subListHeader={
        bgcolor:"background.paper",
        paddingLeft:"5px",
        paddingRight:"5px",
        marginLeft:"-12px",
        marginRight:"-12px",
        borderRadius:"5px",
        lineHeight:"7px",
        zIndex:"10"
    };


    return(

    <div>
        <div className="header bg-gradient-primary pt-5 pt-md-8" data-component="HeaderForCard" style={{minHeight:"100vh"}}>
              <div className="container-fluid">
                <div className="header-body">
                    <div className="container-fluid" >
                        <div className="row" data-component="ProfileCardLayout">
                            <CssBaseline />
                            <List sx={{ mb: 2 ,marginTop:"-3.85em",paddingTop:"14px"}}>
                                <ListSubheader sx={subListHeader}>
                                    <HeaderTab change_click_func={handleChange}/>
                                </ListSubheader>
                                
                                <div className="col-xl-8 order-xl-1" style={{paddingLeft:"1px",paddingRight:"1px"}} >
                                    {
                                        clicked_tab==="recommend"
                                        ?
                                        <TodayRecommend/>
                                        :
                                        <TodayRecord/>

                                    }
                                    
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