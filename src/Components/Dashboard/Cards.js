import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import Slider from 'react-slick';
import EachExerciseClear from './EachExerciseClear';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

function Cards(){


  const AvatarStyle=styled(Avatar)((props)=>({
    margin:"auto",
    width: "4rem",
    height:"4rem",
    backgroundColor:props.color,
    fontFamily:"Nanum Gothic",
    fontWeight:"bold",
    fontSize:"1.55rem"
  }));

  
const popoverStyle={
    "&.MuiButton-root":{
        display:"flex",
        margin:"auto",
        boxShadow:"0",
        backgroundColor:"rgb(50 50 93 / 0%) "
    }
}


const settings_for_clear={
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

        return(
            <div className="row" data-component="Card">

              <StyledSlider {...settings_for_clear}>
                <EachExerciseClear/>
                <EachExerciseClear/>
                <EachExerciseClear/>
              </StyledSlider>

              <Stack direction={"row"} spacing={1}>
                    <div className="col-xl-3 col-lg-6" style={ThreeComboStyle}>
                        <div className="card card-stats mb-4 mb-xl-0" style={CardBackGround}>
                          <div className="card-body" style={{padding:"0 0.2rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1.0rem",width:"80%",marginBottom:"1rem"}}>가슴</span>
                            <Chip icon={<CheckCircleIcon  sx={{fontSize:"1.0rem"}} />} label="벤치프레스" sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                            <Chip icon={<CheckCircleIcon  sx={{fontSize:"1.0rem"}} />} label="벤치프레스" sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}}  />
                            <Chip icon={<CheckCircleIcon  sx={{fontSize:"1.0rem"}} />} label="벤치프레스" sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                          </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-6" style={ThreeComboStyle}>
                        <div className="card card-stats mb-4 mb-xl-0" style={CardBackGround}>
                          <div className="card-body" style={{padding:"0 0.2rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1.0rem",width:"80%",marginBottom:"1rem"}}>가슴</span>
                            <Chip icon={<CheckCircleIcon  sx={{fontSize:"1.0rem"}} />} label="벤치프레스" sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                            <Chip icon={<CheckCircleIcon  sx={{fontSize:"1.0rem"}} />} label="벤치프레스" sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}}  />
                            <Chip icon={<CheckCircleIcon  sx={{fontSize:"1.0rem"}} />} label="벤치프레스" sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                          </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-3 col-lg-6" style={ThreeComboStyle}>
                        <div className="card card-stats mb-4 mb-xl-0" style={CardBackGround}>
                          <div className="card-body" style={{padding:"0 0.2rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1.0rem",width:"80%",marginBottom:"1rem"}}>가슴</span>
                            <Chip icon={<CheckCircleIcon  sx={{fontSize:"1.0rem"}} />} label="벤치프레스" sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
                            <Chip icon={<CheckCircleIcon  sx={{fontSize:"1.0rem"}} />} label="벤치프레스" sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}}  />
                            <Chip icon={<CheckCircleIcon  sx={{fontSize:"1.0rem"}} />} label="벤치프레스" sx={{marginBottom:"1rem",width:"100%",backgroundColor:"white",fontFamily:"Noto Sans KR"}} />
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
                    <span style={{color:"white",fontSize:"1.875rem"}}>60%</span>
                  </div>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"  style={{width:"60%"}}></div>
                </div>
                
              </div>
              
              <div className="alert alert-secondary" role="alert" style={{marginTop:"1rem",marginBottom:"0em",padding:"0.5rem 0.5rem"}}>
               <Pstyled bold="lighter" color="black">
                 벤치프레스부터
               </Pstyled>
               <span className="badge badge-success" style={{fontSize:"1em",}}>벤치프레스부터</span>
               <button type="button" className="btn btn-primary btn-lg btn-block"><i className="fas fa-running"></i>운동하러 가기</button>
              </div>
           

             


            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">오늘의 운동교정평가</h5>
                  <div className="form-group">
                                <label for="exampleFormControlSelect1">Today운동</label>
                                <select className="form-control" id="exampleFormControlSelect1">
                                <option>벤치프레스</option>
                                <option>인클라인프레스</option>
                                <option>펙덱 플라이</option>
                                </select>
                            </div>
                  <span className="h3 font-weight-bold mb-0">"벤치프레스를 할 때 오른쪽 어깨가 15도정도 내려가있으니 오른쪽을 좀 더 올려주시기 바랍니다"</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-purple text-white rounded-circle shadow">
                    <i className="fas fa-users" />
                  </div>
                </div>
              </div>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className="text-warning mr-2"><i className="fas fa-arrow-down" />불균형발생</span>
                <span className="text-nowrap">마지막 기록대비(11/07)</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">오늘의 섭취열량</h5>
                  <span className="h2 font-weight-bold mb-0">총 칼로리:2700kcal</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                    <i className="fas fa-percent" />
                  </div>
                </div>
              </div>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className="text-warning mr-2"><i className="fas fa-arrow-up" />칼로리 150kcal증가</span>
                <span className="text-nowrap">전 날 대비(11/07)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
        );
    }
export default Cards;