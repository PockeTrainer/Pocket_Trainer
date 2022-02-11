import React,{useRef,useState,useEffect} from "react";
import InfoTab from "./InfoTab";
import TodaySummary from './TodaySummary'

import Slider from "react-slick";
import CssBaseline from '@mui/material/CssBaseline';

import List from '@mui/material/List';

import ListSubheader from '@mui/material/ListSubheader';
import ExerciseRoutine from "./ExerciseRoutine";

import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';


function CardLayout(props){
    const [checked, setChecked] = useState(false);


    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const subListHeader={
        bgcolor:"background.paper",
        paddingLeft:"5px",
        paddingRight:"5px",
        marginLeft:"-12px",
        marginRight:"-12px",
        borderRadius:"5px",
        lineHeight:"10px"
    };

    const settings = {
        arrows:false,
        dots:false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    useEffect(()=>{
        handleChange();
    },[])
    return(

    <div>
        <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8" data-component="HeaderForCard">
              <div className="container-fluid">
                <div className="header-body">
                    <div class={"container-fluid" }>
                        <div className="row" data-component="ProfileCardLayout">
                            <CssBaseline />
                            <List sx={{ mb: 2 ,marginTop:"-3.85em",paddingTop:"14px"}}>
                                <ListSubheader sx={subListHeader}>
                                    <InfoTab/>
                                </ListSubheader>
                                
                                <div className="col-xl-8 order-xl-1" style={{paddingLeft:"1px",paddingRight:"1px"}} >
                                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
                                        {...(checked ? { timeout: 1000 } : {})}>
                                        <div>
                                            <TodaySummary style={{ transitionDelay: checked ? '1500ms' : '0ms' }}/>
                                        </div>
                                        
                                    </Grow>
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