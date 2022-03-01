import React ,{ useState } from "react";
import styles from'../../CustomCss/ExerciseCounter/InfoCard.module.css';
import { Link } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useDispatch } from "react-redux";





function InfoTab(){

    const [value, setValue] = useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  
    const dispatch=useDispatch();

    return(
        <div className="col-xl-4 order-xl-2 mb-3 mb-xl-0" data-component="ProfileCard">
            <div className={"card-profile"+" "+"shadow"+" "+"card"}>
              
              
              <div className="card-body pt-0 pt-md-4" style={{padding:"0rem"}}>
                <div className="row">
                  <div className="col" style={{paddingLeft:"5px",paddingRight:"5px"}}>
                    <BottomNavigation sx={{ width: 500,display:"table-cell",height:"40px" }} value={value} onChange={handleChange}>
                        <BottomNavigationAction
                            sx={{".MuiBottomNavigationAction-label":{fontFamily:"Noto Sans KR"},"&.MuiBottomNavigationAction-root":{paddingTop:"7px"},"&.MuiBottomNavigationAction-root.Mui-selected":{paddingTop:"6px"}}}
                            label="오늘의루틴"
                            value="recents"
                            icon={<RestoreIcon sx={{"&.MuiSvgIcon-root":{width:"3em"}}} />}
                        />
                        <BottomNavigationAction
                            sx={{".MuiBottomNavigationAction-label":{fontFamily:"Nanum Gothic"},"&.MuiBottomNavigationAction-root":{paddingTop:"7px"},"&.MuiBottomNavigationAction-root.Mui-selected":{paddingTop:"6px"}}}
                            label="운동정보"
                            value="favorites"
                            icon={<AssignmentLateIcon sx={{}} />}
                        />

                        <BottomNavigationAction
                                sx={{".MuiBottomNavigationAction-label":{fontFamily:"Nanum Gothic"},"&.MuiBottomNavigationAction-root":{paddingTop:"7px"},"&.MuiBottomNavigationAction-root.Mui-selected":{paddingTop:"6px"}}}
                                label="추가운동"
                                value="nearby"
                                icon={<FitnessCenterIcon />}
                            />
                        
                    </BottomNavigation>
                        
                        
                  </div>
                </div>
                
              </div>

              
            </div>
          </div>
    );
}
export default InfoTab