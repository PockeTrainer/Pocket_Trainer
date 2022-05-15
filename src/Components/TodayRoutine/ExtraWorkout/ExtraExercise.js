import React from "react";
import EachExerciseMainPhoto from "./EachExerciseMainPhoto";
import Slider from "react-slick";
import styled from "styled-components";
import {
    bench_press,
    incline_press,
    pec_dec_fly,
    lat_pull_down,
    seated_row,
    barbell_row,
    dumbbell_shoulder_press,
    side_lateral_raise,
    reverse_pec_dec_fly,
    cable_push_down,
    lying_triceps_extension,
    dumbbell_kickback,
    easy_bar_curl,
    arm_curl,
    hammer_curl,
    crunch,
    seated_knees_up,
    plank,
    squat,
    leg_press,
    leg_extension,    
} from "../../../ExercisesInfo/ExerciseInfo"
import SwipeExtraPage from "./SwipeExtraPage";

function ExtraExercise(){

    const exericse_list=[
        bench_press,
        incline_press,
        pec_dec_fly,
        lat_pull_down,
        seated_row,
        barbell_row,
        dumbbell_shoulder_press,
        side_lateral_raise,
        reverse_pec_dec_fly,
        cable_push_down,
        lying_triceps_extension,
        dumbbell_kickback,
        easy_bar_curl,
        arm_curl,
        hammer_curl,
        crunch,
        seated_knees_up,
        plank,
        squat,
        leg_press,
        leg_extension,    
    ];

    const settings_for_total={
        arrows:false,
        dots:false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    
      const StyledSlider=styled(Slider)`
      .slick-list {
          margin:0 -2rem !important;
      }
     `
    return(
       <>
        <StyledSlider {...settings_for_total}>
            {
                exericse_list.map((exercise,index)=>{
                    return(
                        <>
                         <EachExerciseMainPhoto exercise_obj={exercise} where={"MainPage"}/>
                        </>
                    )
                }
                   
                )
            }
        </StyledSlider>


        <SwipeExtraPage/>
        
       </>  
    );

}
export default ExtraExercise;