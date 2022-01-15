import React from 'react';
import TitleMessage from './TitleMessage';
import VerticalStepper from './VerticalStepper';


function Instruction(){

    const content={
        title:"체력평가를\n준비합니다",
        message:"올바른 체력측정을 위한 다음사항을 체크해보세요"
    };
    return(
        <div>
            <TitleMessage content={content}/>
            <VerticalStepper/>
      </div>
    );
}
export default Instruction