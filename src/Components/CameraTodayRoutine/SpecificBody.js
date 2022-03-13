import React,{useState,useEffect,useRef} from "react";

import Grow from '@mui/material/Grow';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';

import { useSelector } from "react-redux";


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}

function SpecificBody({exercise,info}){

    let weight_first=true;
    let title;
    let key_for_unit=useRef("");
    let key_for_result=useRef("");
    let result=useRef("");


    if(info!==undefined){
        weight_first=info.is_first;
    }

    if(exercise.eng_name==="plank"){
        title="마지막타임셋:"
    }
    else if(exercise.eng_name==="seated_knees_up"||exercise.eng_name==="crunch"){
        title="마지막셋횟수:"
    }
    else{
        title="마지막중량:"
    }

    const badgeStyle={
        fontWeight:"600",
        lineHeight:"2",
        color:"white",
        backgroundColor:"#5e72e4"
    };


    const ItemListTitle={
        textAlign:"left",
        ".MuiImageListItemBar-title":{fontSize:"1.5rem",lineHeight:"25px",fontWeight:"600"},
        ".MuiImageListItemBar-subtitle":{lineHeight:"2"}

    }
    const [checked, setChecked] = useState(false);


    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const unit={//운동에 따른 단위
        count_demand:"개",
        weight_demand:"KG",
        etc:""
    }
  
    useEffect(()=>{
        sleep(3000).then(()=>handleChange());//3초동안 그전에 transition으로 나타난 글자 사라지게 하고 나타나게함

        let time_format_result;

        if(exercise.eng_name==="plank"){
            let format=exercise.Info_from_api.target_time.split(":");

            if(format[1]==="00"){
                time_format_result=format[2]+"초";
            }
            else{
                time_format_result=format[1]+"분"+format[2]+"초";
            }
            key_for_unit.current="etc";
        }
        else if(exercise.eng_name==="seated_knees_up"||exercise.eng_name==="crunch"){
            key_for_unit.current="count_demand";
        }
        else{
            key_for_unit.current="weight_demand";
        }

        result.current={
            plank:time_format_result,
            crunch:exercise.Info_from_api.target_count,
            seated_knees_up:exercise.Info_from_api.target_count,
            etc:exercise.Info_from_api.target_kg
        }

        if(exercise.eng_name!=="plank"&&exercise.eng_name!=="crunch"&&exercise.eng_name!=="seated_knees_up"){
            key_for_result.current="etc";
        }
        else{
            key_for_result.current=exercise.eng_name;
        }
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
                                    <Stack direction="row" spacing={2} sx={{justifyContent:"center"}}>
                                        {
                                        weight_first===true
                                        ?
                                        <span className="badge badge-default btn-lg" style={badgeStyle}>회원님께서는 해당운동기록이 없습니다</span>
                                        :
                                        <>
                                        <span className="badge badge-default btn-lg" style={badgeStyle}>{title}{result.current[key_for_result.current]}{unit[key_for_unit.current]}</span> 
                                        <span className="badge badge-default btn-lg" style={badgeStyle}>최근업데이트:{info.last_update_date}</span>
                                        </> 
                                    }
                                    </Stack>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                </div>

                <ImageListItem sx={{height:"50vh !important"}}>
                                    <img
                                        src={exercise.image_url}
                                        alt={exercise.name}
                                        loading="lazy"
                                    />
                                    {/* <Avatar alt="Remy Sharp" src="../assets/img/theme/arm.png" /> */}
                                <ImageListItemBar
                                    title={exercise.name}
                                    subtitle={exercise.part}
                                    actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label="정보"
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