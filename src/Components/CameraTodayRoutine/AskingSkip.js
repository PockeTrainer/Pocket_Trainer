import React, { useEffect,useRef,useState } from "react";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { fabClasses, Stack } from "@mui/material";
import Alert from '@mui/material/Alert';
import { styled } from "@mui/system";
import AlertTitle from '@mui/material/AlertTitle';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import PersonIcon from '@mui/icons-material/Person';
import CancelIcon from '@mui/icons-material/Cancel';
import {next_exercise,next_part,final_result_page,reset,none_testState} from "../../modules/action";
import axios from "axios";


const Pstyled=styled('p')((props)=>({
    fontSize:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0"
}));

const Is_Shoulder_routine=(bodypart)=>{//어깨로 할당된 루틴인지 확인이 필요하기에-어깨날은 개수 구성이 7개로 달라서
    if(bodypart.indexOf("어깨")>0){
        return true;
    }
    else{
        return false;
    }
}

const Is_first=(now_exercise)=>{//현재 운동의 is_first정보를 (weightCheck)api로 불러오기 전에 건너뛰기를 하면 쓸 수 없기에 이렇게 직접 찾아주자
    if(now_exercise.Info_from_api.target_cnt!==null||now_exercise.Info_from_api.target_kg!==0||now_exercise.Info_from_api.target_time!==null){
        return false;
    }
    else{
        return true;
    }
}

