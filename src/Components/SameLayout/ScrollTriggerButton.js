import React, { useEffect, useState,useRef } from "react";
import Box from '@mui/material/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import { useNavigate } from "react-router-dom";
import { routine_info,exercise_start, next_exercise, next_part,final_result_page,reset} from "../../modules/action";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from "react-router-dom";


function ScrollButton(props) {
    let { children,content,window,grade,changeModalTime,css_bottom } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    // 스크롤로 나타내고 모 없애고 싶을때 쓰삼
    // const trigger = useScrollTrigger({
    //   target: window ? window() : undefined,
    //   disableHysteresis: true,
    //   threshold: 50,
    // });
    if(css_bottom===undefined){
      css_bottom="1em";
    }
    const dispatch=useDispatch();
    const id=sessionStorage.getItem("user_id");
    const exercise_name=useParams();

    const count=useRef(1);
    const _routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const page_info=useSelector(state=>state.update_page_progress_reducer);//페이지가 담고있는 부위와 운동명 가져옴
    const{bodypart,part1,part2,part3,fail_list}=_routine_info;//부위정보 담아주기
    const{current_bodypart,current_exercise}=page_info;//현재페이지의 운동부위와 운동명 인덱스
    let now_exercise_obj=eval('part'+parseInt(current_bodypart+1)+"["+current_exercise+"]");//현재운동객체 갖고오기

    const[check,setCheck]=useState(false);//이걸로 버튼 짜잔 할거임

    const handleChange=()=>{
      setCheck((prev)=>!prev);
    }

    useEffect(()=>{
      setTimeout(handleChange,3000)
    },[])

    useEffect(()=>{
      if(count.current===1){
        count.current+=1;
        return;
      }
      sendFeedBack();//서버로 api전송
      if(current_bodypart===0&&current_exercise===0){
        navigate("/routine/finish")
      }
      else{
        let next_page=eval('part'+parseInt(current_bodypart+1)+"["+current_exercise+"]");
        navigate("/routine/series/"+next_page.eng_part);
      }
    },[current_bodypart])//즉 부위의 정보가 다음칸으로 건너뛰었으면 실행해줌
  
    const navigate=useNavigate();


    const set_FailList_to_routine=()=>{//fail_list 정보를 routine_info으로 넘김
      let part1=[];
      let part2=[];
      let part3=[];
      let where_to_put;

      fail_list.map((exercise,index)=>{
          if(exercise.part==="가슴"||exercise.part==="등"||exercise.part==="어깨"){
              where_to_put=part1;
          }
          else if(exercise.part==="삼두"||exercise.part==="이두"||exercise.part==="하체"){
              where_to_put=part2;
          }
          else{
              where_to_put=part3;
          }
          where_to_put.push(exercise);
      });

      dispatch(routine_info(bodypart,part1,part2,part3));//fail_list를 순회하면서 생성된 값을 routine_info로 치환
  };


    const handleClick = (event) => {

      let next_exercise_obj=eval('part'+parseInt(current_bodypart+1)+"["+parseInt(current_exercise+1)+"]");//다음운동객체 갖고오기-물론 없으면 undefined뜰 것임

      if(content==="평가준비"){
        dispatch(exercise_start());
        navigate("/test/caution");//테스트평가사항페이지로 이동
      }
      else if(content==="운동준비"){
        dispatch(exercise_start());//운동모드로 바꿔줌
        navigate("/routine/caution");
      }
      else if(content==="이어하기"){
        set_FailList_to_routine();//fail_list의 값을 routine_info의 값으로 치환
        dispatch(exercise_start());//운동모드로 바꿔줌
        if(fail_list[0].part==="삼두"||fail_list[0].part==="이두"||fail_list[0].part==="하체"){//첫 건너뛴 운동의 부위가 운동의 중간 부위일때
          dispatch(next_part());//한 부위를 건너뛴다
        }
        else if(fail_list[0].part==="복근"){//마지막 부위일때
          dispatch(next_part());
          dispatch(next_part());
        }
        navigate("/routine/weightcheck/"+fail_list[0].eng_name);//이어하기 할시 fail_list 첫번째 운동으로 이동
      }
      else if(content==="사전체크"){
          navigate("/routine/weightcheck/"+now_exercise_obj.eng_name);
      }
      else if(content==="연습세트"){
          navigate("/routine/weightcheck/practice/"+now_exercise_obj.eng_name);
      }
      else if(content=="다음운동"){
        if(grade===null){
          changeModalTime({
            state:true,
            which:"warning"
          });//위에서 받아온 점수항목이면 다시 평가를 하도록 모달창 띄워져야함
        }
        else{
          let result;
          sendFeedBack().then((value)=>result=value);//피드백 전송
          if(result){//정상적인 피드백 반영시
            dispatch(next_exercise());//다음운동으로 운동정보 업데이트
            dispatch(reset());//current_weight이런 현재 운동이 가지고 있던 정보들 리셋시킴
            navigate("/routine/weightcheck/"+next_exercise_obj.eng_name);
          }
         
        }
       
      }
      else if(content==="다음부위"){
        dispatch(next_part());//다음부위로 운동정보 업데이트
      }
      else if(content==="종료"){
        dispatch(reset());//current_weight이런 현재 운동이 가지고 있던 정보들 리셋시킴
        dispatch(final_result_page());//현재부위와 현재까지 했던 운동들을 초기화
      }
    };

     const sendFeedBack=async()=>{
        let modified_grade;
        let result;
        if(grade===3){///어려움
          modified_grade=1;
        }
        else if(grade===2){//적절
          modified_grade=0;
        }
        else{//쉬움
          modified_grade=2;
        }
        await axios.put(`http://127.0.0.1:8000/api/workout/changeWorkoutFeedback/${exercise_name.exercise_name}/${id}`,{
            feedback:modified_grade
        })//피드백 결과가 생기면-api로 보내주기
        .then((res) => {
            console.log(res.data);
            result=true;
        })
        .catch((err) => {
            console.log(err.response.data.error);
            if(err.response.data.error==="feedback 반영 실패, 현재 최소"){
              changeModalTime({
                state:true,
                which:"grade_warning"
              })
              result=false
            }
        })

        return result;
        
    }

  
    return (
        <Zoom in={check}>
          <Box
            onClick={handleClick}
            role="presentation"
            sx={{ position: 'fixed', bottom: css_bottom, left:"50%" ,transform:"translate(-50%,0) !important" }}
          >
            {children}
          </Box>
        </Zoom>
      );
    }

function ScrollTriggerButton({content,grade,changeModalTime,css_bottom}){
    const ScrollStyle={
        padding:"0.475rem 0.7rem",
        borderRadius:"1.4375rem",
        boxShadow:"0 15px 6px #21252975, 0 5px 3px #5e72e4"
    }
    return(
        <>
        <ScrollButton content={content} grade={grade} changeModalTime={changeModalTime} css_bottom={css_bottom}>
            <button type="button"
             className="btn btn-primary btn-lg btn-block"
             style={ScrollStyle}><h2 style={{fontWeight:"600"}}><i className="ni ni-button-play"></i>{content}</h2></button>
      </ScrollButton>
      </>
    );
}
export default ScrollTriggerButton