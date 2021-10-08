import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import humanIcon from '../../icons/human.png'
import timerIcon from '../../icons/timer.png'
import switchCameraIcon from '../../icons/switchCamera.png'
import takePhotoImgIcon from '../../icons/takePhoto.png'
import '../../css/OnBoarding/ScanPage.css';


function ScanPage(){
    return (
    <div className="ScanPage">
        <div className="GNB">가이드에 맞춰 서 주세요</div>
        
        <div className="mainsource">
            <div className="humanIcon">
                <img src={humanIcon} alt="" />
            </div>

            <div className="upLineIcon">
                <img id="timerIcon" src={timerIcon} alt="" />
                <img id="switchCameraIcon" src={switchCameraIcon} alt="" />   
            </div> 
            <div className="downLineIcon">
                <Link to="/OnBoarding/ResultPage"><img src={takePhotoImgIcon} /></Link>
            </div> 
        </div>
    </div>
    );
}

export default ScanPage;