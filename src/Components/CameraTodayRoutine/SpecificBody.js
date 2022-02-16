import React,{useState,useEffect} from "react";

import Grow from '@mui/material/Grow';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import PartStepper from "./Stepper";


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

function SpecificBody(){

    const badgeStyle={
        fontWeight:"600",
        lineHeight:"2",
        color:"white",
        margin:"auto",
        backgroundColor:"#5e72e4"
    };

    const ItemListTitle={
        textAlign:"left",
        ".MuiImageListItemBar-title":{fontSize:"1.5rem",lineHeight:"25px"},
        ".MuiImageListItemBar-subtitle":{lineHeight:"2"}

    }
    const [checked, setChecked] = useState(false);


    const handleChange = () => {
        setChecked((prev) => !prev);
    };
  
    useEffect(()=>{
        sleep(3000).then(()=>handleChange());//3초동안 그전에 transition으로 나타난 글자 사라지게 하고 나타나게함
    },[])
  
    //Transition용
    return(
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
        {...(checked ? { timeout: 1000 } : {})}>
            <div style={{marginRight:"6px"}}>
                <div className="col-xl-4 order-xl-2 mb-3 mb-xl-0" data-component="ProfileCard" style={{paddingLeft:"1px",paddingRight:"1px"}}>
                    <div className={"card-profile"+" "+"shadow"+" "+"card"}>
                        

                        <div className="card-body pt-2 pt-md-4" style={{padding:"0.5rem"}} >
                        <div className="row">
                            <div className="col">
                                    {/* <i className="far fa-clipboard" style={{fontSize:"4em",color:"#5e72e4"}}></i> */}
                                    <Stack direction="row" spacing={2}>
                                    <span className="badge badge-default btn-lg" style={badgeStyle}>마지막중량:60kg</span> 
                                    <span className="badge badge-default btn-lg" style={badgeStyle}>휴식시간:1분40초</span> 
                                    </Stack>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                </div>

                <ImageListItem>
                                    <img
                                        src="../assets/img/theme/benchPress.gif"
                                        alt="벤치프레스"
                                        loading="lazy"
                                    />
                                    {/* <Avatar alt="Remy Sharp" src="../assets/img/theme/arm.png" /> */}
                                <ImageListItemBar
                                    title="벤치프레스"
                                    subtitle="가슴운동"
                                    actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label="하이"
                                    >
                                    <InfoIcon />
                                    </IconButton>
                                    }
                                    sx={ItemListTitle}
                                />
                </ImageListItem>

            </div>
        </Grow>
    );

}
export default SpecificBody