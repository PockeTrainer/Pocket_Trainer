import React, { Component } from 'react';
import humanIcon from '../../icons/human.png'
import '../../css/OnBoarding/ResultPage.css';

class ResultPage extends Component {
    render() {
    return (
    <div className="ResultPage">
        <div className="GNB">나의 체형은?</div>
        
        <div className="mainsource">
            <img src={humanIcon} alt="" />

            <input type="text" name="bodyType" id="bodyType" readOnly="true" />

            <textarea name="bodyTypeInfo" id="bodyTypeInfo" cols="30" rows="10" readOnly="true"></textarea>
            
            <button id="recommandBTN">나에게 맞는 운동 보러가기</button>
        </div>
    </div>
    );
  }
}

export default ResultPage;