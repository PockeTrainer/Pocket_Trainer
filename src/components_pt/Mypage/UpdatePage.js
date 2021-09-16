import React, { Component } from 'react';

class UpdatePage extends Component {
    render() {
    return (
    <div className="UpdatePage">
        <div className="mainsource">
            <div className="form">
                <form action="">
                    <label htmlFor="id">아이디</label>
                    <input type="text" name="id" id="id" />
                    
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name" />

                    <input type="radio" name="gender" value="man" />남
                    <input type="radio" name="gender" value="woman" />여

                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" />

                    <label htmlFor="birth">생년월일</label>
                    <input type="date" id="birth"/>

                    <label htmlFor="myBodyBTN">내 체형정보란</label>
                    <button id="myBodyBTN">내 신체정보 보러 가기</button>

                    <button id="updateBTN">회원정보 수정하기</button>
                </form>
            </div>
        </div>
    </div>
    );
  }
}

export default UpdatePage;