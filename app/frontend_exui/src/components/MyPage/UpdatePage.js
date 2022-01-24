import React, { Component } from 'react';
import '../../css/MyPage/UpdatePage.css';

function UpdatePage() {
    return (
    <div className="UpdatePage">
        <div className="GNB">회원정보 수정</div>

        <div className="mainsource">
            <div className="form">
                <form action="">
                    <label htmlFor="id">아이디</label>
                    <input type="text" name="id" id="id" />
                    
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name" />

                    <label htmlFor="gender">성별</label>
                    <div className="gender" id="gender">
                        <input type="radio" name="gender" id="man" value="man" />
                        <label htmlFor="man">남</label>

                        <input type="radio" name="gender" id="woman" value="woman" />
                        <label htmlFor="woman">여</label>
                    </div>

                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" />

                    <label htmlFor="birth">생년월일</label>
                    <input type="date" id="birth"/>

                    <label htmlFor="myBodyBTN">내 체형 정보란</label>
                    <button id="myBodyBTN">내 신체정보 <br/> 보러 가기</button>

                    <button id="updateBTN">회원정보 수정하기</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default UpdatePage;