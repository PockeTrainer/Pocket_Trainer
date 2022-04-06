import React,{useState,useEffect, useRef} from 'react';
import CardWrapper from '../CameraTodayRoutine/CardWrapper';

import Typography from '@mui/material/Typography';

import Slider from 'react-slick';
import ListBox from '../History/ListBox';

import styled from "styled-components";

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SearchModal from './SearchModal';

import {DatePicker} from "./DatePicker";
import CalandarPicker from './CalandarPicker';
import { useDispatch, useSelector } from 'react-redux';
import { choose_meal_date } from '../../modules/action';


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}



function TodayRecord(){

    const [KcalButton_Clicked,set_KcalButton_Clicked] = useState(false);//칼로리보기 모드로 변환해주는 버튼
    const modalRef=useRef("");//모달창 버튼 팝업용
    const dispatch=useDispatch();
    const [nutrition_ratio,set_nutrition_ratio]=useState({//각 영양소별 현재 퍼센트 비율을 가짐
        carbo:{
            rate:0,
            gram:0,
            kcal:0
        },
        protein:{
            rate:0,
            gram:0,
            kcal:0
        },
        fat:{
            rate:0,
            gram:0,
            kcal:0
        }
    });

    let foods=useSelector(state=>state.update_meals_reducer);//음식정보 가져오기

    const day_recommend_amount={//하루에 먹어야하는 권장그램
        carbo:{
            gram:300,
            kcal:1000
        },
        protein:{
            gram:300,
            kcal:1000
        },
        fat:{
            gram:300,
            kcal:1000
        }

    }

    useEffect(()=>{

        let tmp={
            carbo:{
                rate:0,
                gram:0,
                kcal:0
            },
            protein:{
                rate:0,
                gram:0,
                kcal:0
            },
            fat:{
                rate:0,
                gram:0,
                kcal:0
            }
        };
        let tmp_total_list=[...foods.breakfast,...foods.lunch,...foods.dinner];

        for(const item of tmp_total_list){
            console.log(item);
            if(item.Info_from_api.NUTR_CONT2!==""&& item.Info_from_api.NUTR_CONT1!==""){
                tmp.carbo.gram+=(parseInt(item.Info_from_api.NUTR_CONT2)*(item.gram/parseInt(item.Info_from_api.SERVING_SIZE)));
                tmp.carbo.kcal+=4*tmp.carbo.gram;
            }
            else if(item.Info_from_api.NUTR_CONT3!=="" && item.Info_from_api.NUTR_CONT1!==""){
                tmp.protein.gram+=(parseInt(item.Info_from_api.NUTR_CONT3)*(item.gram/parseInt(item.Info_from_api.SERVING_SIZE)));
                tmp.protein.kcal+=4*tmp.protein.gram;
            }
            else if(item.Info_from_api.NUTR_CONT4!=="" && item.Info_from_api.NUTR_CONT1!==""){
                tmp.fat.gram+=(parseInt(item.Info_from_api.NUTR_CONT4)*(item.gram/parseInt(item.Info_from_api.SERVING_SIZE)));
                tmp.fat.kcal+=9*tmp.fat.gram;
            }
        }
        tmp.carbo.rate=Math.round((tmp.carbo.gram/day_recommend_amount.carbo.gram)*100);
        tmp.protein.rate=Math.round((tmp.protein.gram/day_recommend_amount.protein.gram)*100);
        tmp.fat.rate=Math.round((tmp.fat.gram/day_recommend_amount.fat.gram)*100);

        set_nutrition_ratio(tmp);

    },[foods])
    
    const handleChange_kcal = () => {
        set_KcalButton_Clicked(prev=>!prev)
      };


   
    const Pstyled=styled('p')((props)=>({
        fontSize:"1.0rem",
        fontWeight:props.bold=="lighter"?"lighter":"600",
        lineWeight:"1.0",
        marginBottom:"0"
    }))

    const StyleSwitch={
        marginTop:"3rem",
        right:"0rem",
        position:"absolute"
    };

    const StyleProgress={
        paddingTop:"0rem"
    };

    const PartButtonStyle={
        "&.MuiButton-root":{
            padding:"0px",
            boxShadow:"",
            backgroundColor:"transparent",
            color:"#2dce89"
        },
        "&.MuiButton-root:hover":{
            backgroundColor:"transparent"
        }
    }

    const settings = {
        // autoplay:true,
        autoplaySpeed: 3000,
        arrows:false,
        dots:true,
        infinite: false,
        centerMode:false,
        centerPadding:"0px",
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

   const StyledSlider=styled(Slider)`
    .slick-list {
        margin:-8px !important;
    }
   `

   const selectedDay = (val) =>{
        console.log(val);
        dispatch(choose_meal_date(val));
    };

    const selectDate = useSelector(state=>state.update_choose_meal_date_reducer.date);
    const startDate=()=>{
        let tmp=new Date(selectDate) ;//Date객체를 깊은복사 해줘야함 

        tmp.setDate(selectDate.getDate()-3);
        return tmp;
    }


    console.log(nutrition_ratio)
    return(
        <>
            <CardWrapper time={1000}>
                    <CalandarPicker/>
                    <DatePicker startDate={startDate()} 
                            days={365}
                            selectDate={selectDate}
                            getSelectedDay={selectedDay} 
                            labelFormat={"yyyy년 MMMM "} 
                            color={"#5e72e4"}
                            marked={[
                            {
                                date: new Date(2021, 9, 3),
                                marked: true,
                                style: {
                                    color: "#ff0000",
                                    padding: "2px",
                                    fontSize: 12,
                                },
                                text: "",
                            },
                            {
                                date: new Date(2021, 9, 4),
                                marked: true,
                                text: ""
                            },
                        ]}
                            />
                        

                    <form className="mb-3 d-md-none" onClick={()=>modalRef.current.click()}>
                        <div className="input-group input-group-rounded input-group-merge">
                            <input type="search" className="form-control form-control-rounded form-control-prepended" placeholder="ex)음식검색" aria-label="Search" />
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <span className="fa fa-search" />
                                </div>
                            </div>
                        </div>
                    </form>


                    <StyledSlider {...settings}>
                        <ListBox meal="아침"/>
                        <ListBox meal="점심"/>
                        <ListBox meal="저녁"/>
                    </StyledSlider>

                    <FormControlLabel
                        control={<Switch color="default" checked={KcalButton_Clicked} onChange={handleChange_kcal} />}
                        label="칼로리"
                        sx={StyleSwitch}
                    />

                    <div className="progress-wrapper" style={{...StyleProgress,marginTop:"5rem"}}>
                        <div className="progress-info">
                            <div className="progress-label">
                                <span style={{fontSize:"0.925rem"}}>탄수화물(g)</span>
                            </div>
                            <div className="progress-percentage">
                                <span>{nutrition_ratio.carbo.rate}%</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow={nutrition_ratio.carbo.rate} aria-valuemin={0} aria-valuemax={100} style={{width: nutrition_ratio.carbo.rate+'%'}} />
                        </div>
                        {
                            KcalButton_Clicked
                            ?
                                <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom>섭취:{nutrition_ratio.carbo.kcal}Kcal/{day_recommend_amount.carbo.kcal}Kcal</Typography>
                            :
                                <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom>섭취:{nutrition_ratio.carbo.gram}g/{day_recommend_amount.carbo.gram}g</Typography>
                        }

                        
                    </div>

                    <div className="progress-wrapper" style={StyleProgress}>
                        <div className="progress-info">
                            <div className="progress-label">
                                <span style={{fontSize:"0.925rem"}}>단백질(g)</span>
                            </div>
                            <div className="progress-percentage">
                                <span>{nutrition_ratio.protein.rate}%</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow={nutrition_ratio.protein.rate} aria-valuemin={0} aria-valuemax={100} style={{width: nutrition_ratio.protein.rate+'%'}} />
                        </div>

                        {
                            KcalButton_Clicked
                            ?
                                <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom>섭취:{nutrition_ratio.protein.kcal}Kcal/{day_recommend_amount.protein.kcal}Kcal</Typography>
                            :
                                <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom>섭취:{nutrition_ratio.protein.gram}g/{day_recommend_amount.protein.gram}g</Typography>
                        }

                    </div>

                    <div className="progress-wrapper" style={StyleProgress}>
                        <div className="progress-info">
                            <div className="progress-label">
                                <span style={{fontSize:"0.925rem"}}>지방(g)</span>
                            </div>
                            <div className="progress-percentage">
                                <span>{nutrition_ratio.fat.rate}%</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow={nutrition_ratio.fat.rate} aria-valuemin={0} aria-valuemax={100} style={{width: nutrition_ratio.fat.rate+'%'}} />
                        </div>

                        {
                            KcalButton_Clicked
                            ?
                                <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom>섭취:{nutrition_ratio.fat.kcal}Kcal/{day_recommend_amount.fat.kcal}Kcal</Typography>
                            :
                                <Typography variant="body1" sx={{fontWeight:"lighter",textAlign:'center'}} gutterBottom>섭취:{nutrition_ratio.fat.gram}g/{day_recommend_amount.fat.gram}g</Typography>
                        }

                    </div>

                        
                    
            </CardWrapper>
            <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-search-meals">Default</button>
            <SearchModal/>

           

        </>
    );
}
export default TodayRecord