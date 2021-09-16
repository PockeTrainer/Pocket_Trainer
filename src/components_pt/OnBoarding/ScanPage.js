import React, { Component } from 'react';
import humanIcon from '../../icons/human.png'
import timerIcon from '../../icons/timer.png'
import switchCameraIcon from '../../icons/switchCamera.png'
import takePhotoImgIcon from '../../icons/takePhoto.png'


class ScanPage extends Component {
    render() {
    return (
    <div className="ScanPage">
        <div className="GNB">가이드에 맞춰 서 주세요</div>
        
        <div className="mainsource">
            <img src={humanIcon} alt="" />

            <img src={timerIcon} alt="" />
            <img src={switchCameraIcon} alt="" />    
            <img src={takePhotoImgIcon} alt="" onClick={function(e){
                e.preventDefault();
                this.props.goResultPage();
            }.bind(this)}/>
        </div>
    </div>
    );
  }
}

export default ScanPage;