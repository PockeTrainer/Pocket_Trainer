import React, { useEffect, useState } from "react";
import TitleMessage from "./TitleMessage";
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Link } from "react-router-dom";


function FinalTestResult(){
    const [upperbodyState,setUpperBodyState]=useState(1);
    const [absState,setAbsState]=useState(1);
    const [lowerBodyState,setLowerBodyState]=useState(1);

    const totalState=(upperbodyState+absState+lowerBodyState)/3;

    var upper_idx;
    var abs_idx;
    var lower_idx;
    var total_idx;

        
    if(1<=upperbodyState && upperbodyState<=2){
        upper_idx="level1_2";
    }
    else if(3<=upperbodyState && upperbodyState<=4){
        upper_idx="level3_4";
    }
    else{
        upper_idx="level5";
    }

    if(1<=abs_idx && abs_idx<=2){
        abs_idx="level1_2";
    }
    else if(3<=abs_idx && abs_idx<=4){
        abs_idx="level3_4";
    }
    else{
        abs_idx="level5";
    }

    if(1<=lower_idx && lower_idx<=2){
        lower_idx="level1_2";
    }
    else if(3<=lower_idx && lower_idx<=4){
        lower_idx="level3_4";
    }
    else{
        lower_idx="level5";
    }

    if(1<=total_idx && total_idx<=2){
        total_idx="level1_2";
    }
    else if(3<=total_idx && total_idx<=4){
        total_idx="level3_4";
    }
    else{
        total_idx="level5";
    }
    
    const content={
        title:"최종측정결과",
        message:"세 가지 부분에 대한 측정결과는 이와 같습니다."
    };

    const upperbody = 
        {
            level1_2: "회원님의 상체 근발달정도는 우수한편이군요!.저희의 루틴을 따르면서 조금은 상체근육의 부피와 수행능력에 향상에 초점을 맞춰보세요 ",
            level3_4:"회원님의 상체 근발달정도는 조금은 미흡한 편이에요.하지만 어느정도 근육을 가지고 있으셔서 저희가 추천해드리는 맞춤루틴을 따르시면 곧 근발달도의 향상을 1~2등급까지 이끌 수 있을것입니다!",
            level5:"회원님의 근발달정도는 평균 이하에요.평소에 운동을 하신적이 없으신 것 같군요.회원님은 기초적으로 근육의 전반적인 향상이 필요해요.저희가 추천해드리는 루틴을 따르시면서 우선 평균등급으로 올리시는걸 추천드려요"
        };
    const abs = 
    {
        level1_2: "회원님의 복부 근발달정도는 우수한편이군요! 이대로라면 식스팩은 금방이겠는걸요?저희의 루틴을 따르면서 복근의 부위별 선명도에 초점을 맞춰보세요",
        level3_4:"회원님의 복부 근발달정도는 조금은 미흡한 편이에요.하지만 어느정도 복부근육을 가지고 있으셔서 저희가 추천해드리는 맞춤루틴을 따르시면 곧 근발달도의 향상을 1~2등급까지 이끌 수 있을것입니다!",
        level5:"회원님의 복근발달정도는 평균 이하에요.평소에 운동을 하신적이 없으신 것 같군요.회원님은 기초적으로 복부근육의 전반적인 향상이 필요해요.저희가 추천해드리는 루틴을 따르시면서 우선 평균등급으로 올리시는걸 추천드려요"
    };

    const lowerbody = 
        {
            level1_2: "회원님의 하체 근발달정도는 우수한편이군요! 하체는 튼튼할수록 심장능력이 좋아지죠!저희의 루틴을 따르면서 조금은 상체근육의 부피와 수행능력에 향상에 초점을 맞춰보세요 ",
            level3_4:"회원님의 하체 근발달정도는 조금은 미흡한 편이에요.하지만 어느정도 근육을 가지고 있으셔서 저희가 추천해드리는 맞춤루틴을 따르시면 곧 근발달도의 향상을 1~2등급까지 이끌 수 있을것입니다!",
            level5:"회원님의 다리는 너무 부실부실해요.평소에 운동을 하신적이 없으신 것 같군요.회원님은 기초적으로 하체근육의 전반적인 향상이 필요해요.저희가 추천해드리는 루틴을 따르시면서 우선 평균등급으로 올리시는걸 추천드려요"
        };

    const totalbody={
        level1_2:"회원님의 전반적인 체력관리는 그동안 스스로 잘 해온것으로 추정됩니다.체력은 전반적으로 매우 좋습니다!스스로 관리가 철저하신 우리 회원님은 우리 포켓트레이너를 스팟터로서 고강도운동을 통한 수행능력을 향상시키는데 한 번 운동을 해보는 것을 추천드립니다!",
        level3_4:"회원님의 전반적인 체력은 그래두 어느 한 부분 부족한 것 없지만 뛰어난 부분도 없습니다.그래도 평균정도의 수행능력을 갖춘 우리 회원님!조금은 꾸준한 운동을 저희 포켓트레이너와 함께한다면 전반적인 근지구력을 향상시킬수 있을 것입니다!.우리회원님은 다양한 부위별 운동법을 먼저 꾸준함을 통해 숙지하는것을 추천드립니다!",
        level5:"회원님의 전반적인 체력관리가 그동안 스스로 잘 해오지 못한것으로 추정됩니다.하지만 괜찮습니다!대부분의 현대인들이 과도한 업무와 스트레스로 인해 이부분에 해당합니다.회원님께서는 먼저 우리 포켓트레이너와 함께 성취해가는 동기부여와 아주 기초적인 운동부터 기초체력을 기르며 재미를 갖는 것을 추천드립니다."
    }

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
                <div className="alert alert-primary" role="alert" >
                    <span className="alert-icon"><i class="ni ni-chart-bar-32"></i></span>
                    <span className="alert-text display-4" style={{display:"block"}}>측정결과</span>
                    <div className="alert alert-success" role="alert">
                        <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(상체)3등급</strong></span>
                    </div>
                    <div className="alert alert-success" role="alert">
                        <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(복근)2등급</strong></span>
                    </div>
                    <div className="alert alert-success" role="alert">
                        <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(하체)1등급</strong></span>
                    </div>

                </div>
            }
            {activeStep==2 &&
                <div className="alert alert-primary" role="alert" >
                <span className="alert-icon"><i class="ni ni-chart-bar-32"></i></span>
                <span className="alert-text display-4" style={{display:"block"}}>About Me-상체</span>
                <div className="alert alert-success" role="alert">
                    <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(상체)코멘트</strong></span>
                    <p>{upperbody[upper_idx]}</p>
                </div>

            </div>
            }
            {activeStep==3 &&
                <div className="alert alert-primary" role="alert" >
                <span className="alert-icon"><i class="ni ni-chart-bar-32"></i></span>
                <span className="alert-text display-4" style={{display:"block"}}>About Me-복근</span>
                <div className="alert alert-success" role="alert">
                    <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(복근)코멘트</strong></span>
                    <p>{upperbody[abs_idx]}</p>
                </div>

            </div>
            }
            {activeStep==4 &&
                <div className="alert alert-primary" role="alert" >
                <span className="alert-icon"><i class="ni ni-chart-bar-32"></i></span>
                <span className="alert-text display-4" style={{display:"block"}}>About Me-하체</span>
                <div className="alert alert-success" role="alert">
                    <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(하체)코멘트</strong></span>
                    <p>{upperbody[lower_idx]}</p>
                </div>

            </div>
            }
            {activeStep==5 &&
                <div className="alert alert-primary" role="alert" >
                <span className="alert-icon"><i class="ni ni-chart-bar-32"></i></span>
                <span className="alert-text display-4" style={{display:"block"}}>About Me-최종평</span>
                <div className="alert alert-warning" role="alert">
                    <span className="alert-text h3" style={{color:"white"}}><strong><i class="fas fa-thumbs-up"></i>(최종)코멘트</strong></span>
                    <p>{upperbody[total_idx]}</p>
                </div>

                <Link to="/main/exercise_counter">
                    <button type="button" className="btn btn-warning btn-lg btn-block" style={{marginTop:'5px'}}><i class="fas fa-undo-alt"></i>평가종료</button>
                </Link>
                <Link to="">
                    <button type="button" className="btn btn-warning btn-lg btn-block" style={{marginTop:'5px'}}><i class="fas fa-dumbbell"></i>오늘의루틴추천</button>
                </Link>
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