function AskingSkip(){

    const id=sessionStorage.getItem("user_id");
    const closeRef=useRef();
    const dispatch=useDispatch();
    const routine_info=useSelector(state=>state.update_routineInfo_reducer);//api로부터 불러온 운동정보를 가져옴
    const page_info=useSelector(state=>state.update_page_progress_reducer);//운동부위와 운동명 정보를 불러옴
    const{bodypart,part1,part2,part3}=routine_info;//부위정보 담아주기
    const{current_bodypart,current_exercise,is_First}=page_info;//현재페이지의 운동부위와 운동명 인덱스
    const now_exercise=eval("part"+parseInt(current_bodypart+1)+"["+current_exercise+"]");//현재스텝의 운동정보를 가지고 있는다 ex)벤치프레스 객체
    const count=useRef(1);

    

    const [checked,set_checked]=useState(0);//체크되어 있는 체크박스를 의미

    const path=useLocation();
    const navigate=useNavigate();
    const [content,set_content]=useState(<Pstyled>디폴트</Pstyled>);//보여줄 내용을 맡음
    let route_url=useRef();//건너뛸 url을 맡음
    let dispatch_state=useRef();//어떤식으로 디스패치할지 알려줌
    const next_part_info=bodypart[current_bodypart+1];//다음 부위의 한국어 이름
    const next_exercise_info=eval("part"+parseInt(current_bodypart+1)+"["+parseInt(current_exercise+1)+"]");//다음스텝의 운동정보를 가지고 있는다 ex)벤치프레스 객체
    const next_next_exercise_info=eval("part"+parseInt(current_bodypart+1)+"["+parseInt(current_exercise+2)+"]");//다음스텝의 운동정보를 가지고 있는다 ex)벤치프레스 객체


    // let is_First=Is_first(now_exercise);//해당운동이 처음인지 아닌지를 파악
    

    const handleClose=()=>{
        closeRef.current.click();
    }

    const popoverStyle={
        "&.MuiButton-root":{
            display:"flex",
            boxShadow:"0",
            backgroundColor:"rgb(50 50 93 / 0%) ",
            padding:"0 0"
        }
    }

    const CheckboxStyled=styled(Checkbox)((props)=>({
        padding:"0px",
        "&.Mui-checked":{
            color:props.custom_color
        }
        
    }));


    const handleClick=(value)=>{
        set_checked(value);//체크 된 인덱스로 설정
    }

    const skip_part=()=>{
        
        return(
            <>
                <Stack direction="column" spacing={3}>
                <Button variant="contained" onClick={()=>handleClick(0)}
                sx={
                    popoverStyle
                }>
                    <Alert severity="error" sx={{backgroundColor:"rgb(255 152 152) !important",padding:"6px 40px "}}>
                        <AlertTitle sx={{color:"rgb(95, 33, 32) !important",fontWeight:"600"}}>{next_part_info} 스킵하기</AlertTitle>
                        <CheckboxStyled custom_color="rgb(95, 33, 32)" checked={checked===0?true:false} />
                        <span style={{color:"rgb(95, 33, 32)"}}>다음 부위 전체를 건너뜁니다<PersonRemoveAlt1Icon/></span>
                    </Alert>
                </Button>


                <Button variant="contained" onClick={()=>handleClick(1)}
                sx={
                    popoverStyle
                }>
                    <Alert severity="info" sx={{backgroundColor:"rgb(181 234 255) !important",padding:"6px 40px "}}>
                        <AlertTitle sx={{color:"rgb(1, 67, 97) !important",fontWeight:"600"}}>{eval("part"+parseInt(current_bodypart+2)+"["+parseInt(0)+"]"+".name")} 스킵하기</AlertTitle>
                        <CheckboxStyled custom_color="rgb(1, 67, 97)" checked={checked===1?true:false}/>
                        <span style={{color:"rgb(1, 67, 97)"}}>{eval("part"+parseInt(current_bodypart+2)+"["+parseInt(0)+"]"+".name")}을 건너뜁니다<PersonIcon/></span>
                    </Alert>
                </Button>

            </Stack>
            </>
        );
    };


    const sendEndWorkoutTime=async()=>{//운동 종료시간을 서버로 보내준다
        const today=new Date();
        const today_date_form=today.getFullYear()+"-"+parseInt(today.getMonth()+1)+"-"+today.getDate();
    
        await axios.post(`http://127.0.0.1:8000/api/workout/endDateTime/${now_exercise.eng_name}/${today_date_form}/${id}`)//맨 처음에 들어왔을 때 운동시작 시간을 보내준다 ex)날짜형식
        .then((res) => {
            console.log(res.data);
    
        })
        .catch((err) => {
            console.log(err)
        })
    };

    const getDataFromServer=async()=>{//서버로부터 해당운동의 최신화된 정보를 가져온다-weightcheck를 했을 때에 새로운 무게값이 안 들어가 있어서 호출해줌
        await axios.get(`http://127.0.0.1:8000/api/workout/userWorkoutInfo/${now_exercise.eng_name}/${id}`)
        .then((res) => {
                console.log(res.data);
                
        })
        .catch((err) => {
            console.log(err)
        })
    }
   

    const goto_next=()=>{
        console.log(dispatch_state);
        if(dispatch_state.current==="goto_exercise"){
            handleClose();
            navigate(route_url.current);
        }
        else if(dispatch_state.current==="next_exercise"){
            if(path.pathname.includes("exercise")){
                dispatch(none_testState());//다시 카메라 준비상태로 다시원상태로 복귀
                sendEndWorkoutTime();//다음부위로 뛰기전에 운동스텝에서는 운동시간 종료해줘야함
            }
            dispatch(none_testState());//다시 카메라 준비상태로 다시원상태로 복귀
            dispatch(reset());//현재 가지고있던 운동정보 초기화 시키기
            dispatch(next_exercise());
        }
        else if(dispatch_state.current==="next_part"){
            if(path.pathname.includes("exercise")){
                dispatch(none_testState());//다시 카메라 준비상태로 다시원상태로 복귀
                sendEndWorkoutTime();//다음부위로 뛰기전에 운동스텝에서는 운동시간 종료해줘야함
            }
            dispatch(reset());//현재 가지고있던 운동정보 초기화 시키기
            dispatch(next_part());
        }
        else if(dispatch_state.current==="next_next_exercise"){
            dispatch(reset());//현재 가지고있던 운동정보 초기화 시키기
            dispatch(next_exercise());
            dispatch(next_exercise());
        }
        else if(dispatch_state.current==="next_next_part"){
            dispatch(reset());//현재 가지고있던 운동정보 초기화 시키기
            dispatch(next_part());
            dispatch(next_part());
        }
        else{//final에 해당함
            if(path.pathname.includes("exercise")){
                sendEndWorkoutTime();//마지막스텝으로 뛰기전에 운동스텝에서는 운동시간 종료해줘야함
                dispatch(none_testState());//다시 카메라 준비상태로 다시원상태로 복귀
            }
            dispatch(reset());//현재 가지고있던 운동정보 초기화 시키기
            dispatch(final_result_page());
        }
        handleClose();
    }

    useEffect(()=>{
        console.log("여기 얼마나 들어옴?");
        if(path.pathname.includes("series")||path.pathname.includes("exercise")){//현재 운동 스킵 물어봄
            set_content(<Pstyled bold="lighter">{now_exercise.name}를 건너뛰시겠습니까?</Pstyled>);
            if(next_exercise_info===undefined){
                if(next_part_info===undefined){//이건 다음 페이지가 final로서 더 이상 건너뛰기가 의미가없음
                    set_content(<Pstyled bold="lighter">모든 운동이 끝났습니다!결과페이지로 이동합니다</Pstyled>);
                    route_url.current=`/routine/finish`;
                    dispatch_state.current="final_page";
                }
                else{//다음 부위는 존재할때-다음부위 첫운동으로 점프
                    route_url.current=`/routine/series/${eval("part"+parseInt(current_bodypart+2)+"["+parseInt(0)+"]"+".eng_part")}`;//무조건 해당사항은 각 파트 별 중간운동 일때에만 먹히는 상황이라 다음부위에 인덱스 0으로 설정
                    dispatch_state.current="next_part";
                }
            }
            else{
                route_url.current=`/routine/weightcheck/${next_exercise_info.eng_name}`;
                dispatch_state.current="next_exercise";//다음운동으로 건너뜀을 의미
            }
            
        }
        else if(path.pathname.includes("weightcheck")){//중량체크 스킵 물어봄-애는 딱히 state의 이동이 없기에 자체적으로 모달 닫고 이동해주자
            if(is_First){
                set_content(<Pstyled bold="lighter">데이터가 존재하지 않아 중량체크를 진행해주셔야 합니다</Pstyled>);
            }
            else{
                set_content(<Pstyled bold="lighter">중량체크단계를 건너뛰시겠습니까?</Pstyled>);
                route_url.current=`/routine/exercise/${now_exercise.eng_name}`;
                dispatch_state.current="goto_exercise";
            }
           
        }
        else if(path.pathname.includes("evaluation")){//다음 운동 스킵 물어봄
            if(next_exercise_info===undefined){//다음 운동이 없을 때 즉 다음 부위 물어볼때 상황-부위 스킵을 할지,다음 운동을 스킵할지 물어봄
                if(next_part_info===undefined){//이건 다음 페이지가 final로서 더 이상 건너뛰기가 의미가없음
                    set_content(<Pstyled bold="lighter">모든 운동이 끝났습니다!결과페이지로 이동합니다</Pstyled>);
                    route_url.current=`/routine/finish`;
                    dispatch_state.current="final_page";
                }
                else{ 
                    set_content(skip_part())//여기서는 다음 부위통째로 생략할지,다음 첫 운동만 생략할지 결정해줘야 함
                    if(checked===0){//다음부위 통째로 스킵하기
                        if(current_bodypart===1){
                            set_content(<Pstyled bold="lighter">모든 운동이 끝났습니다!결과페이지로 이동합니다</Pstyled>);
                            route_url.current=`/routine/finish`;
                            dispatch_state.current="final_page";
                        }
                        else{
                            route_url.current=`/routine/series/${eval("part"+parseInt(current_bodypart+3)+"["+parseInt(0)+"]"+".eng_part")}`;//다음다음부위로 가주자
                            dispatch_state.current="next_next_part";
                        }
                       
                    }
                    else{//다음 부위 첫 운동만 스킵하기
                        if(current_bodypart===1){
                            set_content(<Pstyled bold="lighter">모든 운동이 끝났습니다!결과페이지로 이동합니다</Pstyled>);
                            route_url.current=`/routine/finish`;
                            dispatch_state.current="final_page";
                        }
                        else{
                            let isShoulder=Is_Shoulder_routine(bodypart);
                            route_url.current=`/routine/weightcheck/${eval("part"+parseInt(current_bodypart+2)+"["+parseInt(isShoulder?1:0)+"]"+".eng_name")}`
                        }
                        
                    }
                }
            
            }
            else{//다음운동 건너뛰게
                set_content(<Pstyled bold="lighter">{next_exercise_info.name}을 건너뛰시겠습니까?</Pstyled>);
                if(next_next_exercise_info===undefined){//즉 다음 부위로 점프를 해줘야함-다음다음 운동이 존재하지 않기에
                    route_url.current=`/routine/series/${eval("part"+parseInt(current_bodypart+2)+"["+parseInt(0)+"]"+".eng_part")}`;//무조건 해당사항은 각 파트 별 중간운동 일때에만 먹히는 상황이라 다음부위에 인덱스 0으로 설정
                    dispatch_state.current="next_part";
                }
                else{
                    route_url.current=`/routine/weightcheck/${next_next_exercise_info.eng_name}`;//다음 다음 운동으로 이동해줌
                    dispatch_state.current="next_next_exercise";
                }
            }
        }
    },[path,is_First,checked])

    useEffect(()=>{
        if(count.current===1){
            count.current+=1;
            return;
        }
        console.log(route_url.current);
        navigate(route_url.current);//이동하기로 건너뛰기를 실제로 해줌
    },[current_bodypart,current_exercise])
    
    console.log(is_First)
    return(
        <div className="modal fade" id="modal-asking" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
            <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                        <button ref={closeRef}  type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{padding:"1rem"}}>
                        <div className="text-center">
                            {
                                is_First&&path.pathname.includes("weightcheck")
                                ?
                                    <CancelIcon sx={{color:"#5e72e4",fontSize:"3.5rem"}}/>
                                :
                                    <SkipNextIcon sx={{color:"#5e72e4",fontSize:"3.5rem"}}/>
                            }
                            
                        </div>
                        <span className="badge badge-primary" style={{fontSize:"1em",marginTop:"2rem",marginBottom:"1rem"}}>스킵하기</span>
                        {content}
                        
                    </div>
                    

                    {
                            (is_First&&path.pathname.includes("weightcheck"))||path.pathname.includes("finish")
                            ?
                                <div className="modal-footer" style={{justifyContent:"center"}}>
                            
                                    <button type="button" className="btn btn-primary" data-dismiss="modal"   > <i className="ni ni-check-bold" /> 확인</button>
                                </div>
                            :
                            <div className="modal-footer" style={{justifyContent:"space-between"}}>
                                <button type="button" className="btn btn-primary" onClick={goto_next}  > <i className="ni ni-check-bold" /> 확인</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"><i className="ni ni-fat-remove" /> 취소</button>
                            </div>

                    }
                    
                </div>
            </div>
        </div>
        );
}
export default AskingSkip

