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
import axios from "axios";


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}



function TodayRecord(){

    const id=sessionStorage.getItem("user_id");

    const [KcalButton_Clicked,set_KcalButton_Clicked] = useState(false);//칼로리보기 모드로 변환해주는 버튼
    const modalRef=useRef("");//모달창 버튼 팝업용
    const count=useRef(1);//첫랜더링은 피하기
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
    let previous_foods=useRef([]);//업데이트 되기전의 음식정보를 담음
    const selectDate = useSelector(state=>state.update_choose_meal_date_reducer.date);//누른 날짜

    const selectedDay = (val) =>{
        console.log(val);
        dispatch(choose_meal_date(val));
    };

    
    const startDate=()=>{
        let tmp=new Date(selectDate) ;//Date객체를 깊은복사 해줘야함 

        tmp.setDate(selectDate.getDate()-3);
        return tmp;
    }

    const day_recommend_amount={//하루에 먹어야하는 권장그램-api로 불러온 값으로 바꿔줘야함
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

    const get_data_from_sercer=async()=>{//선택한날의 음식들 정보를 다 가져옴
        let tmp_date=new Date(selectDate);//누른날을 날짜객체로 만들어줌

        await axios.get(`http://127.0.0.1:8000/api/diet/${tmp_date.getFullYear()+"-"+parseInt(tmp_date.getMonth()+1)+"-"+tmp_date.getDate()}/${id}`)//서버로 음식들 전송
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data)
            })    

    }

    const sendfood_to_server_update=(new_obj)=>{//추가해주기용 api
        let tmp_date=new Date(selectDate);//누른날을 날짜객체로 만들어줌



        new_obj.map(async(food,index)=>{
            await axios.post(`http://127.0.0.1:8000/api/diet/${tmp_date.getFullYear()+"-"+parseInt(tmp_date.getMonth()+1)+"-"+tmp_date.getDate()}/${id}`,
            {
                time:food.when_to_eat,
                food_name:food.Info_from_api.DESC_KOR,
                food_g:parseInt(food.gram),//먹은 그램수
                food_kcal:food.Info_from_api.NUTR_CONT1===""?0:parseInt(food.Info_from_api.NUTR_CONT1),//열량
                carbohydrate:food.Info_from_api.NUTR_CONT2===""?0:parseFloat(food.Info_from_api.NUTR_CONT2).toFixed(1),//탄수화물 그램
                protein:food.Info_from_api.NUTR_CONT3===""?0:parseFloat(food.Info_from_api.NUTR_CONT3).toFixed(1),//단백질 그램
                province:food.Info_from_api.NUTR_CONT4===""?0:parseFloat(food.Info_from_api.NUTR_CONT4).toFixed(1)//지방 그램
            })//서버로 음식들 전송
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data)
            })    
        })

        
    }

    const sendfood_to_server_remove=(new_obj)=>{//지워주기용 api
        let tmp_date=new Date(selectDate);//누른날을 날짜객체로 만들어줌



        new_obj.map(async(food,index)=>{

            console.log("이름?",food.Info_from_api.DESC_KOR)
            console.log("시간?",food.when_to_eat)
            console.log("그램?",parseInt(food.gram))
            
            await axios.delete(`http://127.0.0.1:8000/api/diet/${tmp_date.getFullYear()+"-"+parseInt(tmp_date.getMonth()+1)+"-"+tmp_date.getDate()}/${id}`,
            {
                data:{ 
                    time:food.when_to_eat,
                    food_name:food.Info_from_api.DESC_KOR,
                    food_g:parseInt(food.gram)//먹은 그램수

                }
               
            })//서버로 음식들 전송
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err)
            })    
        })

        
    }

    useEffect(()=>{

        let tmp_total_list=[...foods.breakfast,...foods.lunch,...foods.dinner];
        let new_obj;//새롭게 추가되거나 새롭게 빠질 것
        let update_or_not;//업데이트가 되었는지 삭제가 되었는지

        if(count.current===1){
            count.current+=1;
            previous_foods.current=tmp_total_list;//현재 정보를 저장
            return;
        }

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
    
        if(previous_foods.current!==tmp_total_list){
            if(tmp_total_list.length>previous_foods.current.length){//즉 새롭게 업데이트 된 상황을 의미
                new_obj=tmp_total_list.filter(x=>!previous_foods.current.includes(x));
                update_or_not="update";//새롭게 정보가 들어왔음을 의미
            }
            else{//반대로 제거가 되었음을 의미
                new_obj=previous_foods.current.filter(x=>!tmp_total_list.includes(x));
                update_or_not="remove";//삭제 되었음을 의미
            }
            console.log("새로운것:",new_obj)
        }
        

        for(const item of tmp_total_list){
            console.log(item);
            if(item.Info_from_api.NUTR_CONT2!==""&& item.Info_from_api.NUTR_CONT1!==""){//칼로리가 존재하는 음식들에 한하여..
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

        if(update_or_not==="update"){
            sendfood_to_server_update(new_obj);//서버로 음식 업데이트 전송
        }
        else{
            sendfood_to_server_remove(new_obj);//서버로 음식 제거 전송
        }
        
        
        previous_foods.current=tmp_total_list;//현재 정보를 저장
        
    },[foods])

    useEffect(()=>{
        get_data_from_sercer();//선택 날짜가 바뀔 때마다 서버로부터 결과 호출
    },[selectDate])
    
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