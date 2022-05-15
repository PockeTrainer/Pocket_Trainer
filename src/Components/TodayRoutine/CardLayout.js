import React,{useRef,useState,useEffect} from "react";
import InfoTab from "./InfoTab";
import TodaySummary from './TodaySummary'

import axios from "axios";
import CssBaseline from '@mui/material/CssBaseline';

import List from '@mui/material/List';

import ListSubheader from '@mui/material/ListSubheader';
import ExerciseRoutine from "./ExerciseRoutine";

import Grow from '@mui/material/Grow';
import { useDispatch, useSelector } from "react-redux";
import { not_exercise_start,routine_info } from "../../modules/action";
import ExtraExercise from "./ExtraWorkout/ExtraExercise";


function CardLayout(props){
    const id=sessionStorage.getItem("user_id");
    const [checked, setChecked] = useState(false);
    const dispatch=useDispatch();
    const exercise_start_page=useSelector(state=>state.Exercise_start_reducer.page);//본 메인 운동스텝에 들어갔는지 여부로 상단메뉴를 결정해줌
    const [page,set_page]=useState("today_routine");//헤더탭에서 어디에 위치에 있는지를 알려줌

    useEffect(()=>{//혹시나 뒤로가기나 이런걸로 다시 왔을때를 대비해 운동모드를 꺼준다
        if(exercise_start_page){
            dispatch(not_exercise_start());
        }
    },[exercise_start_page])

    useEffect(async()=>{
        let bodypart=new Set();//부위는 중복되는게 있기에 set 선택-중복안되도록
        let part1=[];
        let part2=[];
        let part3=[];
        let where_to_put;
        let module= require("../../ExercisesInfo/ExerciseInfo.js");
        let Exercise=module.Exercise;

        let date=new Date();
        let today=date.getFullYear()+"/"+parseInt(date.getMonth()+1)+"/"+date.getDate();//오늘날짜

        let date_of_routine=localStorage.getItem("today_date");//날짜가 저장되어있는지 먼저 확인
        if(date_of_routine==null){//만약에 날짜객체가 저장이 안되어있다면 새롭게 오늘날짜 저장
            localStorage.setItem("today_date",today)
        }
        else{//만약에 접속된 날짜정보가 있다
            if(date_of_routine!==today){//오늘 날짜와 다르다면 
                localStorage.clear();//모든 저장되어 있던 운동정보+이전날짜 값 지우기
                localStorage.setItem("today_date",today);//새로운 오늘 날짜 저장
            }
        }

        await axios.post(`http://127.0.0.1:8000/api/workout/createRoutine/${id}`)
            .then((res) => {//루틴이 성공적생성가능하다는 것 결국->이미 한 번 평가를 봤다는 뜻 
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data)
                if (err.response.data.error === '오늘의 운동 루틴 생성 실패, 체력평가 결과 필요') {
                    console.log("체력 평가 유도");
    
                } else if (err.response.data.error === '오늘의 운동 계획이 이미 생성되었습니다') {
                    console.log("skip");
                   
                }
            })

        await axios.get(`http://127.0.0.1:8000/api/workout/todayRoutine/${id}`)//루틴정보 불러와서 부위종류,part1,part2,part3 운동을 나눠서 데이터를 나눠줌
        .then((res) => {

            console.log(res.data);
            let tmp=res.data.todayRoutine;

            tmp.map((info,index)=>{
               bodypart.add(info.workout_name.body_part);

               if(0<=index<=2){
                where_to_put=part1;
            }

               if(info.workout_name.body_part==="하체"){
                    where_to_put=part2;
                }
               else if(index===3){
                   where_to_put=part2
               }

               if(info.workout_name.body_part==="복근"){
                   where_to_put=part3
               }
                //운동객체 생성 후 상수정보 까지 합치기

               window[info.workout_name.workout_name]=new Exercise(info,module[info.workout_name.workout_name]);//각각의 api결과+상수정보까지 합침
               where_to_put.push(eval(info.workout_name.workout_name));

               //각 파트별 나눠진 객체들을 리덕스로 공통으로 쓰이게 올리기
               dispatch(routine_info([...bodypart],part1,part2,part3));
            })
        })
        .catch((err) => {
            console.log(err)
        })


        console.log(bodypart);
        console.log(part1);
        console.log(part2);
        console.log(part3);

    },[])

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
        lineHeight:"7px",
        top:page==="today_routine"?"-0.5rem":"1.5rem"
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
        <div className="header bg-gradient-primary pt-5 pt-md-8" data-component="HeaderForCard" style={{minHeight:"100vh"}}>
              <div className="container-fluid">
                <div className="header-body">
                    <div className="container-fluid" >
                        <div className="row" data-component="ProfileCardLayout">
                            <CssBaseline />
                            <List sx={{marginTop:"-3.85em",paddingTop:"14px",paddingBottom:"0"}}>
                                <ListSubheader sx={subListHeader}>
                                    <InfoTab change_click_func={set_page}/>
                                </ListSubheader>
                                
                                <div className="col-xl-8 order-xl-1" style={{paddingLeft:"1px",paddingRight:"1px"}} >
                                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
                                        {...(checked ? { timeout: 1000 } : {})}>
                                        <div>
                                            {page=="today_routine"&&<TodaySummary/>}
                                            

                                            {page=="extra_routine"&&<ExtraExercise/>}
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