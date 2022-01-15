import React from 'react';
import TitleMessage from './TitleMessage';
import WorkoutTimeline from './WorkoutTimeLine';

function Series(){

    const content={
        title:"평가순서",
        message:"회원님의 체력측정을 이와 같은 순서로 진행합니다."
    };

    return(
        <div>
            <div>
            <TitleMessage content={content}/>
            <WorkoutTimeline/>
            </div>
      </div>
    );
}
export default Series