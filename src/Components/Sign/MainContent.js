import React, { useEffect, useRef, useState } from 'react';
import NavBar from './Navbar';
import LoginPart from './LoginPart';
import Footer from './Footer';
import "../../CustomCss/Sign/Login.css";
import "../../CustomCss/Modal.css"
import { useParams } from 'react-router-dom';
import SignUpPart from './SignUpPart';
import FindIdPart from './FindIdPart';
import FindPwPart from './FindPwPart';
import Collapse from '@mui/material/Collapse';
import { useLocation } from "react-router-dom";


function MainContent(){

    const subtitle=useParams();//v6 dom부터는 params대신 useParams를 사용하여 가져옴
    const path=useLocation();
    const count=useRef(1);


    const signIn_message={
        main:"당신만의 PT!",
        sub:"어디서든 눈치보지말고 POCKETTRAINER와 함께 오늘도 득근해보세요!"
    };
    const register_message={
        main:"포켓트레이너에 오신걸 환영합니다!",
        sub:"서비스에 가입하고 체계적인 운동관리 및 식단관리를 받아보세요"
    }; 

    const findId_message={
        main:"아이디를 잊어버리셨나요!",
        sub:"회원님의 정보를 입력하여 아이디를 확인해보세요"
    };

    const findPw_message={
        main:"비밀번호를 잊어버리셨나요!",
        sub:"회원님의 정보를 입력하여 비밀번호를 재설정해보세요"
    };

    const stateNav={
        signIn:<NavBar text={signIn_message}/>,
        signUp:<NavBar text={register_message} />,
        findId:<NavBar text={findId_message} />,
        findPw:<NavBar text={findPw_message} />
    };

    const [checked, setChecked] = useState(false);//밑에 그래프 여는용도

    const handleChange = () => {
        setChecked((prev) => !prev);
      };
    


    const stateMain={
        signIn:<LoginPart />,
        signUp:<SignUpPart />,
        findId:<FindIdPart />,
        findPw:<FindPwPart />
    };

    
    useEffect(()=>{
        handleChange();
    },[])

    useEffect(()=>{
    if(count.current===1){
        count.current+=1;
        return;
    }
        handleChange();
        setTimeout(handleChange,1000)
    },[path])
    return(
        <div className='bg-default'>
            <div className="main-content">
                {/*url 뒤에 인자에 따라 나눠줌 */}
                <Collapse in={checked} orientation="horizontal" style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout: 2000 } : {})}>
                    <div>
                        {stateNav[subtitle.subtitle]} 
                        {stateMain[subtitle.subtitle]}
                    </div>
                </Collapse>
                
                <Footer/>
                
            </div>
        </div>
    );
}
export default MainContent