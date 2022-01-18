import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TitleMessage from "./TitleMessage";
import ReactPlayer from 'react-player/youtube'
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function EachExerciseTip(){
    const pushup_content={
        title:"상체측정\n[푸시업]",
        message:"상체측정을 위한 푸시업 방법을 알려드립니다.",
        correct_posture:"팔의 간격은 어깨너비보다 넓게 벌리지만 팔꿈치의 위치가 가슴보다 아래에 위치하도록 하는 것이 어깨 관절에 부담을 적게 주고 가슴과 삼두근의 자극을 높여줄 수 있습니다.",
        correct_posture_pic:"../assets/img/theme/pushup_movement.gif",
        wrong_posture:"팔을 너무 넓게 벌리며 손에 위치가 어깨 높이에 가까운 경우에 생기는 자세입니다. (어깨를 다칠 수 있습니다.)",
        wrong_posture_pic:"../assets/img/theme/pushup_notgood.gif"
    };

    const situp_content={
        title:"복근측정\n[싯업]",
        message:"복근측정을 위한 싯업 방법을 알려드립니다.",
        correct_posture:"손깍지를 낀 상태로 다리(발)가 움직이지 않도록 하며, 복근의 힘으로 상체를 동글게 말아주며 올라와 줍니다",
        correct_posture_pic:"../assets/img/theme/situp_movement.gif",
        wrong_posture:"중간에 힘이 풀려서 손을 이와 같이 풀지는 말아주세요.측정에 방해가 됩니다.",
        wrong_posture_pic:"../assets/img/theme/situp_notgood.gif"
    };

    const squat_content={
        title:"하체측정\n[스쿼트]",
        message:"하체측정을 위한 스쿼트 방법을 알려드립니다.",
        correct_posture:"팔은 어깨높이에서 팔꿈치쪽으로 양손을 접어주시거나 , '앞으로 나란히 자세'처럼 쭉 뻗어줍니다. 그리고 양발은 어깨 넓이보다 약간 넓게 벌려서 의자에 앉듯이 내려갔다가 다시 일어섭니다.",
        correct_posture_pic:"../assets/img/theme/squat_movement.gif",
        wrong_posture:"무릎이 안쪽으로 쏠리게 되면 엉덩이 근육과 허벅지근육에 불균형을 초래하여 무릎에 통증이 발생할 수 있습니다.무릎과 발은 동일선상에 위치할 수 있도록 합니다.",
        wrong_posture_pic:"../assets/img/theme/squat_notgood.png"
    };
    
    const youtube={
        pushup:"https://www.youtube.com/watch?v=-_DUjHxgmWk",
        situp:"https://www.youtube.com/watch?v=0PgmYmjnoM8",
        squat:"https://www.youtube.com/watch?v=vQNFiMi0m9M"
    };

    const entire={
        pushup:pushup_content,
        situp:situp_content,
        squat:squat_content
    };

    const card_body={
        padding:"0.15rem"
    }
    const exercise_name=useParams();//뒤에 파람스 가져올려고
    const link_address='/test'+"/"+exercise_name.exercise_name;



    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    useEffect(()=>{
        handleClick();
    },[])

    return(
        <div>
            <TitleMessage content={entire[exercise_name.exercise_name]}/>

            <div className="card" style={{width:'19rem'}}>
                <div className="card-body" style={card_body}>
                <span className="badge badge-pill badge-success badge-lg" style={{fontSize:'1em'}}><i class="fas fa-thumbs-up"></i>올바른자세</span>
                
                <hr></hr>
                <img src={entire[exercise_name.exercise_name].correct_posture_pic} style={{height:'10rem'}}/>
                <p classnName="card-text">{entire[exercise_name.exercise_name].correct_posture}</p>
                </div>
            </div>

            <div className="card" style={{width:'20rem'}}>
                <div className="card-body" style={card_body}>
                <span className="badge badge-pill badge-warning badge-lg" style={{fontSize:'1em'}}><i class="fas fa-thumbs-up fa-rotate-180"></i>잘못된자세</span>
                
                <hr></hr>
                <img src={entire[exercise_name.exercise_name].wrong_posture_pic} style={{height:'10rem'}}/>
                <p classnName="card-text">{entire[exercise_name.exercise_name].wrong_posture}</p>
                </div>
            </div>

            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>동영상으로 보기</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ReactPlayer url={youtube[exercise_name.exercise_name]} width='100%' 
                        height='20em'        // 플레이어 크기 (세로)
                        playing={true}        // 자동 재생 on
                        muted={true}          // 자동 재생 on
                        controls={false}       // 플레이어 컨트롤 노출 여부
                        light={false}         // 플레이어 모드
                        pip={true}            // pip 모드 설정 여부  
                        />
                </AccordionDetails>
            </Accordion>
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                올바른 자세를 카메라 앞에 서서 준비가 되면 평가를 시작해주세요!
                </Alert>
            </Snackbar>

            <Link to={link_address}>
                <button type="button" className="btn btn-primary btn-lg btn-block" style={{marginTop:'5px'}}><i className="ni ni-button-play"></i>평가시작하기</button>
            </Link>
        </div>
    );
}
export default EachExerciseTip