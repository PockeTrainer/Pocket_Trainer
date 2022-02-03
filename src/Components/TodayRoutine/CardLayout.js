import React from "react";
import style from "../../CustomCss/ExerciseCounter/CardLayout.module.css"
import InfoMask from "./InfoMask";
import Footer from "../SameLayout/Footer";

import InfoTab from "./InfoTab";
import ExerciseRoutine from "./ExerciseRoutine";
import TodaySummary from './TodaySummary'

function CardLayout(){
    return(

        <div>
        <InfoMask/>
        <div class={"container-fluid"+" "+style.bg_card_layout+" "+"mt--7" }>
            <div className="row" data-component="ProfileCardLayout">
                <InfoTab/>
                <div className="col-xl-8 order-xl-1">
                    <TodaySummary/>
                    <ExerciseRoutine/>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
    );
}
export default CardLayout;