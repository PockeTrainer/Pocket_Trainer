import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import Slider from 'react-slick';
import EachExerciseClear from './EachExerciseClear';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import { useDispatch, useSelector } from "react-redux";

import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useNavigate } from 'react-router-dom';

function Cards(){

    const today_info=useSelector(state=>state.update_mainpage_reducer);//api로부터 불러온 운동정보를 가져옴
    const{clear_workout_percentage,diff_kcal,nutrient_graph,today_kcal,today_kcal_consumption,workout_graph,wrong_poses_dict,bodypart,part1,part2,part3}=today_info;//부위정보 담아주기
    const navigate=useNavigate();

    const [left_First_exercise,set_left_First_exercise]=useState("");//클리어하지 못한 운동 중 첫 운동

    const settings_for_clear={
      arrows:false,
      dots:false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    const StyledSlider=styled(Slider)`
    .slick-list {
        margin:0 -3px !important;
    }
    `

    const ThreeComboStyle={
      minWidth:"0",
      paddingRight:"0",
      paddingLeft:"0"
    }

    const CardBackGround={
      backgroundColor:"rgba(255,255,255,0.4)",
      borderRadius:"16px"
    };

    const Pstyled=styled('p')((props)=>({
      fontSize:"1.0rem",
      fontWeight:props.bold=="lighter"?"lighter":"600",
      lineWeight:"1.0",
      marginBottom:"0",
      color:props.color?props.color:"white"
    }));

    useEffect(()=>{
 
      let tmp_first_left;//남은 첫운동
      let total_list=[...part1,...part2,...part3];
      if(total_list.length===0){
        return;
      }
      for(let i=0;i<=total_list.length;i++){
        console.log(total_list[i]);
        if(!total_list[i].Info_from_api.is_clear){
          tmp_first_left=total_list[i].name;
          break;
        }
      }
      console.log(tmp_first_left);
      set_left_First_exercise(tmp_first_left);//앞으로 해야하는 첫 운동

    },[today_info])


        return(
            <div className="row" data-component="Card">

              <StyledSlider {...settings_for_clear}>
                {
                  [...part1,...part2,...part3].length>0
                  ?

                    [...part1,...part2,...part3].map((exercise,index)=>{
                      
                      return(
                        <>
                          <EachExerciseClear key={exercise.name+"아무말1"} exercise_obj={exercise}/>
                        </>
                      );
                    })
                  :
                  null
                }
              </StyledSlider>

              <Stack direction={"row"} spacing={1}>
                    <div className="col-xl-3 col-lg-6" style={ThreeComboStyle}>
                        <div className="card card-stats mb-4 mb-xl-0" style={CardBackGround}>
                          <div className="card-body" style={{padding:"0 0.2rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1.0rem",width:"80%",marginBottom:"1rem",color:"white",backgroundColor:"#2dce89"}}>{bodypart[0]}</span>
                            {
                              part1.map((exercise,index)=>{
                                if(exercise.Info_from_api.is_clear){
                                  return(
                                    <>
                                      <Chip key={exercise.name+"아무말2"} icon={<CheckCircleIcon  sx={{fontSize:"1.0rem",color:"#2dce89 !important"}} />} label={exercise.name} sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                                    </>
                                  );

                                }else if(exercise.Info_from_api.is_clear===false && exercise.Info_from_api.workout_time!==null){//운동시간은 존재할때 일부세트만 한경우
                                    return(
                                    <>
                                        <Chip key={exercise.name+"아무말2"} icon={<ReportProblemIcon  sx={{fontSize:"1.0rem",color:"#fb6340 !important"}} />} label={exercise.name} sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                                    </>
                                    );
                                }
                                else{
                                  return(
                                    <>
                                       <Chip key={exercise.name+"아무말2"} icon={<CancelIcon  sx={{fontSize:"1.0rem",color:"#dc3545 !important"}} />} label={exercise.name} sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                                    </>
                                  );
                                }
                              })
                            }
                          </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-6" style={ThreeComboStyle}>
                        <div className="card card-stats mb-4 mb-xl-0" style={CardBackGround}>
                          <div className="card-body" style={{padding:"0 0.2rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1.0rem",width:"80%",marginBottom:"1rem",color:"white",backgroundColor:"#2dce89"}}>{bodypart[1]}</span>
                            {
                              part2.map((exercise,index)=>{
                                if(exercise.Info_from_api.is_clear){
                                  return(
                                    <>
                                      <Chip key={exercise.name+"아무말3"} icon={<CheckCircleIcon  sx={{fontSize:"1.0rem",color:"#2dce89 !important"}} />} label={exercise.name} sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                                    </>
                                  );

                                }else if(exercise.Info_from_api.is_clear===false && exercise.Info_from_api.workout_time!==null){//운동시간은 존재할때 일부세트만 한경우
                                    return(
                                    <>
                                        <Chip key={exercise.name+"아무말3"} icon={<ReportProblemIcon  sx={{fontSize:"1.0rem",color:"#fb6340 !important"}} />} label={exercise.name} sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                                    </>
                                    );
                                }
                                else{
                                  return(
                                    <>
                                       <Chip key={exercise.name+"아무말3"} icon={<CancelIcon  sx={{fontSize:"1.0rem",color:"#dc3545 !important"}} />} label={exercise.name} sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                                    </>
                                  );
                                }
                              })
                            }
                          </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-3 col-lg-6" style={ThreeComboStyle}>
                        <div className="card card-stats mb-4 mb-xl-0" style={CardBackGround}>
                          <div className="card-body" style={{padding:"0 0.2rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1.0rem",width:"80%",marginBottom:"1rem",color:"white",backgroundColor:"#2dce89"}}>{bodypart[2]}</span>
                            {
                              part3.map((exercise,index)=>{
                                if(exercise.Info_from_api.is_clear){
                                  return(
                                    <>
                                      <Chip key={exercise.name+"아무말4"} icon={<CheckCircleIcon  sx={{fontSize:"1.0rem",color:"#2dce89 !important"}} />} label={exercise.name} sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                                    </>
                                  );

                                }else if(exercise.Info_from_api.is_clear===false && exercise.Info_from_api.workout_time!==null){//운동시간은 존재할때 일부세트만 한경우
                                    return(
                                    <>
                                        <Chip key={exercise.name+"아무말4"} icon={<ReportProblemIcon  sx={{fontSize:"1.0rem",color:"#fb6340 !important"}} />} label={exercise.name} sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                                    </>
                                    );
                                }
                                else{
                                  return(
                                    <>
                                       <Chip key={exercise.name+"아무말4"} icon={<CancelIcon  sx={{fontSize:"1.0rem",color:"#dc3545 !important"}} />} label={exercise.name} sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                                    </>
                                  );
                                }
                              })
                            }
                          </div>
                        </div>
                    </div>
                 
              
              </Stack>
             

        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0" style={CardBackGround}>
            <div className="card-body" style={{padding:"1rem 0.5rem"}}>

              

              <div className="progress-wrapper" style={{paddingTop:"0"}}>
                <div className="progress-info">
                  <div className="progress-label">
                    <span style={{fontSize:"0.925rem",backgroundColor:"#2dce89",color:"white"}}>운동성취도</span>
                  </div>
                  <div className="progress-percentage">
                    <span style={{color:"white",fontSize:"1.875rem"}}>{clear_workout_percentage}%</span>
                  </div>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-success" role="progressbar" aria-valuenow={clear_workout_percentage} aria-valuemin="0" aria-valuemax="100"  style={{width:clear_workout_percentage+"%"}}></div>
                </div>
                
              </div>
              
              <div className="alert alert-secondary" role="alert" style={{marginTop:"1rem",marginBottom:"0em",padding:"0.5rem 0.5rem"}}>
               <span className="badge badge-success" style={{fontSize:"1em",}}>{left_First_exercise}부터</span>
               <button type="button" className="btn btn-primary btn-lg btn-block" onClick={()=>navigate("/main/routine")}><i className="fas fa-running"></i>운동하러 가기</button>
              </div>
           

             


            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0" style={CardBackGround}>
            <div className="card-body" style={{padding:"1rem 0.5rem"}}>
                  <Pstyled bold="etc">
                   오늘의 잘못된 자세
                  </Pstyled>
                  <div className="form-group">
                                <select className="form-control" id="exampleFormControlSelect1">
                                <option>벤치프레스</option>
                                <option>인클라인프레스</option>
                                <option>펙덱 플라이</option>
                                </select>
                  </div>

                  <div className="alert alert-secondary" role="alert" style={{marginTop:"1rem",marginBottom:"0em",padding:"0.5rem 0.5rem"}}>
                    <Pstyled bold="lighter" color="black">
                      1.왼쪽으로 기울어짐
                    </Pstyled>
                    <Pstyled bold="lighter" color="black">
                      2.왼쪽으로 기울어짐
                    </Pstyled>
                    <Pstyled bold="lighter" color="black">
                      3.왼쪽으로 기울어짐
                    </Pstyled>
                  </div>


            </div>
               
          </div>
             
        </div>


        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0" style={CardBackGround}>
            <div className="card-body" style={{padding:"1rem 0.5rem"}}>
              <div className="row">
                <div className="col">
                  <Pstyled bold="etc">오늘의 섭취열량</Pstyled>
                  <span className="h2 font-weight-bold mb-0" style={{fontSize:"1.875rem"}}><LocalDiningIcon sx={{fontSize:"3.5rem",color:"#2dce89"}}/>{today_kcal}kcal</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                    Kcal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0" style={CardBackGround}>
            <div className="card-body" style={{padding:"1rem 0.5rem"}}>
              <div className="row">
                <div className="col">
                  <Pstyled bold="etc">오늘의 소모열량</Pstyled>
                  <span className="h2 font-weight-bold mb-0" style={{fontSize:"1.875rem"}}><FitnessCenterIcon sx={{fontSize:"3.5rem",color:"#2dce89"}}/>{today_kcal_consumption}kcal</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                    Kcal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        );
    }
export default Cards;