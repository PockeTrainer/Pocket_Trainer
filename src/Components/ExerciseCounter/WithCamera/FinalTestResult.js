import React, { useEffect, useState } from "react";
import TitleMessage from "./TitleMessage";
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import {  Last_clear_page } from "../../../modules/action";
import { not_exercise_start } from "../../../modules/action";

function FinalTestResult(){
    const appRef=useSelector(state=>state.Appref.ref);//모달창
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [AllExercise,setAllExercise]=useState(
        {
            upperbody:"",
            abs:"",
            lowerbody:""
        }
    )

    var upper_idx;
    var abs_idx;
    var lower_idx;
    var total_idx;

    let id=sessionStorage.getItem("user_id");


    useEffect(()=>{
        axios.get(`/workout/lastTestResult/${id}`)
        .then(res => {
            console.log(res.data);
            setAllExercise({
                ...AllExercise,
                ["upperbody"]:parseInt(res.data.upperbody_strength),
                ["abs"]:parseInt(res.data.stomach_strength),
                ["lowerbody"]:parseInt(res.data.lowerbody_strength)
            })
        })
    },[])

    
   

    const totalState=parseInt((AllExercise.upperbody+AllExercise.abs+AllExercise.lowerbody)/3);
    
    
    const content={
        title:"최종측정결과",
        message:"세 가지 부분에 대한 측정결과는 이와 같습니다."
    };

    const grade={
        1:"매우우수",
        2:"우수",
        3:"평균",
        4:"평균이하",
        5:"심각"
    }

    const alertStyle={
        padding:"1rem 1rem"
    };

    const upperbody = 
        {
            1: "회원님의 상체 근발달정도는 매우 우수한편이군요!.저희의 루틴을 따르면서 조금은 상체근육의 부피와 수행능력에 향상에 초점을 맞춰보세요 ",
            2:"회원님의 상체 근발달정도는 우수한 편이에요.하지만 어느정도 근육을 가지고 있으셔서 저희가 추천해드리는 맞춤루틴을 따르시면 곧 근발달도의 향상을 매우 우수 등급까지 이끌 수 있을것입니다!",
            3:"회원님의 상체 근발달정도는 평균인 편이에요.어느정도 평균적인 근육을 가지고 있으셔서 충분하거나 적은 편도 아닙니다.그러나 저희의 루틴을 따르시면 우수등급까지 가는건 시간문제! ",
            4:"회원님의 상체 근발달정도는 평균 이하에요.평소에 운동을 자주 하신적이 없으신 것 같군요.회원님은 기초적으로 상체근육의 전반적인 향상이 필요해요.저희가 추천해드리는 루틴을 따르시면서 우선 평균등급으로 올리시는걸 추천드려요",
            5:"회원님의 상체 근발달정도는 매우 미흡한편에 속합니다.상체운동이라는 것을 해보신적이 없으신 것 같군요.저희와 함께 기본적인 운동방법과 운동의 재미를 먼저 들여 조금씩 늘려가보는걸 추천드려요!"
        };
    const abs = 
    {
            1: "회원님의 복부 근발달정도는 매우 우수한편이군요!.저희의 루틴을 따르면서 조금은 복부근육의 부피와 수행능력에 향상에 초점을 맞춰보세요 ",
            2:"회원님의 복부 근발달정도는 우수한 편이에요.하지만 어느정도 근육을 가지고 있으셔서 저희가 추천해드리는 맞춤루틴을 따르시면 곧 복근 선명도 향상을 매우 우수 등급까지 이끌 수 있을것입니다!",
            3:"회원님의 복부 근발달정도는 평균인 편이에요.어느정도 평균적인 근육을 가지고 있으셔서 충분하거나 적은 편도 아닙니다.그러나 저희의 루틴을 따르시면 선명한 식스팩으로 가는건 시간문제! ",
            4:"회원님의 복부 근발달정도는 평균 이하에요.평소에 운동을 자주 하신적이 없으신 것 같군요.회원님은 기초적으로 복부근육의 전반적인 향상이 필요해요.저희가 추천해드리는 루틴을 따르시면서 우선 평균등급으로 올리시는걸 추천드려요",
            5:"회원님의 복부 근발달정도는 매우 미흡한편에 속합니다.코어근육도 무척 약합니다.복부운동이라는 것을 해보신적이 없으신 것 같군요.저희와 함께 기본적인 운동방법과 운동의 재미를 먼저 들여 조금씩 코어 근육부터 늘려가보는걸 추천드려요!"
    };

    const lowerbody = 
        {
            1: "회원님의 하체 근발달정도는 매우 우수한편이군요!.당신은 거의 하체만은 운동선수!저희의 루틴을 따르면서 조금은 하체근육의 부피와 수행능력에 향상에 초점을 맞춰보세요 ",
            2:"회원님의 하체 근발달정도는 우수한 편이에요.하지만 어느정도 하체근육을 가지고 있으셔서 저희가 추천해드리는 맞춤루틴을 따르시면 곧 하체만큼 을 매우 우수 등급까지 이끌 수 있을것입니다!",
            3:"회원님의 하체 근발달정도는 평균인 편이에요.어느정도 평균적인 근육을 가지고 있으셔서 충분하거나 적은 편도 아닙니다.그러나 저희의 루틴을 따르시면 어디가서 하체가 부실하다는 듣지는 못하는건 시간문제! ",
            4:"회원님의 하체 근발달정도는 평균 이하에요.평소에 하체운동을 자주 하신적이 없으신 것 같군요.다리가 부실할수있습니다.회원님은 기초적으로 하체근육의 전반적인 향상이 필요해요.저희가 추천해드리는 루틴을 따르시면서 우선 평균등급으로 올리시는걸 추천드려요",
            5:"회원님의 하체 근발달정도는 매우 미흡한편에 속합니다.하체가 너무 멸치급....하체운동이라는 것을 해보신적이 없으신 것 같군요.저희와 함께 기본적인 운동방법과 운동의 재미를 먼저 들여 조금씩  대근육부터 늘려가보는걸 추천드려요!"
        };

    const totalbody={
        1:"회원님의 전반적인 체력관리는 그동안 스스로 잘 해온것으로 추정됩니다.체력은 전반적으로 매우 좋습니다!스스로 관리가 철저하신 우리 회원님은 우리 포켓트레이너를 스팟터로서 고강도운동을 통한 수행능력을 향상시키는데 한 번 운동을 해보는 것을 추천드립니다!",
        2:"회원님의 전반적인 체력관리는 어느정도는 해온것으로 보입니다.체력도 나쁘지 않은편으로 우수한 편에 속합니다!회원님께서는 그래도 어느정도 의지가 있으셔서 조금씩 중량의 부하를 주면서 하면 금방 근 부피가 더 커질것으로 보입니다.대근육 초점으로 운동을 좀 더해보는 걸 추천드립니다.",
        3:"회원님의 전반적인 체력은 그래두 어느 한 부분 부족한 것 없지만 뛰어난 부분도 없습니다.그래도 평균정도의 수행능력을 갖춘 우리 회원님!조금은 꾸준한 운동을 저희 포켓트레이너와 함께한다면 전반적인 근지구력을 향상시킬수 있을 것입니다!.우리회원님은 다양한 부위별 운동법을 먼저 꾸준함을 통해 숙지하는것을 추천드립니다!",
        4:"회원님의 전반적인 체력관리가 그동안 스스로 잘 해오지 못한것으로 추정됩니다.하지만 괜찮습니다!대부분의 현대인들이 과도한 업무와 스트레스로 인해 이부분에 해당합니다.회원님께서는 먼저 우리 포켓트레이너와 함께 성취해가는 동기부여와 아주 기초적인 운동부터 기초체력을 기르며 재미를 갖는 것을 추천드립니다.",
        5:"회원님의 전반적인 체력관리는 거의 하나도 안되어온 것으로 추정됩니다.조금은 심각한편에 속하시지만!괜찮습니다!원래 운동은 이러한 체력일수록 더욱 빠르게 금방 성장합니다.이제 운동을 시작하는 우리회원님 같이 해나가 보아요!"
    }


    const buttonClicked=(event)=>{
        dispatch(Last_clear_page(event.target.id));//모달창상으로 완전히 끝남을 의미함
        appRef.current.click();
        
    };

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(1);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return(
        <div>
            <TitleMessage content={content}/>
            {activeStep==1&&
                <div className="alert alert-primary" role="alert" style={alertStyle}>
                    <span className="alert-icon"><i class="ni ni-chart-bar-32"></i></span>
                    <span className="alert-text display-4" style={{display:"block"}}>측정결과</span>
                    <div className="alert alert-success" role="alert" style={alertStyle}>
                        <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(상체){grade[AllExercise.upperbody]}</strong></span>
                    </div>
                    <div className="alert alert-success" role="alert" style={alertStyle}>
                        <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(복근){grade[AllExercise.abs]}</strong></span>
                    </div>
                    <div className="alert alert-success" role="alert" style={alertStyle}>
                        <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(하체){grade[AllExercise.lowerbody]}</strong></span>
                    </div>

                </div>
            }
            {activeStep==2 &&
                <div className="alert alert-primary" role="alert" style={alertStyle}>
                <span className="alert-icon"><i class="ni ni-chart-bar-32"></i></span>
                <span className="alert-text display-4" style={{display:"block"}}>About Me-상체</span>
                <div className="alert alert-success" role="alert" style={alertStyle}>
                    <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(상체)코멘트</strong></span>
                    <p style={{color:"black"}}>{upperbody[AllExercise.upperbody]}</p>
                </div>

            </div>
            }
            {activeStep==3 &&
                <div className="alert alert-primary" role="alert" style={alertStyle}>
                <span className="alert-icon"><i class="ni ni-chart-bar-32"></i></span>
                <span className="alert-text display-4" style={{display:"block"}}>About Me-복근</span>
                <div className="alert alert-success" role="alert" style={alertStyle}>
                    <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(복근)코멘트</strong></span>
                    <p style={{color:"black"}}>{abs[AllExercise.abs]}</p>
                </div>

            </div>
            }
            {activeStep==4 &&
                <div className="alert alert-primary" role="alert" style={alertStyle}>
                <span className="alert-icon"><i class="ni ni-chart-bar-32"></i></span>
                <span className="alert-text display-4" style={{display:"block"}}>About Me-하체</span>
                <div className="alert alert-success" role="alert" style={alertStyle}>
                    <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(하체)코멘트</strong></span>
                    <p style={{color:"black"}}>{lowerbody[AllExercise.lowerbody]}</p>
                </div>

            </div>
            }
            {activeStep==5 &&
                <div className="alert alert-primary" role="alert" style={alertStyle} >
                <span className="alert-icon"><i class="ni ni-chart-bar-32"></i></span>
                <span className="alert-text display-4" style={{display:"block"}}>About Me-최종평</span>
                <div className="alert alert-warning" role="alert" style={alertStyle}>
                    <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(최종)코멘트</strong></span>
                    <p>{totalbody[totalState]}</p>
                </div>

                <button id="end" onClick={buttonClicked} type="button" className="btn btn-warning btn-lg btn-block" style={{marginTop:'5px'}}><i class="fas fa-undo-alt"></i>평가종료</button>
                <button id="goto" onClick={buttonClicked} type="button" className="btn btn-warning btn-lg btn-block" style={{marginTop:'5px'}}><i class="fas fa-dumbbell"></i>오늘의루틴추천</button>
            </div>
            }
            
            <MobileStepper
                variant="progress"
                steps={6}
                position="static"
                activeStep={activeStep}
                sx={{ maxWidth: 400, flexGrow: 1 }}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 5} sx={{color:"white"}}>
                    다음
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 1} sx={{color:"white"}}>
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                    이전
                    </Button>
                }
            />
        </div>
    );
}
export default FinalTestResult