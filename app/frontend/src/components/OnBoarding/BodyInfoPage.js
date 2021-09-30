import React, { Component } from 'react';
import '../../css/OnBoarding/BodyInfoPage.css';

class BodyInfoPage extends Component {
    render() {
    return (
    <div className="BodyInfoPage">
        <div className="GNB">신체 정보를 입력해 주세요</div>
        
        <div className="mainsource">
            <label htmlFor="height">신장(cm)</label>
            <input type="text" name="height" id="iheight" />
                    
            <label htmlFor="weight">체중(kg)</label>
            <input type="text" name="weight" id="weight" />

            <label htmlFor="bmi">BMI</label>
            <input type="text" name="bmi" id="bmi" readOnly='true'/>

            <button id="nextBTN" onClick={function(e){
                e.preventDefault();
                this.props.goScanPage();
            }.bind(this)}>다음</button>
        </div>
    </div>
    );
  }
}

export default BodyInfoPage;